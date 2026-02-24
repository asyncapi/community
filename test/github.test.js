const { fetchCommentInformation } = require("../.github/scripts/vote_tracker/github");

const BOT_COMMENT_URL =
  "https://github.com/asyncapi/community/issues/2221#issuecomment-2585230063";

// Minimal github mock that matches the shape used by actions/github-script
function makeMockGithub({ commentBody = "Vote closed body", issueTitle = "Budget 2026" } = {}) {
  return {
    request: jest.fn().mockResolvedValue({ data: { body: commentBody } }),
    rest: {
      issues: {
        get: jest.fn().mockResolvedValue({ data: { title: issueTitle } }),
      },
    },
  };
}

describe("fetchCommentInformation", () => {
  it("parses owner, repo, eventNumber and commentId from the URL", async () => {
    const github = makeMockGithub();
    const result = await fetchCommentInformation(github, BOT_COMMENT_URL);

    expect(result.orgName).toBe("asyncapi");
    expect(result.repoName).toBe("community");
    expect(result.eventNumber).toBe("2221");
    expect(result.commentId).toBe("2585230063");
  });

  it("calls the comments endpoint with correct parameters", async () => {
    const github = makeMockGithub();
    await fetchCommentInformation(github, BOT_COMMENT_URL);

    expect(github.request).toHaveBeenCalledWith(
      "GET /repos/{owner}/{repo}/issues/comments/{comment_id}",
      { owner: "asyncapi", repo: "community", comment_id: "2585230063" }
    );
  });

  it("calls the issues endpoint with the correct issue number", async () => {
    const github = makeMockGithub();
    await fetchCommentInformation(github, BOT_COMMENT_URL);

    expect(github.rest.issues.get).toHaveBeenCalledWith({
      owner: "asyncapi",
      repo: "community",
      issue_number: "2221",
    });
  });

  it("returns the comment body as messageBody", async () => {
    const github = makeMockGithub({ commentBody: "Vote closed\n| @user | In favor |..." });
    const result = await fetchCommentInformation(github, BOT_COMMENT_URL);
    expect(result.messageBody).toBe("Vote closed\n| @user | In favor |...");
  });

  it("returns the issue title as eventTitle", async () => {
    const github = makeMockGithub({ issueTitle: "My Proposal Title" });
    const result = await fetchCommentInformation(github, BOT_COMMENT_URL);
    expect(result.eventTitle).toBe("My Proposal Title");
  });

  it("propagates errors from the GitHub API", async () => {
    const github = {
      request: jest.fn().mockRejectedValue(new Error("API error")),
      rest: { issues: { get: jest.fn() } },
    };
    await expect(fetchCommentInformation(github, BOT_COMMENT_URL)).rejects.toThrow("API error");
  });
});
