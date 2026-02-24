const { isVotingWithinLastThreeMonths } = require("./utils");

const NEVER_VOTED_PLACEHOLDER = "Member has not participated in all previous voting process.";

/**
 * Builds a complete, fresh vote tracking dataset for the current set of TSC
 * members based on all historical voting rounds.
 *
 * Members who are no longer in tscMembers are automatically excluded.
 * Members who are newly added get "Not participated" for rounds they missed.
 *
 * Each returned record has the form:
 *   {
 *     name,
 *     "<issueTitle>$$<issueNumber>": <vote>,   // one key per round, oldest first
 *     ...
 *     lastParticipatedVoteTime,
 *     isVotedInLast3Months,
 *     lastVoteClosedTime,
 *     firstVoteClosedTime,
 *     agreeCount,
 *     disagreeCount,
 *     abstainCount,
 *     notParticipatingCount,
 *   }
 *
 * @param {{ github: string }[]} tscMembers - Current TSC members from the YAML file
 * @param {{
 *   issueNumber: number|string,
 *   issueTitle: string,
 *   voteClosedAt: string,
 *   votes: { user: string, vote: string, timestamp: string }[]
 * }[]} votingRounds - All historical voting rounds, sorted oldest first
 * @returns {Object[]}
 */
function buildVoteDetails(tscMembers, votingRounds) {
  const firstVoteClosedTime = votingRounds.length > 0 ? votingRounds[0].voteClosedAt : null;

  return tscMembers.map((member) => {
    const memberName = member.github;
    const lowerName = memberName.toLowerCase();

    let lastParticipatedVoteTime = null;
    let lastVoteClosedTime = null;
    let agreeCount = 0;
    let disagreeCount = 0;
    let abstainCount = 0;
    let notParticipatingCount = 0;

    // Start the record with "name" so vote columns are inserted directly after it
    const record = { name: memberName };

    for (const round of votingRounds) {
      const { issueNumber, issueTitle, voteClosedAt, votes } = round;
      const voteKey = `${issueTitle}$$${issueNumber}`;
      const userVote = votes.find((v) => v.user.toLowerCase() === lowerName);

      lastVoteClosedTime = voteClosedAt;

      if (userVote) {
        record[voteKey] = userVote.vote;
        lastParticipatedVoteTime = userVote.timestamp.toString().split(" ")[0];
        if (userVote.vote === "In favor") agreeCount++;
        else if (userVote.vote === "Against") disagreeCount++;
        else abstainCount++;
      } else {
        record[voteKey] = "Not participated";
        notParticipatingCount++;
      }
    }

    // Metadata fields go at the end, after all vote columns
    record.lastParticipatedVoteTime = lastParticipatedVoteTime || NEVER_VOTED_PLACEHOLDER;
    record.isVotedInLast3Months = lastParticipatedVoteTime
      ? isVotingWithinLastThreeMonths({ lastParticipatedVoteTime })
      : NEVER_VOTED_PLACEHOLDER;
    record.lastVoteClosedTime = lastVoteClosedTime;
    record.firstVoteClosedTime = firstVoteClosedTime;
    record.agreeCount = agreeCount;
    record.disagreeCount = disagreeCount;
    record.abstainCount = abstainCount;
    record.notParticipatingCount = notParticipatingCount;

    return record;
  });
}

/**
 * Returns members who have not participated in any of the last N voting rounds.
 * If fewer than N rounds exist in the data, returns an empty array — not enough
 * history to make a reliable determination.
 *
 * @param {Object[]} voteDetails - Output of buildVoteDetails
 * @param {number} lastNRounds - How many consecutive non-participations trigger removal (default 3)
 * @returns {Object[]} Subset of voteDetails whose members missed all of the last N rounds
 */
function findInactiveMembers(voteDetails, lastNRounds = 3) {
  if (!voteDetails || voteDetails.length === 0) return [];

  // Vote-round columns are identified by the '$$' separator in their key
  const allVoteKeys = Object.keys(voteDetails[0]).filter((k) => k.includes("$$"));
  if (allVoteKeys.length < lastNRounds) return [];

  const lastNKeys = allVoteKeys.slice(-lastNRounds);
  return voteDetails.filter((member) =>
    // Skip members who have never voted at all — they may be newly added to TSC
    // and haven't had the opportunity to participate yet.
    member.lastParticipatedVoteTime !== NEVER_VOTED_PLACEHOLDER &&
    lastNKeys.every((key) => member[key] === "Not participated")
  );
}

module.exports = { buildVoteDetails, findInactiveMembers };
