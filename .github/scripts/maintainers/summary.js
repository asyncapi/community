module.exports = { summarizeChanges };

async function summarizeChanges(oldMaintainers, newMaintainers, core) {
  const outOfSync = [];
  const noLongerActive = [];

  const newMaintainersByGitHubName = new Map();
  for (const newMaintainer of newMaintainers) {
    newMaintainersByGitHubName.set(newMaintainer.github, newMaintainer);
  }

  for (const oldEntry of oldMaintainers) {
    const newEntry = newMaintainersByGitHubName.get(oldEntry.github);

    if (!newEntry) {
      noLongerActive.push([oldEntry.github, repositoriesLinks(oldEntry.repos)]);
      continue;
    }

    const { newOwnedRepos, noLongerOwnedRepos } = compareRepos(
      oldEntry.repos,
      newEntry.repos,
    );

    if (newOwnedRepos.length > 0 || noLongerOwnedRepos.length > 0) {
      outOfSync.push([
        profileLink(oldEntry.github),
        repositoriesLinks(newOwnedRepos),
        repositoriesLinks(noLongerOwnedRepos),
      ]);
    }
  }

  if (outOfSync.length > 0) {
    core.summary.addHeading("⚠️ Out of Sync Maintainers", "2");
    core.summary.addTable([
      [
        { data: "Name", header: true },
        { data: "Newly added to CODEOWNERS", header: true },
        { data: "No longer in CODEOWNERS", header: true },
      ],
      ...outOfSync,
    ]);
    core.summary.addBreak();
  }

  if (noLongerActive.length > 0) {
    core.summary.addHeading(
      "👻 Inactive Maintainers (not listed in any repositories)",
      "2",
    );

    core.summary.addTable([
      [
        { data: "Name", header: true },
        { data: "Previously claimed ownership in repos", header: true },
      ],
      ...noLongerActive,
    ]);

    core.summary.addBreak();
  }

  await core.summary.write({ overwrite: true });
}

function compareRepos(oldRepos, newRepos) {
  const newOwnedRepositories = [];
  const noLongerOwnedRepositories = [];

  for (const repo of newRepos) {
    if (!oldRepos.includes(repo)) {
      newOwnedRepositories.push(repo);
    }
  }

  for (const repo of oldRepos) {
    if (!newRepos.includes(repo)) {
      noLongerOwnedRepositories.push(repo);
    }
  }

  return {
    newOwnedRepos: newOwnedRepositories,
    noLongerOwnedRepos: noLongerOwnedRepositories,
  };
}

function repositoriesLinks(repos) {
  return repos
    .map((repo) => {
      return `<a href="https://github.com/asyncapi/${repo}/blob/master/CODEOWNERS">${repo}</a>`;
    })
    .join(", ");
}

function profileLink(login) {
  return `<a href="https://github.com/${login}"><code>${login}</code></a>`;
}
