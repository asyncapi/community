#!/usr/bin/env node
/**
 * Local runner for the vote_tracker workflow.
 *
 * Run from the repository root so that relative file paths
 * (voteTrackingFile.json, TSC_BOARD_MEMBERS.yaml, docs/…) resolve correctly.
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx node .github/scripts/vote_tracker/run-local.js <botCommentURL>
 *
 * Example:
 *   GITHUB_TOKEN=ghp_xxx node .github/scripts/vote_tracker/run-local.js \
 *     "https://github.com/asyncapi/community/issues/2221#issuecomment-2585230063"
 *
 * The script will:
 *   1. Fetch the bot comment body and issue title from the GitHub API
 *   2. Update voteTrackingFile.json with the latest votes
 *   3. Regenerate docs/020-governance-and-policies/TSC_VOTING_OVERVIEW.md
 */

const { Octokit } = require("@octokit/rest");
const runVoteTracker = require("./index");

const botCommentURL = process.argv[2];
if (!botCommentURL) {
  console.error("Usage: GITHUB_TOKEN=<token> node .github/scripts/vote_tracker/run-local.js <botCommentURL>");
  process.exit(1);
}

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("Error: GITHUB_TOKEN environment variable is required.");
  process.exit(1);
}

const octokit = new Octokit({ auth: token });

// Shape matches what actions/github-script provides to index.js
const github = {
  request: (route, opts) => octokit.request(route, opts),
  rest: {
    issues: {
      get: (opts) => octokit.rest.issues.get(opts),
    },
  },
};

runVoteTracker({ github, context: null, botCommentURL })
  .then(() => console.log("Done!"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
