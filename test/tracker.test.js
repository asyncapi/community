const { buildVoteDetails, findInactiveMembers, NOT_A_MEMBER_YET } = require("../.github/scripts/vote_tracker/tracker");

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

  it("sets firstEligibleVoteTime to the close date of the first vote the member was eligible for", () => {
    // all three members in TSC_MEMBERS have no tscMemberSince, so eligible from round 1
    result.forEach((r) => {
      expect(r.firstEligibleVoteTime).toBe("2025-06-01");
    });
  });

  it("uses the never-voted placeholder string for members who missed all rounds", () => {
    const neverVoted = buildVoteDetails([{ github: "ghost" }], VOTING_ROUNDS);
    const ghost = neverVoted[0];
    expect(ghost.lastParticipatedVoteTime).toBe(
      "Member has not participated in all previous voting processes."
    );
    expect(ghost.isVotedInLast3Months).toBe(
      "Member has not participated in all previous voting processes."
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
// buildVoteDetails – tscMemberSince guard
// ---------------------------------------------------------------------------

describe("buildVoteDetails – tscMemberSince guard", () => {
  const members = [
    { github: "alice" },
    { github: "bob", tscMemberSince: "2025-07-01" },
  ];
  const rounds = [
    {
      issueNumber: 100,
      issueTitle: "Early Vote",
      voteClosedAt: "2025-06-01",
      votes: [
        { user: "alice", vote: "In favor", timestamp: "2025-06-01 10:00:00.0 +00:00:00" },
        // bob is not a member yet
      ],
    },
    {
      issueNumber: 200,
      issueTitle: "Later Vote",
      voteClosedAt: "2025-09-01",
      votes: [
        { user: "alice", vote: "Against", timestamp: "2025-09-01 10:00:00.0 +00:00:00" },
        // bob did not vote
      ],
    },
  ];

  let result;
  beforeEach(() => {
    result = buildVoteDetails(members, rounds);
  });

  it("marks rounds before tscMemberSince as NOT_A_MEMBER_YET", () => {
    const bob = result.find((r) => r.name === "bob");
    expect(bob["Early Vote$$100"]).toBe(NOT_A_MEMBER_YET);
  });

  it("does not count pre-membership rounds in agree/disagree/abstain metrics", () => {
    const bob = result.find((r) => r.name === "bob");
    expect(bob.agreeCount).toBe(0);
    expect(bob.disagreeCount).toBe(0);
    expect(bob.abstainCount).toBe(0);
    // notParticipatingCount is 1 from the post-membership round 200 (bob didn't vote)
    expect(bob.notParticipatingCount).toBe(1);
  });

  it("marks missed post-membership rounds as 'Not participated'", () => {
    const bob = result.find((r) => r.name === "bob");
    expect(bob["Later Vote$$200"]).toBe("Not participated");
    expect(bob.notParticipatingCount).toBe(1);
  });

  it("applies no restriction for members without tscMemberSince", () => {
    const alice = result.find((r) => r.name === "alice");
    expect(alice["Early Vote$$100"]).toBe("In favor");
    expect(alice["Later Vote$$200"]).toBe("Against");
  });

  it("sets firstEligibleVoteTime to the first post-membership round's close date", () => {
    const bob = result.find((r) => r.name === "bob");
    // bob joined 2025-07-01, so "Early Vote" (2025-06-01) is pre-membership
    // first eligible round is "Later Vote" (2025-09-01)
    expect(bob.firstEligibleVoteTime).toBe("2025-09-01");

    const alice = result.find((r) => r.name === "alice");
    // alice has no tscMemberSince, so eligible from the very first round
    expect(alice.firstEligibleVoteTime).toBe("2025-06-01");
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
      issueNumber: 2, issueTitle: "Round 2", voteClosedAt: "2025-05-01",
      votes: [
        { user: "alice", vote: "In favor", timestamp: "2025-05-01 10:00:00.0 +00:00:00" },
      ],
    },
    {
      issueNumber: 3, issueTitle: "Round 3", voteClosedAt: "2025-07-01",
      votes: [
        { user: "alice", vote: "In favor", timestamp: "2025-07-01 10:00:00.0 +00:00:00" },
      ],
    },
  ];

  // bob  misses rounds 2-3: 2025-05-01 → 2025-07-01 = 2 months  (below 3-month threshold)
  // carol misses rounds 1-3: 2025-01-01 → 2025-07-01 = 6 months (above 3-month threshold)

  let voteDetails;
  let voteDates;
  beforeEach(() => {
    voteDetails = buildVoteDetails(members, rounds);
    voteDates = new Map(rounds.map((r) => [`${r.issueTitle}$$${r.issueNumber}`, r.voteClosedAt]));
  });

  it("flags members who have voted before but missed consecutive votes spanning 3+ months", () => {
    // carol voted in round 0 then went silent — 3 consecutive misses spanning 6 months
    const inactive = findInactiveMembers(voteDetails, voteDates, 3);
    expect(inactive.map((m) => m.name)).toContain("carol");
  });

  it("attaches _inactivityReason to each flagged member", () => {
    const inactive = findInactiveMembers(voteDetails, voteDates, 3);
    const carol = inactive.find((m) => m.name === "carol");
    expect(carol._inactivityReason).toContain("3 consecutive missed vote(s)");
    expect(carol._inactivityReason).toContain("Last participated: 2024-10-01");
    expect(carol._inactivityReason).toContain("Round 1");
  });

  it("does not flag members whose consecutive misses span less than 3 months", () => {
    // bob missed rounds 2+3 (2025-05-01 → 2025-07-01 = 2 months) — below the 3-month threshold
    const inactive = findInactiveMembers(voteDetails, voteDates, 3);
    const names = inactive.map((m) => m.name);
    expect(names).not.toContain("alice");
    expect(names).not.toContain("bob");
  });

  it("does not flag a never-voted member whose first eligible vote is less than 3 months before the last vote", () => {
    // eve joined just before round 3 (2025-07-01) — her first eligible vote is round 3,
    // which is also the last vote, so 0 months have elapsed → grace period still active
    const membersWithEve = [...members, { github: "eve", tscMemberSince: "2025-06-15" }];
    const details = buildVoteDetails(membersWithEve, rounds);
    const inactive = findInactiveMembers(details, voteDates, 2);
    expect(inactive.map((m) => m.name)).not.toContain("eve");
  });

  it("flags a never-voted member whose first eligible vote is 3+ months before the last vote", () => {
    // dave has no tscMemberSince — eligible from round 0 (2024-10-01).
    // last vote closes 2025-07-01 = 9 months later → should be flagged
    const membersWithDave = [...members, { github: "dave" }];
    const details = buildVoteDetails(membersWithDave, rounds);
    const inactive = findInactiveMembers(details, voteDates, 2);
    const dave = inactive.find((m) => m.name === "dave");
    expect(dave).toBeDefined();
    expect(dave._inactivityReason).toContain("Never voted");
  });

  it("returns an empty array when fewer rounds exist than the threshold", () => {
    const only2Rounds = buildVoteDetails(members, rounds.slice(0, 2));
    const only2Dates = new Map(rounds.slice(0, 2).map((r) => [`${r.issueTitle}$$${r.issueNumber}`, r.voteClosedAt]));
    expect(findInactiveMembers(only2Rounds, only2Dates, 3)).toEqual([]);
  });

  it("returns an empty array when voteDetails is empty", () => {
    expect(findInactiveMembers([], new Map(), 3)).toEqual([]);
  });

  it("enforces the 3-month span check even when the consecutive-miss count meets the threshold", () => {
    // bob has 2 consecutive misses (rounds 2-3) spanning only 2 months — span too short
    // carol has 3 consecutive misses spanning 6 months — flagged even at threshold=2
    const inactive = findInactiveMembers(voteDetails, voteDates, 2);
    const names = inactive.map((m) => m.name);
    expect(names).not.toContain("bob");   // count ≥ threshold but span < 3 months
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
    const activeDates = new Map(activeRounds.map((r) => [`${r.issueTitle}$$${r.issueNumber}`, r.voteClosedAt]));
    const details = buildVoteDetails(members, activeRounds);
    expect(findInactiveMembers(details, activeDates, 3)).toEqual([]);
  });

  it("does not flag a member whose last-N rounds contain 'Not a member yet' entries", () => {
    // frank joined 2025-02-01 — rounds 0 and 1 are pre-membership ("Not a member yet")
    // he voted in round 2, then missed round 3 ("Not participated")
    // with threshold=3, last-3 keys are rounds 1/2/3: "Not a member yet", "In favor", "Not participated"
    // NOT all three are "Not participated" → frank should NOT be flagged
    const membersWithFrank = [...members, { github: "frank", tscMemberSince: "2025-02-01" }];
    const frankRounds = [
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
          // frank is not a member yet
        ],
      },
      {
        issueNumber: 2, issueTitle: "Round 2", voteClosedAt: "2025-04-01",
        votes: [
          { user: "alice", vote: "In favor", timestamp: "2025-04-01 10:00:00.0 +00:00:00" },
          { user: "frank", vote: "In favor", timestamp: "2025-04-01 12:00:00.0 +00:00:00" },
        ],
      },
      {
        issueNumber: 3, issueTitle: "Round 3", voteClosedAt: "2025-07-01",
        votes: [
          { user: "alice", vote: "In favor", timestamp: "2025-07-01 10:00:00.0 +00:00:00" },
          // frank missed round 3
        ],
      },
    ];
    const frankDates = new Map(frankRounds.map((r) => [`${r.issueTitle}$$${r.issueNumber}`, r.voteClosedAt]));
    const details = buildVoteDetails(membersWithFrank, frankRounds);
    const inactive = findInactiveMembers(details, frankDates, 3);
    expect(inactive.map((m) => m.name)).not.toContain("frank");
  });
});
