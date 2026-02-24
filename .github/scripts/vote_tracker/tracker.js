const { isVotingWithinLastThreeMonths } = require("./utils");

const REQUIRED_KEYS = [
  "name",
  "lastParticipatedVoteTime",
  "isVotedInLast3Months",
  "lastVoteClosedTime",
  "agreeCount",
  "disagreeCount",
  "abstainCount",
  "notParticipatingCount",
];

/**
 * Returns the first member record that has all required statistical keys,
 * used as a template when creating records for newly added TSC members.
 *
 * @param {Object[]} voteDetails - Existing vote tracking records
 * @returns {Object|undefined}
 */
function findValidTemplateMember(voteDetails) {
  return voteDetails.find((member) =>
    REQUIRED_KEYS.every((key) => Object.prototype.hasOwnProperty.call(member, key))
  );
}

/**
 * Creates a blank vote record for a new TSC member by copying the key structure
 * of an existing valid record and filling defaults.
 *
 * @param {{ github: string }} member - TSC member entry from the YAML file
 * @param {Object} templateMember - An existing valid vote record used as a structural template
 * @returns {Object}
 */
function buildNewMemberRecord(member, templateMember) {
  const newMember = {};
  Object.keys(templateMember).forEach((key) => {
    switch (key) {
      case "name":
        newMember[key] = member.github;
        break;
      case "lastParticipatedVoteTime":
      case "isVotedInLast3Months":
        newMember[key] = "Member has not participated in all previous voting process.";
        break;
      case "lastVoteClosedTime":
        newMember[key] = new Date().toISOString().split("T")[0];
        break;
      case "firstVoteClosedTime":
        // Preserved so we can calculate duration between first and latest vote
        newMember[key] = templateMember["firstVoteClosedTime"];
        break;
      case "agreeCount":
      case "disagreeCount":
      case "abstainCount":
      case "notParticipatingCount":
        newMember[key] = 0;
        break;
      default:
        // Past vote columns default to "Not participated"
        newMember[key] = "Not participated";
    }
  });
  return newMember;
}

/**
 * Returns new records only for TSC members who are not yet tracked.
 *
 * @param {Object[]} voteDetails - Existing vote tracking records
 * @param {{ github: string }[]} tscMembers - Current TSC members from YAML
 * @param {Object} templateMember - Template record for structural reference
 * @returns {Object[]}
 */
function findNewMembers(voteDetails, tscMembers, templateMember) {
  return tscMembers
    .filter(
      (member) =>
        !voteDetails.find(
          (voteInfo) =>
            voteInfo.name.toLowerCase() === member.github.toLowerCase()
        )
    )
    .map((member) => buildNewMemberRecord(member, templateMember));
}

/**
 * Applies a single vote (or non-participation) to a member's record and returns
 * a new object with the new vote column inserted directly after "name".
 *
 * Note: isVotedInLast3Months is evaluated against the previous lastParticipatedVoteTime
 * before it is updated — this preserves the behaviour of the original implementation.
 *
 * @param {Object} voteInfo - The member's current vote record (not mutated)
 * @param {{ user: string, vote: string, timestamp: string } | undefined} userVote
 * @param {string} eventTitle - The GitHub issue title
 * @param {string|number} eventNumber - The GitHub issue number
 * @returns {Object}
 */
function applyVoteToRecord(voteInfo, userVote, eventTitle, eventNumber) {
  const updated = { ...voteInfo };
  const voteKey = `${eventTitle}$$${eventNumber}`;

  updated.lastVoteClosedTime = new Date().toISOString().split("T")[0];

  let voteChoice;
  if (userVote) {
    voteChoice = userVote.vote;
    const currentTime = userVote.timestamp.toString().split(" ")[0];
    // Evaluate against the OLD lastParticipatedVoteTime (original behaviour)
    updated.isVotedInLast3Months = isVotingWithinLastThreeMonths(updated);
    updated.lastParticipatedVoteTime = currentTime;
    if (voteChoice === "In favor") {
      updated.agreeCount++;
    } else if (voteChoice === "Against") {
      updated.disagreeCount++;
    } else {
      updated.abstainCount++;
    }
  } else {
    voteChoice = "Not participated";
    updated.notParticipatingCount++;
    if (!isVotingWithinLastThreeMonths(updated)) {
      updated.isVotedInLast3Months = false;
    }
  }

  // Re-insert keys so the new vote column sits directly after "name"
  const result = {};
  Object.keys(updated).forEach((key) => {
    if (key === "name") {
      result["name"] = updated.name;
      result[voteKey] = voteChoice;
    } else {
      result[key] = updated[key];
    }
  });

  return result;
}

/**
 * Applies all latest votes to every tracked member's record.
 * Members absent from latestVotes are recorded as "Not participated".
 *
 * @param {Object[]} voteDetails - All current vote records
 * @param {{ user: string, vote: string, timestamp: string }[]} latestVotes
 * @param {string} eventTitle - The GitHub issue title
 * @param {string|number} eventNumber - The GitHub issue number
 * @returns {Object[]}
 */
function processVoteDetails(voteDetails, latestVotes, eventTitle, eventNumber) {
  return voteDetails.map((voteInfo) => {
    const userVote = latestVotes.find(
      (vote) => vote.user.toLowerCase() === voteInfo.name.toLowerCase()
    );
    return applyVoteToRecord(voteInfo, userVote, eventTitle, eventNumber);
  });
}

module.exports = {
  findValidTemplateMember,
  buildNewMemberRecord,
  findNewMembers,
  applyVoteToRecord,
  processVoteDetails,
};
