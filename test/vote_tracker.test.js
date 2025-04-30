const { isVotingWithinLastThreeMonths } = require('../.github/scripts/vote_tracker/utils.js');

describe('Vote Tracker Edge Cases', () => {
  test.each([
    [
      "More than 90 Days Ago (Should be False)",
      {
        name: "testUser2",
        "Budget 2025$$1681": "In favor",
        "2024 budget refresh and request for urgent pre-approval of some 2025 costs$$1598": "Against",
        "Should AsyncAPI Initiative endorse United Nations Global Digital Compact?$$1577": "Not Participating",
        lastParticipatedVoteTime: "2024-12-15",
        isVotedInLast3Months: true,
        lastVoteClosedTime: "2025-03-31",
        firstVoteClosedTime: "2024-04-01",
        agreeCount: 3,
        disagreeCount: 2,
        abstainCount: 0,
        notParticipatingCount: 1
      },
      false
    ],
    [
      "Has Never Voted (Should be False)",
      {
        name: "newMember",
        lastParticipatedVoteTime: "Member has not participated in all previous voting process.",
        isVotedInLast3Months: "Member has not participated in all previous voting process.",
        lastVoteClosedTime: "2025-03-31",
        firstVoteClosedTime: "2024-04-01",
        agreeCount: 0,
        disagreeCount: 0,
        abstainCount: 0,
        notParticipatingCount: 5
      },
      false
    ],
    [
      "Future Last Participation Date (Invalid - Should be False)",
      {
        name: "testUser3",
        "Budget 2025$$1681": "In favor",
        "2024 budget refresh and request for urgent pre-approval of some 2025 costs$$1598": "Abstain",
        "Should AsyncAPI Initiative endorse United Nations Global Digital Compact?$$1577": "Against",
        lastParticipatedVoteTime: "2025-04-10",
        isVotedInLast3Months: true,
        lastVoteClosedTime: "2025-03-31",
        firstVoteClosedTime: "2024-04-01",
        agreeCount: 2,
        disagreeCount: 1,
        abstainCount: 2,
        notParticipatingCount: 0
      },
      false
    ],
    [
      "Just Joined and Voted Today (Should be True)",
      {
        name: "newActiveMember",
        "Budget 2025$$1681": "In favor",
        lastParticipatedVoteTime: "2025-03-31",
        isVotedInLast3Months: true,
        lastVoteClosedTime: "2025-03-31",
        firstVoteClosedTime: "2025-03-31",
        agreeCount: 1,
        disagreeCount: 0,
        abstainCount: 0,
        notParticipatingCount: 0
      },
      true
    ],
    [
      "Old Member, No Recent Votes (Should be False)",
      {
        name: "inactiveUser",
        "Budget 2025$$1681": "Not Participating",
        lastParticipatedVoteTime: "2024-06-20",
        isVotedInLast3Months: false,
        lastVoteClosedTime: "2025-03-31",
        firstVoteClosedTime: "2023-05-10",
        agreeCount: 0,
        disagreeCount: 0,
        abstainCount: 0,
        notParticipatingCount: 10
      },
      false
    ]
  ])('%s', (_, voteInfo, expectedResult) => {
    expect(isVotingWithinLastThreeMonths(voteInfo)).toBe(expectedResult);
  });
});
