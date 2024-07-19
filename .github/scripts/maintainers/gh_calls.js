const core = require("@actions/core");
const { fetchWithCache } = require("./cache");

module.exports = { getGitHubProfile, getAllCodeownersFiles, getRepositories };

async function getRepositories(github, owner, ignoredRepos) {
  core.startGroup(
    `Getting list of all public, non-archived repositories owned by ${owner}`,
  );

  const query = `
      query repos($cursor: String, $owner: String!) {
        organization(login: $owner) {
          repositories(first: 100, after: $cursor, visibility: PUBLIC, isArchived: false) {
            nodes {
              name
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }`;

  const repos = [];
  let cursor = null;

  do {
    const result = await github.graphql(query, { owner, cursor });
    const { nodes, pageInfo } = result.organization.repositories;
    repos.push(...nodes);

    cursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
  } while (cursor);

  core.debug(`List of repositories for ${owner}:`);
  core.debug(JSON.stringify(repos, null, 2));
  core.endGroup();

  return repos.filter((repo) => !ignoredRepos.includes(repo.name));
}

async function getGitHubProfile(github, login) {
  try {
    const profile = await fetchWithCache(
      `profile:${login}`,
      async ({ headers }) => {
        return github.rest.users.getByUsername({
          username: login,
          headers,
        });
      },
    );

    return removeNulls({
      name: profile.name ?? login,
      github: login,
      twitter: profile.twitter_username,
      availableForHire: profile.hireable,
      isTscMember: false,
      repos: [],
    });
  } catch (error) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Checks for all valid locations according to:
// https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-file-location
//
// Detect the repository default branch automatically.
async function getCodeownersFile(github, owner, repo) {
  const paths = ["CODEOWNERS", "docs/CODEOWNERS", ".github/CODEOWNERS"];

  for (const path of paths) {
    try {
      core.debug(
        `[repo: ${owner}/${repo}]: Fetching CODEOWNERS file at ${path}`,
      );
      return await fetchWithCache(
        `owners:${owner}/${repo}`,
        async ({ headers }) => {
          return github.rest.repos.getContent({
            owner,
            repo,
            path,
            headers: {
              Accept: "application/vnd.github.raw+json",
              ...headers,
            },
          });
        },
      );
    } catch (error) {
      core.warning(
        `[repo: ${owner}/${repo}]: Failed to fetch CODEOWNERS file at ${path}: ${error.message}`,
      );
    }
  }

  core.error(
    `[repo: ${owner}/${repo}]: CODEOWNERS file not found in any of the expected locations.`,
  );
  return null;
}

async function getAllCodeownersFiles(github, owner, repos) {
  core.startGroup(`Fetching CODEOWNERS files for ${repos.length} repositories`);
  const files = [];
  for (const repo of repos) {
    const data = await getCodeownersFile(github, owner, repo.name);
    if (!data) {
      continue;
    }
    files.push({
      repo: repo.name,
      content: data,
    });
  }
  core.endGroup();
  return files;
}

function removeNulls(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
