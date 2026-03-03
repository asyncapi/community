/**
 * Fetches all issues and pull requests that carry the "gitvote/closed" label.
 * Paginates automatically until all results are collected.
 *
 * @param {Object} github - GitHub API client
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<{ number: number, title: string }[]>} Sorted oldest-first by issue number
 */
async function fetchClosedVoteIssues(github, owner, repo) {
  const issues = [];
  let page = 1;

  while (true) {
    const response = await github.request("GET /repos/{owner}/{repo}/issues", {
      owner,
      repo,
      labels: "gitvote/closed",
      state: "all",
      per_page: 100,
      page,
    });

    if (response.data.length === 0) break;
    issues.push(...response.data);
    if (response.data.length < 100) break;
    page++;
  }

  // Sort ascending so vote columns appear oldest → newest in the table
  issues.sort((a, b) => a.number - b.number);

  return issues.map((issue) => ({
    number: issue.number,
    title: issue.title,
  }));
}

/**
 * Searches the comments of a single issue/PR for the most recent "Vote closed"
 * comment produced by the git-vote[bot].  The comment is identified by the
 * presence of both "Vote closed" and "Binding votes" in its body.
 *
 * @param {Object} github - GitHub API client
 * @param {string} owner
 * @param {string} repo
 * @param {number} issueNumber
 * @returns {Promise<{ body: string, createdAt: string } | null>}
 */
async function fetchVoteClosedComment(github, owner, repo, issueNumber) {
  let lastFound = null;
  let page = 1;

  while (true) {
    const response = await github.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
      { owner, repo, issue_number: issueNumber, per_page: 100, page }
    );

    if (response.data.length === 0) break;

    // Collect all matching comments on this page; keep the last one
    for (const comment of response.data) {
      if (!comment.body) continue;
      if (
        comment.body.includes("Vote closed") &&
        comment.body.includes("Binding votes")
      ) {
        lastFound = { body: comment.body, createdAt: comment.created_at };
      }
    }

    if (response.data.length < 100) break;
    page++;
  }

  return lastFound;
}

module.exports = { fetchClosedVoteIssues, fetchVoteClosedComment };
