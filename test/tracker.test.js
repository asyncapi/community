const {
  findValidTemplateMember,
  buildNewMemberRecord,
  findNewMembers,
  applyVoteToRecord,
  processVoteDetails,
} = require("../.github/scripts/vote_tracker/tracker");

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const TEMPLATE_MEMBER = {
  name: "existingUser",
  "Proposal A$$100": "In favor",
  lastParticipatedVoteTime: "2026-01-07",
  isVotedInLast3Months: true,
  lastVoteClosedTime: "2026-01-14",
  firstVoteClosedTime: "2024-04-12",
  agreeCount: 3,
  disagreeCount: 0,
  abstainCount: 1,
  notParticipatingCount: 1,
};

const VOTE_DETAILS = [
  TEMPLATE_MEMBER,
  {
    name: "anotherUser",
    "Proposal A$$100": "Not participated",
    lastParticipatedVoteTime: "Member has not participated in all previous voting process.",
    isVotedInLast3Months: "Member has not participated in all previous voting process.",
    lastVoteClosedTime: "2026-01-14",
    firstVoteClosedTime: "2024-04-12",
    agreeCount: 0,
    disagreeCount: 0,
    abstainCount: 0,
    notParticipatingCount: 1,
  },
];

// ---------------------------------------------------------------------------
// findValidTemplateMember
// ---------------------------------------------------------------------------

describe("findValidTemplateMember", () => {
  it("returns the first record that has all required statistical keys", () => {
    const result = findValidTemplateMember(VOTE_DETAILS);
    expect(result.name).toBe("existingUser");
  });

  it("returns undefined when no record has all required keys", () => {
    const incomplete = [{ name: "partial", agreeCount: 0 }];
    expect(findValidTemplateMember(incomplete)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// buildNewMemberRecord
// ---------------------------------------------------------------------------

describe("buildNewMemberRecord", () => {
  const newTscMember = { github: "brandNewUser" };
  let record;

  beforeEach(() => {
    record = buildNewMemberRecord(newTscMember, TEMPLATE_MEMBER);
  });

  it("sets name from the github handle", () => {
    expect(record.name).toBe("brandNewUser");
  });

  it("sets lastParticipatedVoteTime and isVotedInLast3Months to the placeholder string", () => {
    expect(record.lastParticipatedVoteTime).toBe(
      "Member has not participated in all previous voting process."
    );
    expect(record.isVotedInLast3Months).toBe(
      "Member has not participated in all previous voting process."
    );
  });

  it("sets all count fields to 0", () => {
    expect(record.agreeCount).toBe(0);
    expect(record.disagreeCount).toBe(0);
    expect(record.abstainCount).toBe(0);
    expect(record.notParticipatingCount).toBe(0);
  });

  it("carries over firstVoteClosedTime from the template", () => {
    expect(record.firstVoteClosedTime).toBe(TEMPLATE_MEMBER.firstVoteClosedTime);
  });

  it("defaults past vote columns to 'Not participated'", () => {
    expect(record["Proposal A$$100"]).toBe("Not participated");
  });

  it("sets lastVoteClosedTime to today", () => {
    const today = new Date().toISOString().split("T")[0];
    expect(record.lastVoteClosedTime).toBe(today);
  });
});

// ---------------------------------------------------------------------------
// findNewMembers
// ---------------------------------------------------------------------------

describe("findNewMembers", () => {
  const tscMembers = [
    { github: "existingUser" },   // already tracked — should be skipped
    { github: "brandNewUser" },   // not yet tracked — should be added
    { github: "AnotherUser" },    // case-insensitive match for "anotherUser"
  ];

  it("only returns records for members not yet in voteDetails", () => {
    const newMembers = findNewMembers(VOTE_DETAILS, tscMembers, TEMPLATE_MEMBER);
    expect(newMembers).toHaveLength(1);
    expect(newMembers[0].name).toBe("brandNewUser");
  });

  it("does case-insensitive comparison", () => {
    const tsc = [{ github: "EXISTINGUSER" }];
    const newMembers = findNewMembers(VOTE_DETAILS, tsc, TEMPLATE_MEMBER);
    expect(newMembers).toHaveLength(0);
  });

  it("returns an empty array when all TSC members are already tracked", () => {
    const tsc = [{ github: "existingUser" }, { github: "anotherUser" }];
    expect(findNewMembers(VOTE_DETAILS, tsc, TEMPLATE_MEMBER)).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// applyVoteToRecord
// ---------------------------------------------------------------------------

describe("applyVoteToRecord", () => {
  const EVENT_TITLE = "Budget 2026";
  const EVENT_NUMBER = 2221;
  const VOTE_KEY = `${EVENT_TITLE}$$${EVENT_NUMBER}`;

  const baseRecord = {
    name: "existingUser",
    "Proposal A$$100": "In favor",
    lastParticipatedVoteTime: "2026-01-07",
    isVotedInLast3Months: true,
    lastVoteClosedTime: "2026-01-14",
    firstVoteClosedTime: "2024-04-12",
    agreeCount: 3,
    disagreeCount: 0,
    abstainCount: 1,
    notParticipatingCount: 1,
  };

  it("inserts the new vote key directly after 'name'", () => {
    const userVote = { user: "existingUser", vote: "In favor", timestamp: "2026-01-20 10:00:00.0 +00:00:00" };
    const result = applyVoteToRecord(baseRecord, userVote, EVENT_TITLE, EVENT_NUMBER);
    const keys = Object.keys(result);
    expect(keys[0]).toBe("name");
    expect(keys[1]).toBe(VOTE_KEY);
  });

  it("increments agreeCount for 'In favor'", () => {
    const userVote = { user: "existingUser", vote: "In favor", timestamp: "2026-01-20 10:00:00.0 +00:00:00" };
    const result = applyVoteToRecord(baseRecord, userVote, EVENT_TITLE, EVENT_NUMBER);
    expect(result[VOTE_KEY]).toBe("In favor");
    expect(result.agreeCount).toBe(baseRecord.agreeCount + 1);
    expect(result.disagreeCount).toBe(baseRecord.disagreeCount);
    expect(result.abstainCount).toBe(baseRecord.abstainCount);
  });

  it("increments disagreeCount for 'Against'", () => {
    const userVote = { user: "existingUser", vote: "Against", timestamp: "2026-01-20 10:00:00.0 +00:00:00" };
    const result = applyVoteToRecord(baseRecord, userVote, EVENT_TITLE, EVENT_NUMBER);
    expect(result[VOTE_KEY]).toBe("Against");
    expect(result.disagreeCount).toBe(baseRecord.disagreeCount + 1);
  });

  it("increments abstainCount for 'Abstain'", () => {
    const userVote = { user: "existingUser", vote: "Abstain", timestamp: "2026-01-20 10:00:00.0 +00:00:00" };
    const result = applyVoteToRecord(baseRecord, userVote, EVENT_TITLE, EVENT_NUMBER);
    expect(result[VOTE_KEY]).toBe("Abstain");
    expect(result.abstainCount).toBe(baseRecord.abstainCount + 1);
  });

  it("updates lastParticipatedVoteTime to the date part of the timestamp", () => {
    const userVote = { user: "existingUser", vote: "In favor", timestamp: "2026-01-20 10:00:00.0 +00:00:00" };
    const result = applyVoteToRecord(baseRecord, userVote, EVENT_TITLE, EVENT_NUMBER);
    expect(result.lastParticipatedVoteTime).toBe("2026-01-20");
  });

  it("records 'Not participated' and increments notParticipatingCount when user did not vote", () => {
    const result = applyVoteToRecord(baseRecord, undefined, EVENT_TITLE, EVENT_NUMBER);
    expect(result[VOTE_KEY]).toBe("Not participated");
    expect(result.notParticipatingCount).toBe(baseRecord.notParticipatingCount + 1);
    expect(result.agreeCount).toBe(baseRecord.agreeCount);
  });

  it("updates lastVoteClosedTime to today", () => {
    const today = new Date().toISOString().split("T")[0];
    const result = applyVoteToRecord(baseRecord, undefined, EVENT_TITLE, EVENT_NUMBER);
    expect(result.lastVoteClosedTime).toBe(today);
  });

  it("does not mutate the original voteInfo object", () => {
    const snapshot = JSON.stringify(baseRecord);
    applyVoteToRecord(baseRecord, undefined, EVENT_TITLE, EVENT_NUMBER);
    expect(JSON.stringify(baseRecord)).toBe(snapshot);
  });
});

// ---------------------------------------------------------------------------
// processVoteDetails
// ---------------------------------------------------------------------------

describe("processVoteDetails", () => {
  const latestVotes = [
    { user: "existingUser", vote: "In favor", timestamp: "2026-01-20 10:00:00.0 +00:00:00", isVotedInLast3Months: true },
    // anotherUser is absent → "Not participated"
  ];

  it("applies votes to every member in voteDetails", () => {
    const result = processVoteDetails(VOTE_DETAILS, latestVotes, "Budget 2026", 2221);
    expect(result).toHaveLength(VOTE_DETAILS.length);
  });

  it("marks participating members with their vote choice", () => {
    const result = processVoteDetails(VOTE_DETAILS, latestVotes, "Budget 2026", 2221);
    const voter = result.find((r) => r.name === "existingUser");
    expect(voter["Budget 2026$$2221"]).toBe("In favor");
  });

  it("marks absent members as 'Not participated'", () => {
    const result = processVoteDetails(VOTE_DETAILS, latestVotes, "Budget 2026", 2221);
    const absent = result.find((r) => r.name === "anotherUser");
    expect(absent["Budget 2026$$2221"]).toBe("Not participated");
  });

  it("does case-insensitive username matching", () => {
    const votes = [{ user: "EXISTINGUSER", vote: "Abstain", timestamp: "2026-01-20 10:00:00.0 +00:00:00", isVotedInLast3Months: true }];
    const result = processVoteDetails(VOTE_DETAILS, votes, "Budget 2026", 2221);
    const voter = result.find((r) => r.name === "existingUser");
    expect(voter["Budget 2026$$2221"]).toBe("Abstain");
  });
});
