const { fetchClosedVoteIssues, fetchVoteClosedComment } = require("../.github/scripts/vote_tracker/github");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeGithub(pages) {
  // pages: array of arrays — each outer element is one page of results
  let call = 0;
  return {
    request: jest.fn(async () => ({ data: pages[call++] ?? [] })),
  };
}

// ---------------------------------------------------------------------------
// fetchClosedVoteIssues
// ---------------------------------------------------------------------------

describe("fetchClosedVoteIssues", () => {
  const ISSUES = [
    { number: 100, title: "Proposal Alpha" },
    { number: 200, title: "Proposal Beta" },
    { number: 50,  title: "Proposal Gamma" },   // higher number comes last after sort
  ];

  it("calls the issues endpoint with the gitvote/closed label and state=all", async () => {
    const github = makeGithub([[...ISSUES], []]);
    await fetchClosedVoteIssues(github, "org", "repo");

    expect(github.request).toHaveBeenCalledWith(
      "GET /repos/{owner}/{repo}/issues",
      expect.objectContaining({
        owner: "org",
        repo: "repo",
        labels: "gitvote/closed",
        state: "all",
      })
    );
  });

  it("returns issues sorted by number ascending (oldest first)", async () => {
    const github = makeGithub([[...ISSUES], []]);
    const result = await fetchClosedVoteIssues(github, "org", "repo");

    expect(result.map((i) => i.number)).toEqual([50, 100, 200]);
  });

  it("returns only number and title fields", async () => {
    const github = makeGithub([[{ number: 1, title: "T", extra: "ignored" }], []]);
    const result = await fetchClosedVoteIssues(github, "org", "repo");
    expect(result[0]).toEqual({ number: 1, title: "T" });
  });

  it("paginates until the API returns an empty page", async () => {
    // First page full (100 items), second page partial, third empty
    const page1 = Array.from({ length: 100 }, (_, i) => ({ number: i + 1, title: `Issue ${i + 1}` }));
    const page2 = [{ number: 101, title: "Issue 101" }];
    const github = makeGithub([page1, page2, []]);

    const result = await fetchClosedVoteIssues(github, "org", "repo");
    expect(result).toHaveLength(101);
    expect(github.request).toHaveBeenCalledTimes(2); // stops after page2 length < 100
  });

  it("returns an empty array when there are no matching issues", async () => {
    const github = makeGithub([[]]);
    const result = await fetchClosedVoteIssues(github, "org", "repo");
    expect(result).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// fetchVoteClosedComment
// ---------------------------------------------------------------------------

const VOTE_CLOSED_BODY = `Vote closed

### Binding votes (2)

| Voter | Vote | Date |
| @alice | In favor | 2026-01-07 10:00:00.0 +00:00:00 |
| @bob   | Abstain  | 2026-01-08 11:00:00.0 +00:00:00 |

<details><summary>Non-binding</summary></details>`;

const OTHER_COMMENT = { body: "Just a regular comment", created_at: "2026-01-05T09:00:00Z", user: { login: "human" } };
const VOTE_COMMENT  = { body: VOTE_CLOSED_BODY, created_at: "2026-01-10T12:00:00Z", user: { login: "git-vote[bot]" } };

describe("fetchVoteClosedComment", () => {
  it("returns null when no Vote closed comment exists", async () => {
    const github = makeGithub([[OTHER_COMMENT], []]);
    const result = await fetchVoteClosedComment(github, "org", "repo", 123);
    expect(result).toBeNull();
  });

  it("returns the comment body and createdAt when found", async () => {
    const github = makeGithub([[OTHER_COMMENT, VOTE_COMMENT], []]);
    const result = await fetchVoteClosedComment(github, "org", "repo", 123);

    expect(result).not.toBeNull();
    expect(result.body).toBe(VOTE_CLOSED_BODY);
    expect(result.createdAt).toBe("2026-01-10T12:00:00Z");
  });

  it("calls the comments endpoint with the correct issue number", async () => {
    const github = makeGithub([[VOTE_COMMENT], []]);
    await fetchVoteClosedComment(github, "org", "repo", 999);

    expect(github.request).toHaveBeenCalledWith(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
      expect.objectContaining({ issue_number: 999 })
    );
  });

  it("returns the LAST Vote closed comment when multiple exist on one issue", async () => {
    const firstClose  = { body: VOTE_CLOSED_BODY, created_at: "2026-01-10T12:00:00Z", user: { login: "git-vote[bot]" } };
    const secondClose = { body: VOTE_CLOSED_BODY, created_at: "2026-02-10T12:00:00Z", user: { login: "git-vote[bot]" } };
    const github = makeGithub([[firstClose, OTHER_COMMENT, secondClose], []]);

    const result = await fetchVoteClosedComment(github, "org", "repo", 123);
    expect(result.createdAt).toBe("2026-02-10T12:00:00Z");
  });

  it("paginates when comments span multiple pages", async () => {
    const page1 = Array.from({ length: 100 }, () => OTHER_COMMENT);
    const page2 = [VOTE_COMMENT];
    const github = makeGithub([page1, page2, []]);

    const result = await fetchVoteClosedComment(github, "org", "repo", 123);
    expect(result).not.toBeNull();
    expect(github.request).toHaveBeenCalledTimes(2);
  });
});
