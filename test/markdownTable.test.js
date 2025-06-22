const {
  jsonToMarkdownTable,
  renderVoteIcon,
  renderHeaderCell,
  generateMarkdownHeader,
  generateMarkdownRows,
} = require('../.github/scripts/vote_tracker/markdownTable.js');

describe('renderVoteIcon', () => {
  it('returns correct emoji for known values', () => {
    expect(renderVoteIcon("In favor")).toContain("👍");
    expect(renderVoteIcon("Against")).toContain("👎");
    expect(renderVoteIcon("Abstain")).toContain("👀");
    expect(renderVoteIcon("Not participated")).toContain("🔕");
  });

  it('returns raw value if not in icon map', () => {
    expect(renderVoteIcon("Unknown")).toContain("Unknown");
  });
});

describe('renderHeaderCell', () => {
  const titles = {
    name: "GitHub user name",
    votes: "Total votes",
  };

  it('returns GitHub issue link if key includes $$', () => {
    const result = renderHeaderCell("Voting$$123", titles, "org", "repo");
    expect(result).toContain("https://github.com/org/repo/issues/123");
    expect(result).toContain("[Voting]");
  });

  it('returns span with tooltip for normal keys', () => {
    const result = renderHeaderCell("name", titles, "org", "repo");
    expect(result).toContain("title=\"GitHub user name\"");
    expect(result).toContain("<span");
  });
});

describe('generateMarkdownHeader', () => {
  it('returns proper markdown header with tooltips or links', () => {
    const keys = ["name", "Voting$$123"];
    const titles = { name: "GitHub username" };
    const result = generateMarkdownHeader(keys, titles, "org", "repo");

    expect(result).toContain("| [Voting]");
    expect(result).toContain("[Voting](https://github.com/org/repo/issues/123)");
    expect(result).toContain("---");
  });
});

describe('generateMarkdownRows', () => {
  const keys = ["name", "vote$$456"];
  const data = [
    { name: "octocat", "vote$$456": "In favor" },
    { name: "monalisa", "vote$$456": "Abstain" },
  ];

  it('renders GitHub links and vote icons', () => {
    const result = generateMarkdownRows(data, keys);
    expect(result).toContain("[octocat](https://github.com/octocat)");
    expect(result).toContain("👀"); // Abstain icon
    expect(result).toContain("👍"); // In favor icon
  });
});

describe('jsonToMarkdownTable', () => {
  const data = [
    {
      name: "octocat",
      lastParticipatedVoteTime: "2024-12-01",
      hasVotedInLast3Months: true,
      agreeCount: 3,
      disagreeCount: 0,
      abstainCount: 1,
      notParticipatingCount: 0,
    }
  ];

  it('generates full markdown table string', async () => {
    const result = await jsonToMarkdownTable(data, "org", "repo");
    expect(result).toContain('<span style="position: relative; cursor: pointer;" title="GitHub user name">name</span>');
    expect(result).toContain("[octocat](https://github.com/octocat)");
    expect(result).toContain("agreeCount");
  });

  it('returns empty string for empty input', async () => {
    const result = await jsonToMarkdownTable([], "org", "repo");
    expect(result).toBe("");
  });
});
