const yaml = require("js-yaml");
const { readFile, writeFile } = require("fs/promises");

/**
 * Reads and parses a YAML file.
 * @param {string} filePath
 * @returns {Promise<any>}
 */
async function loadYaml(filePath) {
  try {
    const content = await readFile(filePath, "utf8");
    return yaml.load(content);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    throw err;
  }
}

/**
 * Reads and parses the JSON vote tracking file.
 * @param {string} filePath
 * @returns {Promise<Object[]>}
 */
async function readVoteTrackingFile(filePath) {
  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    throw err;
  }
}

/**
 * Serialises and writes vote tracking data to a JSON file.
 * @param {string} filePath
 * @param {Object[]} data
 * @returns {Promise<void>}
 */
async function writeVoteTrackingFile(filePath, data) {
  try {
    await writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
    throw err;
  }
}

/**
 * Writes a markdown string to a file.
 * @param {string} filePath
 * @param {string} content
 * @returns {Promise<void>}
 */
async function writeMarkdownFile(filePath, content) {
  try {
    await writeFile(filePath, content);
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
    throw err;
  }
}

/**
 * Extracts leading comment lines (and any immediately following blank lines)
 * from a raw YAML string so they can be prepended after re-serialisation.
 *
 * @param {string} raw - Full file content
 * @returns {string} Comment prefix, with trailing newline when non-empty
 */
function extractLeadingComments(raw) {
  const lines = raw.split("\n");
  const headerLines = [];
  for (const line of lines) {
    // Collect comment lines; also collect blank lines once comments have started
    if (line.startsWith("#") || (headerLines.length > 0 && line.trim() === "")) {
      headerLines.push(line);
    } else {
      break;
    }
  }
  return headerLines.length > 0 ? headerLines.join("\n") + "\n" : "";
}

/**
 * Sets isTscMember: false for the given github handles in a YAML list file.
 * Works for both MAINTAINERS.yaml and TSC_BOARD_MEMBERS.yaml.
 * Preserves any leading file comments (e.g. auto-generated warnings).
 *
 * @param {string} filePath
 * @param {string[]} githubHandles - Case-insensitive
 * @returns {Promise<void>}
 */
async function setIsTscMemberFalse(filePath, githubHandles) {
  if (!githubHandles || githubHandles.length === 0) return;

  const raw = await readFile(filePath, "utf8");
  const header = extractLeadingComments(raw);
  const members = yaml.load(raw);
  const lowerHandles = new Set(githubHandles.map((h) => h.toLowerCase()));

  const updated = members.map((member) => {
    if (member.github && lowerHandles.has(member.github.toLowerCase())) {
      const { tscMemberSince, ...rest } = member;
      return { ...rest, isTscMember: false };
    }
    return member;
  });

  await writeFile(filePath, header + yaml.dump(updated, { lineWidth: -1 }));
}

/**
 * Adds github handles to the emeritus_tsc list in Emeritus.yaml.
 * Handles that already appear in the list (case-insensitive) are skipped.
 * Preserves any leading file comments.
 *
 * @param {string} filePath
 * @param {string[]} githubHandles
 * @returns {Promise<void>}
 */
async function addToEmeritus(filePath, githubHandles) {
  if (!githubHandles || githubHandles.length === 0) return;

  const raw = await readFile(filePath, "utf8");
  const header = extractLeadingComments(raw);
  const emeritus = yaml.load(raw);

  const existingSet = new Set(
    (emeritus.emeritus_tsc || []).map((h) => h.toLowerCase())
  );
  const toAdd = githubHandles.filter((h) => !existingSet.has(h.toLowerCase()));
  if (toAdd.length === 0) return;

  emeritus.emeritus_tsc = [...(emeritus.emeritus_tsc || []), ...toAdd];
  await writeFile(filePath, header + yaml.dump(emeritus, { lineWidth: -1 }));
}

module.exports = {
  loadYaml,
  readVoteTrackingFile,
  writeVoteTrackingFile,
  writeMarkdownFile,
  extractLeadingComments,
  setIsTscMemberFalse,
  addToEmeritus,
};
