function isVotingWithinLastThreeMonths(voteInfo) {
  const currentDate = new Date();
  let lastVoteDate;
  if (voteInfo.lastParticipatedVoteTime && !voteInfo.lastParticipatedVoteTime.includes("Member has not")) {
    lastVoteDate = new Date(voteInfo.lastParticipatedVoteTime);
  } else {
    return false; // No valid voting history
  }

  if (lastVoteDate > currentDate) {
    return false;
  }

  const diffInDays = (currentDate - lastVoteDate) / (1000 * 60 * 60 * 24);
  return diffInDays <= 90; // 90 days = 3 months
}

module.exports = { isVotingWithinLastThreeMonths };
