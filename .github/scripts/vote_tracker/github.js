/**
 * Fetches comment body, issue title, and URL metadata from a gitvote bot comment URL.
 *
 * The URL is expected to be in the form:
 *   https://github.com/<owner>/<repo>/issues/<number>#issuecomment-<id>
 *
 * @param {Object} github - GitHub API client (from actions/github-script or an Octokit instance)
 * @param {string} botCommentURL
 * @returns {Promise<{
 *   orgName: string,
 *   repoName: string,
 *   eventNumber: string,
 *   commentId: string,
 *   messageBody: string,
 *   eventTitle: string
 * }>}
 */
async function fetchCommentInformation(github, botCommentURL) {
  const urlParts = botCommentURL.split("/");
  const eventNumber = urlParts[urlParts.length - 1].split("#")[0];
  const commentId = urlParts[urlParts.length - 1]
    .split("#")[1]
    .replace("issuecomment-", "");
  const [owner, repo] = urlParts.slice(3, 5);

  const messageResponse = await github.request(
    "GET /repos/{owner}/{repo}/issues/comments/{comment_id}",
    { owner, repo, comment_id: commentId }
  );

  const issueResponse = await github.rest.issues.get({
    owner,
    repo,
    issue_number: eventNumber,
  });

  return {
    orgName: owner,
    repoName: repo,
    eventNumber,
    commentId,
    messageBody: messageResponse.data.body,
    eventTitle: issueResponse.data.title,
  };
}

module.exports = { fetchCommentInformation };
