const core = require("@actions/core");
const { getOctokit, context } = require("@actions/github");
const yaml = require("js-yaml");
const fs = require("fs");
const { saveCache, loadCache, printAPICallsStats } = require("./cache");
const { summarizeChanges } = require("./summary");
const {
  getAllCodeownersFiles,
  getGitHubProfile,
  getRepositories,
} = require("./gh_calls");

const config = {
  ghToken: process.env.GH_TOKEN,
  ignoredRepos: getCommaSeparatedInputList(process.env.IGNORED_REPOSITORIES),
  ignoredUsers: getCommaSeparatedInputList(process.env.IGNORED_USERS),
  maintainersFilePath: process.env.MAINTAINERS_FILE_PATH,
};

function getCommaSeparatedInputList(list) {
  return (
    list
      ?.split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "") ?? []
  );
}

function extractGitHubUsernames(codeownersContent) {
  if (!codeownersContent) {
    return [];
  }

  const uniqueOwners = new Set();

  for (const line of codeownersContent.split("\n")) {
    // extract any data that is before the '#' char and trim whitespace
    const trimmedLine = line.split("#")[0].trim();

    // split by whitespace to get the owners
    const owners = trimmedLine.split(/\s+/);

    // the 1st element is the file location, we don't need it, so we start with 2nd item
    for (const owner of owners.slice(1)) {
      if (!owner.startsWith("@") || owner.includes("/")) {
        core.warning(
          `Skipping '${owner}' as emails and teams are not supported yet`,
        );
        continue;
      }
      uniqueOwners.add(owner.slice(1)); // remove the '@'
    }
  }

  return uniqueOwners;
}

async function collectCurrentMaintainers(codeownersFiles, github) {
  core.startGroup(`Fetching  GitHub profile information for each codeowner`);

  const currentMaintainers = {};
  for (const codeowners of codeownersFiles) {
    const owners = extractGitHubUsernames(codeowners.content);

    for (const owner of owners) {
      if (config.ignoredUsers.includes(owner)) {
        core.debug(
          `[repo: ${codeowners.repo}]: The user '${owner}' is on the ignore list. Skipping...`,
        );
        continue;
      }
      const key = owner.toLowerCase();
      if (!currentMaintainers[key]) {
        // Fetching GitHub profile is useful to ensure that all maintainers are valid (e.g., their GitHub accounts haven't been deleted).
        const profile = await getGitHubProfile(github, owner);
        if (!profile) {
          core.warning(
            `[repo: ${codeowners.repo}]: GitHub profile not found for ${owner}.`,
          );
          continue;
        }

        currentMaintainers[key] = { ...profile, repos: [] };
      }

      currentMaintainers[key].repos.push(codeowners.repo);
    }
  }

  core.endGroup();
  return currentMaintainers;
}

function refreshPreviousMaintainers(previousMaintainers, currentMaintainers) {
  core.startGroup(`Refreshing previous maintainers list`);

  const updatedMaintainers = [];

  // 1. Iterate over the list of previous maintainers to:
  //    - Remove any maintainers who are not listed in any current CODEOWNERS files.
  //    - Update the repos list, ensuring that other properties (e.g., 'linkedin', 'slack', etc.) remain unchanged.
  for (const previousEntry of previousMaintainers) {
    const key = previousEntry.github.toLowerCase();
    const currentMaintainer = currentMaintainers[key];
    if (!currentMaintainer) {
      core.info(
        `The previous ${previousEntry.github} maintainer was not found in any CODEOWNERS file. Removing...`,
      );
      continue;
    }
    delete currentMaintainers[key];

    updatedMaintainers.push({
      ...previousEntry,
      repos: currentMaintainer.repos,
    });
  }

  // 2. Append new codeowners who are not present in the previous Maintainers file.
  const newMaintainers = Object.values(currentMaintainers);
  updatedMaintainers.push(...newMaintainers);

  core.endGroup();
  return updatedMaintainers;
}

async function run() {
  try {
    if (!config.maintainersFilePath) {
      core.setFailed("The MAINTAINERS_FILE_PATH is not defined");
      return;
    }
    await loadCache();

    const github = getOctokit(config.ghToken);

    const repos = await getRepositories(
      github,
      context.repo.owner,
      config.ignoredRepos,
    );
    const codeownersFiles = await getAllCodeownersFiles(
      github,
      context.repo.owner,
      repos,
    );

    const previousMaintainers = yaml.load(
      fs.readFileSync(config.maintainersFilePath, "utf8"),
    );

    // 1. Collect new maintainers from all current CODEOWNERS files found across all repositories.
    const currentMaintainers = await collectCurrentMaintainers(
      codeownersFiles,
      github,
    );

    // 2. Refresh the repository list for existing maintainers and add any new maintainers to the list.
    const refreshedMaintainers = refreshPreviousMaintainers(
      previousMaintainers,
      currentMaintainers,
    );

    fs.writeFileSync(
      config.maintainersFilePath,
      yaml.dump(refreshedMaintainers),
    );

    printAPICallsStats();

    await summarizeChanges(previousMaintainers, refreshedMaintainers);
    await saveCache();
  } catch (error) {
    core.setFailed(`An error occurred: ${error}`);
  }
}

run();
