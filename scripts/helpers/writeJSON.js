const { readFile, writeFile } = require('fs/promises');
const yaml = require('js-yaml');

/**
 * Reads a YAML file, converts it to JSON, and writes the result to another file.
 *
 * @param {string} readPath - Path to the input YAML file.
 * @param {string} writePath - Path where the JSON output should be written.
 * @returns {Promise<void>}
 */
async function writeJSON(readPath, writePath) {
  let readContent;
  let jsonContent;

  // Read the YAML file
  try {
    readContent = await readFile(readPath, 'utf-8');
  } catch (err) {
    return Promise.reject(new Error(`Failed to read file: ${err}`));
  }

  // Convert YAML to JSON
  try {
    jsonContent = yaml.load(readContent);
  } catch (err) {
    return Promise.reject(new Error(`Failed to parse YAML: ${err}`));
  }

  // Write JSON to output file
  try {
    await writeFile(writePath, JSON.stringify(jsonContent, null, 2));
  } catch (err) {
    return Promise.reject(new Error(`Failed to write JSON: ${err}`));
  }

  return Promise.resolve();
}

module.exports = { writeJSON };
