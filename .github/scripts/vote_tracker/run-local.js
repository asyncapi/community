#!/usr/bin/env node
/**
 * Local runner for the vote_tracker full-refresh workflow.
 *
 * Run from the repository root so that relative file paths
 * (voteTrackingFile.json, TSC_BOARD_MEMBERS.yaml, docs/…) resolve correctly.
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx node .github/scripts/vote_tracker/run-local.js
 *
 * The script will:
 *   1. Fetch all issues/PRs labelled "gitvote/closed" from GitHub
 *   2. Parse the "Vote closed" comment on each
 *   3. Rebuild voteTrackingFile.json with current TSC members only
 *   4. Regenerate docs/020-governance-and-policies/TSC_VOTING_OVERVIEW.md
 */

const { Octokit } = require("@octokit/rest");
const runVoteTracker = require("./index");

const orgName = "asyncapi";
const repoName = "community";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("Error: GITHUB_TOKEN environment variable is required.");
  process.exit(1);
}

const octokit = new Octokit({ auth: token });

// Shape matches what index.js expects when called outside GitHub Actions
const github = {
  request: (route, opts) => octokit.request(route, opts),
  rest: {
    issues: {
      get: (opts) => octokit.rest.issues.get(opts),
    },
  },
};

console.log(`Running full vote tracker refresh for ${orgName}/${repoName} …`);

runVoteTracker({ github, context: null, orgName, repoName })
  .then(() => console.log("Done!"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
