const yaml = require("js-yaml");
const { readFile, writeFile } = require("fs").promises;

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

module.exports = { loadYaml, readVoteTrackingFile, writeVoteTrackingFile, writeMarkdownFile };
