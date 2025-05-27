const path = require('path');
const yaml = require('js-yaml');
const { readFile, writeFile } = require('fs/promises');

/**
 * @typedef {Object} Member
 * @property {string} github
 * @property {boolean} [isTscMember]
 * @property {boolean} [isBoardMember]
 * @property {boolean} [isBoardChair]
 */

const MAINTAINERS_YAML_PATH = path.resolve(__dirname, '..', 'MAINTAINERS.yaml');
const AMBASSADORS_JSON_PATH = path.resolve(__dirname, '..', 'AMBASSADORS_MEMBERS.json');
const OUTPUT_YAML_PATH = path.resolve(__dirname, '..', 'TSC_BOARD_MEMBERS.yaml');

/**
 * Reads and parses a JSON file from the given path.
 * @param {string} filePath
 * @returns {Promise<Member[]>}
 */
async function loadJson(filePath) {
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Reads and parses a YAML file from the given path.
 * @param {string} filePath
 * @returns {Promise<Member[]>}
 */
async function loadYaml(filePath) {
  const raw = await readFile(filePath, 'utf-8');
  return yaml.load(raw);
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

    merged[key] = merged[key] ? { ...merged[key], ...member } : member;
  });

  return Object.values(merged).filter(hasRelevantFlag);
}

/**
 * Generates a YAML file of TSC and Board members.
 */
async function generateTSCBoardMembersList() {
  try {
    // Step 1: Load converted JSON + ambassadors list
    const maintainers = await loadYaml(MAINTAINERS_YAML_PATH);
    const ambassadors = await loadJson(AMBASSADORS_JSON_PATH);

    // Step 2: Merge and filter members
    const filteredMembers = mergeUniqueMembers(maintainers, ambassadors);

    // Step 3: Write final list
    const yamlData = yaml.dump(filteredMembers);
    await writeFile(OUTPUT_YAML_PATH, yamlData, 'utf-8');

    console.info(`✅ Generated ${filteredMembers.length} filtered TSC/Board members`);
  } catch (err) {
    throw new Error(`❌ Failed to generate TSC members list: ${err}`);
  }
}

// Only execute the function when the script is run directly (not when imported)
if (require.main === module) {
  generateTSCBoardMembersList();
}

// Export for test coverage
module.exports = {
  loadJson,
  loadYaml,
  hasRelevantFlag,
  mergeUniqueMembers,
  generateTSCBoardMembersList,
};
