const { buildVoteDetails, findInactiveMembers } = require("../.github/scripts/vote_tracker/tracker");

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const TSC_MEMBERS = [
  { github: "alice" },
  { github: "bob" },
  { github: "carol" },
];

const VOTING_ROUNDS = [
  {
    issueNumber: 100,
    issueTitle: "Proposal Alpha",
    voteClosedAt: "2025-06-01",
    votes: [
      { user: "alice", vote: "In favor",  timestamp: "2025-06-01 10:00:00.0 +00:00:00" },
      { user: "bob",   vote: "Against",   timestamp: "2025-06-01 11:00:00.0 +00:00:00" },
      // carol did not vote
    ],
  },
  {
    issueNumber: 200,
    issueTitle: "Proposal Beta",
    voteClosedAt: "2025-09-01",
    votes: [
      { user: "alice", vote: "Abstain",  timestamp: "2025-09-01 09:00:00.0 +00:00:00" },
      { user: "carol", vote: "In favor", timestamp: "2025-09-01 14:00:00.0 +00:00:00" },
      // bob did not vote
    ],
  },
];

// ---------------------------------------------------------------------------
// buildVoteDetails
// ---------------------------------------------------------------------------

describe("buildVoteDetails", () => {
  let result;

  beforeEach(() => {
    result = buildVoteDetails(TSC_MEMBERS, VOTING_ROUNDS);
  });

  it("produces exactly one record per TSC member", () => {
    expect(result).toHaveLength(3);
    expect(result.map((r) => r.name)).toEqual(["alice", "bob", "carol"]);
  });

  it("inserts vote columns in chronological (oldest-first) order after name", () => {
    const alice = result.find((r) => r.name === "alice");
    const keys = Object.keys(alice);
    expect(keys[0]).toBe("name");
    expect(keys[1]).toBe("Proposal Alpha$$100");
    expect(keys[2]).toBe("Proposal Beta$$200");
  });

  it("records the correct vote choice for each member and round", () => {
    const alice = result.find((r) => r.name === "alice");
    expect(alice["Proposal Alpha$$100"]).toBe("In favor");
    expect(alice["Proposal Beta$$200"]).toBe("Abstain");

    const bob = result.find((r) => r.name === "bob");
    expect(bob["Proposal Alpha$$100"]).toBe("Against");
    expect(bob["Proposal Beta$$200"]).toBe("Not participated");

    const carol = result.find((r) => r.name === "carol");
    expect(carol["Proposal Alpha$$100"]).toBe("Not participated");
    expect(carol["Proposal Beta$$200"]).toBe("In favor");
  });

  it("increments agreeCount, disagreeCount, abstainCount correctly", () => {
    const alice = result.find((r) => r.name === "alice");
    expect(alice.agreeCount).toBe(1);
    expect(alice.disagreeCount).toBe(0);
    expect(alice.abstainCount).toBe(1);

    const bob = result.find((r) => r.name === "bob");
    expect(bob.agreeCount).toBe(0);
    expect(bob.disagreeCount).toBe(1);
    expect(bob.abstainCount).toBe(0);
  });

  it("increments notParticipatingCount for missed rounds", () => {
    const carol = result.find((r) => r.name === "carol");
    expect(carol.notParticipatingCount).toBe(1);

    const bob = result.find((r) => r.name === "bob");
    expect(bob.notParticipatingCount).toBe(1);
  });

  it("sets lastParticipatedVoteTime to the date part of the most recent vote timestamp", () => {
    const alice = result.find((r) => r.name === "alice");
    expect(alice.lastParticipatedVoteTime).toBe("2025-09-01");

    const bob = result.find((r) => r.name === "bob");
    expect(bob.lastParticipatedVoteTime).toBe("2025-06-01");
  });

  it("sets lastVoteClosedTime to the most recent round's close date", () => {
    result.forEach((r) => {
      expect(r.lastVoteClosedTime).toBe("2025-09-01");
    });
  });

  it("sets firstVoteClosedTime to the oldest round's close date", () => {
    result.forEach((r) => {
      expect(r.firstVoteClosedTime).toBe("2025-06-01");
    });
  });

  it("uses the never-voted placeholder string for members who missed all rounds", () => {
    const neverVoted = buildVoteDetails([{ github: "ghost" }], VOTING_ROUNDS);
    const ghost = neverVoted[0];
    expect(ghost.lastParticipatedVoteTime).toBe(
      "Member has not participated in all previous voting process."
    );
    expect(ghost.isVotedInLast3Months).toBe(
      "Member has not participated in all previous voting process."
    );
    expect(ghost.agreeCount).toBe(0);
    expect(ghost.notParticipatingCount).toBe(2);
  });

  it("does case-insensitive username matching", () => {
    const members = [{ github: "Alice" }];
    const rounds = [
      {
        issueNumber: 1,
        issueTitle: "Test",
        voteClosedAt: "2025-01-01",
        votes: [{ user: "ALICE", vote: "In favor", timestamp: "2025-01-01 10:00:00.0 +00:00:00" }],
      },
    ];
    const out = buildVoteDetails(members, rounds);
    expect(out[0]["Test$$1"]).toBe("In favor");
  });

  it("returns an empty array when there are no TSC members", () => {
    expect(buildVoteDetails([], VOTING_ROUNDS)).toEqual([]);
  });

  it("produces records with null dates and zero counts when there are no voting rounds", () => {
    const out = buildVoteDetails(TSC_MEMBERS, []);
    out.forEach((r) => {
      expect(r.firstVoteClosedTime).toBeNull();
      expect(r.lastVoteClosedTime).toBeNull();
      expect(r.agreeCount).toBe(0);
    });
  });

  it("excludes departed members — only current tscMembers appear in output", () => {
    const subset = [{ github: "alice" }];
    const out = buildVoteDetails(subset, VOTING_ROUNDS);
    expect(out).toHaveLength(1);
    expect(out[0].name).toBe("alice");
  });
});

// ---------------------------------------------------------------------------
// findInactiveMembers
// ---------------------------------------------------------------------------

describe("findInactiveMembers", () => {
  // Round 0: alice, bob, and carol all vote (establishes their participation history).
  // Rounds 1-3: alice keeps voting; bob drops out after round 1; carol drops out after round 0.
  // dave is added as a member who has never voted in any round (simulates a new TSC member).
  const members = [{ github: "alice" }, { github: "bob" }, { github: "carol" }];
  const rounds = [
    {
      issueNumber: 0, issueTitle: "Round 0", voteClosedAt: "2024-10-01",
      votes: [
        { user: "alice", vote: "In favor", timestamp: "2024-10-01 10:00:00.0 +00:00:00" },
        { user: "bob",   vote: "In favor", timestamp: "2024-10-01 11:00:00.0 +00:00:00" },
        { user: "carol", vote: "In favor", timestamp: "2024-10-01 12:00:00.0 +00:00:00" },
      ],
    },
    {
      issueNumber: 1, issueTitle: "Round 1", voteClosedAt: "2025-01-01",
      votes: [
        { user: "alice", vote: "In favor", timestamp: "2025-01-01 10:00:00.0 +00:00:00" },
        { user: "bob",   vote: "In favor", timestamp: "2025-01-01 11:00:00.0 +00:00:00" },
      ],
    },
    {
      issueNumber: 2, issueTitle: "Round 2", voteClosedAt: "2025-04-01",
      votes: [
        { user: "alice", vote: "In favor", timestamp: "2025-04-01 10:00:00.0 +00:00:00" },
      ],
    },
    {
      issueNumber: 3, issueTitle: "Round 3", voteClosedAt: "2025-07-01",
      votes: [
        { user: "alice", vote: "In favor", timestamp: "2025-07-01 10:00:00.0 +00:00:00" },
      ],
    },
  ];

  let voteDetails;
  beforeEach(() => {
    voteDetails = buildVoteDetails(members, rounds);
  });

  it("flags members who have voted before but missed all of the last N rounds", () => {
    // carol voted in round 0 then went silent — genuinely inactive
    const inactive = findInactiveMembers(voteDetails, 3);
    expect(inactive.map((m) => m.name)).toContain("carol");
  });

  it("does not flag members who participated in at least one of the last N rounds", () => {
    const inactive = findInactiveMembers(voteDetails, 3);
    const names = inactive.map((m) => m.name);
    expect(names).not.toContain("alice");
    expect(names).not.toContain("bob"); // voted in rounds 0+1, missed rounds 2+3 — only 2 misses, not 3
  });

  it("does not flag members who have never voted (potential new TSC members)", () => {
    const membersWithNew = [...members, { github: "dave" }];
    const details = buildVoteDetails(membersWithNew, rounds);
    const inactive = findInactiveMembers(details, 3);
    expect(inactive.map((m) => m.name)).not.toContain("dave");
  });

  it("returns an empty array when fewer rounds exist than the threshold", () => {
    const only2Rounds = buildVoteDetails(members, rounds.slice(0, 2));
    expect(findInactiveMembers(only2Rounds, 3)).toEqual([]);
  });

  it("returns an empty array when voteDetails is empty", () => {
    expect(findInactiveMembers([], 3)).toEqual([]);
  });

  it("respects a custom lastNRounds threshold", () => {
    // With threshold=2, bob (voted in rounds 0+1, missed rounds 2+3) should be flagged
    // carol (voted in round 0, missed rounds 1+2+3) should also be flagged
    const inactive = findInactiveMembers(voteDetails, 2);
    const names = inactive.map((m) => m.name);
    expect(names).toContain("bob");
    expect(names).toContain("carol");
    expect(names).not.toContain("alice");
  });

  it("returns an empty array when all members are active", () => {
    const activeRounds = [
      {
        issueNumber: 1, issueTitle: "R", voteClosedAt: "2025-01-01",
        votes: [
          { user: "alice", vote: "In favor", timestamp: "2025-01-01 10:00:00.0 +00:00:00" },
          { user: "bob",   vote: "In favor", timestamp: "2025-01-01 10:00:00.0 +00:00:00" },
          { user: "carol", vote: "In favor", timestamp: "2025-01-01 10:00:00.0 +00:00:00" },
        ],
      },
      {
        issueNumber: 2, issueTitle: "R2", voteClosedAt: "2025-04-01",
        votes: [
          { user: "alice", vote: "In favor", timestamp: "2025-04-01 10:00:00.0 +00:00:00" },
          { user: "bob",   vote: "In favor", timestamp: "2025-04-01 10:00:00.0 +00:00:00" },
          { user: "carol", vote: "In favor", timestamp: "2025-04-01 10:00:00.0 +00:00:00" },
        ],
      },
      {
        issueNumber: 3, issueTitle: "R3", voteClosedAt: "2025-07-01",
        votes: [
          { user: "alice", vote: "In favor", timestamp: "2025-07-01 10:00:00.0 +00:00:00" },
          { user: "bob",   vote: "In favor", timestamp: "2025-07-01 10:00:00.0 +00:00:00" },
          { user: "carol", vote: "In favor", timestamp: "2025-07-01 10:00:00.0 +00:00:00" },
        ],
      },
    ];
    const details = buildVoteDetails(members, activeRounds);
    expect(findInactiveMembers(details, 3)).toEqual([]);
  });
});
