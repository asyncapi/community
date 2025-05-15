/**
 * Checks if the last voting date is within the last three months from the current date.
 * 
 * @param {Object} voteInfo - The voting information object containing vote history
 * @param {string} voteInfo.lastParticipatedVoteTime - The last voting date as a string (YYYY-MM-DD format), 
 *                                                    or a message indicating no voting history
 * @param {string} [voteInfo.name] - Member name (optional)
 * @param {Object.<string, string>} [voteInfo.votes] - Key-value pairs of vote topics and decisions (optional)
 * @param {string} [voteInfo.lastVoteClosedTime] - When the last vote was closed (optional)
 * @param {string} [voteInfo.firstVoteClosedTime] - When the first vote was closed (optional)
 * @param {number} [voteInfo.agreeCount] - Count of "in favor" votes (optional)
 * @param {number} [voteInfo.disagreeCount] - Count of "against" votes (optional)
 * @param {number} [voteInfo.abstainCount] - Count of abstentions (optional)
 * @param {number} [voteInfo.notParticipatingCount] - Count of non-participations (optional)
 * @param {boolean} [voteInfo.isVotedInLast3Months] - Current status flag (optional)
 * @returns {boolean} Returns true if the last vote was within the last three months, 
 *                   false if there's no valid voting history, the date is in the future, 
 *                   or the vote was more than three months ago
 * 
 * @example
 * // Typical voteInfo object structure
 * const voteInfo = {
 *   name: "testUser",
 *   lastParticipatedVoteTime: "2025-01-01",
 *   isVotedInLast3Months: true,
 *   lastVoteClosedTime: "2025-03-31",
 *   firstVoteClosedTime: "2024-04-01",
 *   agreeCount: 5,
 *   disagreeCount: 2,
 *   abstainCount: 1,
 *   notParticipatingCount: 0
 * }; * 
 * // Returns true if within 3 months
 * isVotingWithinLastThreeMonths(voteInfo);
 * 
 * @example
 * // Returns false for no voting history
 * isVotingWithinLastThreeMonths({ lastParticipatedVoteTime: 'Member has not participated' });
 * 
 * @example
 * // Returns false for future date
 * isVotingWithinLastThreeMonths({ lastParticipatedVoteTime: '2025-01-01' });
 */

function isVotingWithinLastThreeMonths(voteInfo) {
  const currentDate = new Date();
  let lastVoteDate;

  if (
    voteInfo.lastParticipatedVoteTime instanceof Date ||
    (typeof voteInfo.lastParticipatedVoteTime === "string" &&
      !voteInfo.lastParticipatedVoteTime.includes("Member has not"))
  ) {
    lastVoteDate = new Date(voteInfo.lastParticipatedVoteTime);
  } else {
    return false;
  }

  if (lastVoteDate > currentDate) {
    return false;
  }

  const diffInDays = (currentDate - lastVoteDate) / (1000 * 60 * 60 * 24);
  return diffInDays <= 90; // 90 days = 3 months
}

module.exports = { isVotingWithinLastThreeMonths };
