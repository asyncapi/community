const { parseVoteClosedComment, parseLatestVotes } = require("../.github/scripts/vote_tracker/parser");

// Minimal bot comment format as produced by git-vote[bot]
// See: https://github.com/asyncapi/community/issues/1227#issuecomment-2167463252
const SAMPLE_COMMENT = `
Vote closed

### Binding votes (3)

| Voter | Vote | Date |
| --- | --- | --- |
| @derberg | In favor | 2026-01-07 12:07:21.0 +00:00:00 |
| @dalelane | Abstain | 2026-01-08 13:09:00.0 +00:00:00 |
| @cdavernas | In favor | 2026-01-08 09:10:25.0 +00:00:00 |

<details>
<summary>Non-binding votes (1)</summary>

| Voter | Vote | Date |
| --- | --- | --- |
| @someone | In favor | 2026-01-08 14:00:00.0 +00:00:00 |
</details>
`;

const COMMENT_NO_BINDING_VOTES = `
Vote closed

No binding votes cast.

<details>
<summary>Non-binding votes (0)</summary>
</details>
`;

describe("parseVoteClosedComment", () => {
  it("extracts binding vote rows from a well-formed comment", () => {
    const rows = parseVoteClosedComment(SAMPLE_COMMENT);
    expect(rows).toHaveLength(3);
    expect(rows[0]).toContain("@derberg");
    expect(rows[1]).toContain("@dalelane");
    expect(rows[2]).toContain("@cdavernas");
  });

  it("excludes non-binding vote rows (inside <details>)", () => {
    const rows = parseVoteClosedComment(SAMPLE_COMMENT);
    const hasNonBinding = rows.some((r) => r.includes("@someone"));
    expect(hasNonBinding).toBe(false);
  });

  it("returns an empty array when there is no binding votes section", () => {
    const rows = parseVoteClosedComment(COMMENT_NO_BINDING_VOTES);
    expect(rows).toEqual([]);
  });

  it("returns an empty array for an empty string", () => {
    expect(parseVoteClosedComment("")).toEqual([]);
  });
});

describe("parseLatestVotes", () => {
  it("maps raw rows to structured vote objects", () => {
    const rows = parseVoteClosedComment(SAMPLE_COMMENT);
    const votes = parseLatestVotes(rows);

    expect(votes).toHaveLength(3);
    expect(votes[0]).toEqual({
      user: "derberg",
      vote: "In favor",
      timestamp: "2026-01-07 12:07:21.0 +00:00:00",
      isVotedInLast3Months: true,
    });
    expect(votes[1]).toEqual({
      user: "dalelane",
      vote: "Abstain",
      timestamp: "2026-01-08 13:09:00.0 +00:00:00",
      isVotedInLast3Months: true,
    });
  });

  it("strips the @ prefix from usernames", () => {
    const rows = ["| @myuser | In favor | 2026-01-07 10:00:00.0 +00:00:00 |"];
    const votes = parseLatestVotes(rows);
    expect(votes[0].user).toBe("myuser");
  });

  it("sets isVotedInLast3Months to true for all parsed votes", () => {
    const rows = parseVoteClosedComment(SAMPLE_COMMENT);
    const votes = parseLatestVotes(rows);
    votes.forEach((v) => expect(v.isVotedInLast3Months).toBe(true));
  });

  it("returns an empty array for empty input", () => {
    expect(parseLatestVotes([])).toEqual([]);
  });
});
