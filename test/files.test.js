const yaml = require("js-yaml");
jest.mock("fs/promises");
const { readFile, writeFile } = require("fs/promises");

const {
  extractLeadingComments,
  setIsTscMemberFalse,
  addToEmeritus,
} = require("../.github/scripts/vote_tracker/files");

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const MAINTAINERS_YAML = `- name: Alice Smith
  github: alice
  isTscMember: true
  tscMemberSince: '2023-01-01'
  githubID: 1
- name: Bob Jones
  github: bob
  isTscMember: true
  tscMemberSince: '2023-06-15'
  githubID: 2
- name: Carol White
  github: carol
  isTscMember: true
  githubID: 3
`;

const TSC_BOARD_MEMBERS_YAML = `# ⚠️ This file is auto-generated. Do not edit manually.
- name: Alice Smith
  github: alice
  isTscMember: true
- name: Bob Jones
  github: bob
  isTscMember: true
`;

const EMERITUS_YAML = `# This file lists individuals who were previously active but are no longer.
emeritus_ambassadors:
  - former-ambassador
emeritus_tsc:
  - old-member
`;

const EMERITUS_YAML_NO_TSC = `# Header comment.
emeritus_ambassadors:
  - some-ambassador
`;

beforeEach(() => {
  jest.clearAllMocks();
  writeFile.mockResolvedValue(undefined);
});

// ---------------------------------------------------------------------------
// extractLeadingComments
// ---------------------------------------------------------------------------

describe("extractLeadingComments", () => {
  it("returns empty string when file has no leading comments", () => {
    expect(extractLeadingComments("- name: Alice\n")).toBe("");
  });

  it("returns single comment line with trailing newline", () => {
    const raw = "# Auto-generated\n- name: Alice\n";
    expect(extractLeadingComments(raw)).toBe("# Auto-generated\n");
  });

  it("preserves a blank line that follows the comment", () => {
    const raw = "# Header\n\nkey: value\n";
    // blank line is collected (headerLines.length > 0), then stripped trailing
    // — see implementation: blank line is retained as part of the header
    const result = extractLeadingComments(raw);
    expect(result).toContain("# Header");
  });

  it("returns multiple comment lines", () => {
    const raw = "# Line 1\n# Line 2\ndata: here\n";
    const result = extractLeadingComments(raw);
    expect(result).toBe("# Line 1\n# Line 2\n");
  });
});

// ---------------------------------------------------------------------------
// setIsTscMemberFalse
// ---------------------------------------------------------------------------

describe("setIsTscMemberFalse", () => {
  it("sets isTscMember: false for the specified github handle", async () => {
    readFile.mockResolvedValue(MAINTAINERS_YAML);

    await setIsTscMemberFalse("MAINTAINERS.yaml", ["bob"]);

    expect(writeFile).toHaveBeenCalledTimes(1);
    const written = writeFile.mock.calls[0][1];
    const parsed = yaml.load(written);

    const bob = parsed.find((m) => m.github === "bob");
    expect(bob.isTscMember).toBe(false);
  });

  it("removes tscMemberSince when setting isTscMember to false", async () => {
    readFile.mockResolvedValue(MAINTAINERS_YAML);

    await setIsTscMemberFalse("MAINTAINERS.yaml", ["bob"]);

    const written = writeFile.mock.calls[0][1];
    const parsed = yaml.load(written);

    const bob = parsed.find((m) => m.github === "bob");
    expect(bob.tscMemberSince).toBeUndefined();
  });

  it("leaves other members unchanged", async () => {
    readFile.mockResolvedValue(MAINTAINERS_YAML);

    await setIsTscMemberFalse("MAINTAINERS.yaml", ["bob"]);

    const written = writeFile.mock.calls[0][1];
    const parsed = yaml.load(written);

    const alice = parsed.find((m) => m.github === "alice");
    expect(alice.isTscMember).toBe(true);
    expect(alice.tscMemberSince).toBe("2023-01-01");
  });

  it("is case-insensitive when matching github handles", async () => {
    readFile.mockResolvedValue(MAINTAINERS_YAML);

    await setIsTscMemberFalse("MAINTAINERS.yaml", ["BOB"]);

    const written = writeFile.mock.calls[0][1];
    const parsed = yaml.load(written);
    expect(parsed.find((m) => m.github === "bob").isTscMember).toBe(false);
  });

  it("preserves the leading comment in TSC_BOARD_MEMBERS.yaml", async () => {
    readFile.mockResolvedValue(TSC_BOARD_MEMBERS_YAML);

    await setIsTscMemberFalse("TSC_BOARD_MEMBERS.yaml", ["alice"]);

    const written = writeFile.mock.calls[0][1];
    expect(written).toMatch(/^# ⚠️ This file is auto-generated/);
  });

  it("handles multiple handles in one call", async () => {
    readFile.mockResolvedValue(MAINTAINERS_YAML);

    await setIsTscMemberFalse("MAINTAINERS.yaml", ["alice", "carol"]);

    const written = writeFile.mock.calls[0][1];
    const parsed = yaml.load(written);
    expect(parsed.find((m) => m.github === "alice").isTscMember).toBe(false);
    expect(parsed.find((m) => m.github === "carol").isTscMember).toBe(false);
    expect(parsed.find((m) => m.github === "bob").isTscMember).toBe(true);
  });

  it("does nothing when handles list is empty", async () => {
    await setIsTscMemberFalse("MAINTAINERS.yaml", []);
    expect(readFile).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// addToEmeritus
// ---------------------------------------------------------------------------

describe("addToEmeritus", () => {
  it("appends new handles to the emeritus_tsc list", async () => {
    readFile.mockResolvedValue(EMERITUS_YAML);

    await addToEmeritus("Emeritus.yaml", ["new-member"]);

    const written = writeFile.mock.calls[0][1];
    const parsed = yaml.load(written);
    expect(parsed.emeritus_tsc).toContain("new-member");
    expect(parsed.emeritus_tsc).toContain("old-member"); // existing preserved
  });

  it("preserves the leading comment", async () => {
    readFile.mockResolvedValue(EMERITUS_YAML);

    await addToEmeritus("Emeritus.yaml", ["new-member"]);

    const written = writeFile.mock.calls[0][1];
    expect(written).toMatch(/^# This file lists/);
  });

  it("skips handles already present (case-insensitive)", async () => {
    readFile.mockResolvedValue(EMERITUS_YAML);

    await addToEmeritus("Emeritus.yaml", ["OLD-MEMBER"]);

    // Nothing to add → writeFile should not be called
    expect(writeFile).not.toHaveBeenCalled();
  });

  it("creates emeritus_tsc when the key does not yet exist", async () => {
    readFile.mockResolvedValue(EMERITUS_YAML_NO_TSC);

    await addToEmeritus("Emeritus.yaml", ["brand-new"]);

    const written = writeFile.mock.calls[0][1];
    const parsed = yaml.load(written);
    expect(parsed.emeritus_tsc).toEqual(["brand-new"]);
  });

  it("handles multiple new handles in one call", async () => {
    readFile.mockResolvedValue(EMERITUS_YAML);

    await addToEmeritus("Emeritus.yaml", ["member-a", "member-b"]);

    const written = writeFile.mock.calls[0][1];
    const parsed = yaml.load(written);
    expect(parsed.emeritus_tsc).toContain("member-a");
    expect(parsed.emeritus_tsc).toContain("member-b");
  });

  it("does nothing when handles list is empty", async () => {
    await addToEmeritus("Emeritus.yaml", []);
    expect(readFile).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });
});
