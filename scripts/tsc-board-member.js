const fs = require('fs-extra');
const path = require('path');
const { writeJSON } = require('./helpers/writeJSON');

const MAINTAINERS_YAML_PATH = 'MAINTAINERS.yaml';
const MAINTAINERS_JSON_PATH = 'MAINTAINERS.json';
const AMBASSADORS_PATH = 'AMBASSADORS_MEMBERS.json';
const OUTPUT_PATH = 'TSC_BOARD_MEMBERS.json';

/**
 * @typedef {Object} Member
 * @property {string} github
 * @property {boolean} [isTscMember]
 * @property {boolean} [isBoardMember]
 * @property {boolean} [isBoardChair]
 */

/**
 * Reads and parses a JSON file from the given path.
 * @param {string} filePath
 * @returns {Member[]}
 */
function loadJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Checks if a member has a relevant leadership or board-related flag.
 * @param {Member} member
 * @returns {boolean}
 */
function hasRelevantFlag(member) {
  return member.isTscMember || member.isBoardMember || member.isBoardChair || false;
}

/**
 * Merges and deduplicates two arrays of members using the GitHub username as a key.
 * @param {Member[]} membersA
 * @param {Member[]} membersB
 * @returns {Member[]}
 */
function mergeUniqueMembers(membersA, membersB) {
  const merged = {};

  [...membersA, ...membersB].forEach((member) => {
    const key = member.github;
    if (!key) return;

    if (merged[key]) {
      merged[key] = { ...merged[key], ...member };
    } else {
      merged[key] = member;
    }
  });

  return Object.values(merged).filter(hasRelevantFlag);
}

/**
 * Generates and writes the filtered list of TSC and Board members.
 */
async function generateTSCBoardMembersList() {
  try {
    // Step 1: Convert MAINTAINERS.yaml → MAINTAINERS.json
    await writeJSON(MAINTAINERS_YAML_PATH, MAINTAINERS_JSON_PATH);

    // Step 2: Load converted JSON + ambassadors list
    const maintainers = loadJson(MAINTAINERS_JSON_PATH);
    const ambassadors = loadJson(AMBASSADORS_PATH);

    // Step 3: Merge and filter members
    const filteredMembers = mergeUniqueMembers(maintainers, ambassadors);

    // Step 4: Write final list
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(filteredMembers, null, 2));

    console.info(`✅ Generated ${filteredMembers.length} filtered TSC/Board members`);
  } catch (err) {
    console.error('❌ Failed to generate TSC members list:', err);
  }
}

generateTSCBoardMembersList();

// export for test coverage
module.exports = {
  loadJson,
  hasRelevantFlag,
  mergeUniqueMembers,
  generateTSCBoardMembersList,
};
