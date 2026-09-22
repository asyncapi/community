/**
 * Extracts binding vote rows from a vote-closed bot comment body.
 *
 * The comment format is produced by the git-vote[bot] and looks like:
 *   Binding votes (N)
 *   | @username | In favor | 2026-01-07 10:56:21.0 +00:00:00 |
 *   ...
 *   <details>...
 *
 * @param {string} message - The full body of the bot comment
 * @returns {string[]} Array of raw pipe-delimited row strings
 */
function parseVoteClosedComment(message) {
  const bindingVotesSectionMatch = message.match(
    /Binding votes \(\d+\)[\s\S]*?(?=(<details>|$))/
  );
  const bindingVotesSection = bindingVotesSectionMatch
    ? bindingVotesSectionMatch[0]
    : "";
  return bindingVotesSection.match(/\| @\w+.*?\|.*?\|.*?\|/g) || [];
}

/**
 * Maps raw pipe-delimited vote rows into structured vote objects.
 *
 * @param {string[]} votingRows - Raw rows from parseVoteClosedComment
 * @returns {{ user: string, vote: string, timestamp: string, isVotedInLast3Months: boolean }[]}
 */
function parseLatestVotes(votingRows) {
  return votingRows.map((row) => {
    // First element is empty because rows start with "|"
    const [, user, vote, timestamp] = row.split("|").map((col) => col.trim());
    return {
      user: user.replace("@", ""),
      vote,
      timestamp,
      isVotedInLast3Months: true,
    };
  });
}

module.exports = { parseVoteClosedComment, parseLatestVotes };
