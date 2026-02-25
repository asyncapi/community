const { isVotingWithinLastThreeMonths } = require("./utils");

const NEVER_VOTED_PLACEHOLDER = "Member has not participated in all previous voting process.";
const NOT_A_MEMBER_YET = "Not a member yet";

/**
 * Builds a complete, fresh vote tracking dataset for the current set of TSC
 * members based on all historical voting rounds.
 *
 * Members who are no longer in tscMembers are automatically excluded.
 * Members who are newly added get "Not a member yet" for rounds that closed before
 * their tscMemberSince date, and "Not participated" for post-membership rounds they missed.
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
 * @param {{ github: string, tscMemberSince?: string }[]} tscMembers - Current TSC members from the YAML file
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

      lastVoteClosedTime = voteClosedAt;

      // If the vote closed before this member joined TSC, mark it as pre-membership
      // and skip all participation metrics — this avoids misleading "Not participated" entries.
      if (member.tscMemberSince && voteClosedAt < member.tscMemberSince) {
        record[voteKey] = NOT_A_MEMBER_YET;
        continue;
      }

      const userVote = votes.find((v) => v.user.toLowerCase() === lowerName);
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
 * Returns members who are inactive per the charter rule:
 * "does not participate in TSC votes within any three-month period."
 *
 * A member is considered inactive when ALL of these are true:
 *   1. They have voted at least once (not a brand-new TSC member).
 *   2. Their most recent `lastNRounds` votes are all "Not participated".
 *   3. Those consecutive missed votes span at least 3 calendar months
 *      (from the close date of the oldest miss to the close date of the newest).
 *
 * The 3-month span guard prevents a burst of votes in a short window from
 * accidentally triggering removal.
 *
 * Each returned member is enriched with a `_inactivityReason` string suitable
 * for audit logging.
 *
 * @param {Object[]} voteDetails - Output of buildVoteDetails
 * @param {Map<string, string>} voteDates - Map from voteKey ("Title$$N") to ISO close date ("YYYY-MM-DD")
 * @param {number} lastNRounds - Minimum consecutive missed votes required (default 2)
 * @returns {Object[]} Subset of voteDetails whose members meet the inactivity criteria
 */
function findInactiveMembers(voteDetails, voteDates, lastNRounds = 2) {
  if (!voteDetails || voteDetails.length === 0) return [];

  // Vote-round columns are identified by the '$$' separator in their key
  const allVoteKeys = Object.keys(voteDetails[0]).filter((k) => k.includes("$$"));
  if (allVoteKeys.length < lastNRounds) return [];

  const inactive = [];

  for (const member of voteDetails) {
    // Skip members who have never voted — they may be newly added to TSC
    // and haven't had the opportunity to participate yet.
    if (member.lastParticipatedVoteTime === NEVER_VOTED_PLACEHOLDER) continue;

    // Collect trailing consecutive "Not participated" entries (oldest first)
    const trailingMisses = [];
    for (let i = allVoteKeys.length - 1; i >= 0; i--) {
      if (member[allVoteKeys[i]] === "Not participated") {
        trailingMisses.unshift(allVoteKeys[i]);
      } else {
        break;
      }
    }

    if (trailingMisses.length < lastNRounds) continue;

    // Charter rule: the consecutive missed votes must span at least 3 calendar months
    const oldestKey = trailingMisses[0];
    const newestKey = trailingMisses[trailingMisses.length - 1];
    const oldestDate = new Date(voteDates.get(oldestKey));
    const newestDate = new Date(voteDates.get(newestKey));

    const threeMonthsAfterOldest = new Date(oldestDate);
    threeMonthsAfterOldest.setMonth(threeMonthsAfterOldest.getMonth() + 3);

    if (newestDate < threeMonthsAfterOldest) continue;

    // Build a human-readable reason for audit logging
    const spanMs = newestDate - oldestDate;
    const spanMonths = (spanMs / (1000 * 60 * 60 * 24 * 30.44)).toFixed(1);
    const missedList = trailingMisses
      .map((k) => `      - "${k.split("$$")[0]}" (closed ${voteDates.get(k)})`)
      .join("\n");
    const _inactivityReason =
      `${trailingMisses.length} consecutive missed vote(s) spanning ${spanMonths} months ` +
      `(charter: no participation within any 3-month period)\n` +
      `    Last participated: ${member.lastParticipatedVoteTime}\n` +
      `    Missed votes:\n${missedList}`;

    inactive.push({ ...member, _inactivityReason });
  }

  return inactive;
}

module.exports = { buildVoteDetails, findInactiveMembers, NOT_A_MEMBER_YET };
