/**
 * Replaces voting status values with corresponding emoji icons wrapped in a tooltip span.
 * This function is used to visually represent vote statuses (e.g., "In favor", "Against") in a Markdown table
 * with user-friendly emojis, enhancing readability. The tooltip preserves the original status text for clarity
 * when users hover over the emoji.
 *
 * @param {string} value - The vote status to render (e.g., "In favor", "Against", "Abstain", "Not participated").
 * @returns {string} - An HTML string containing the emoji icon wrapped in a `<span>` element with a tooltip
 *                     displaying the original status. If no matching emoji is found, the original value is returned
 *                     wrapped in a tooltip span.
 * @example
 * renderVoteIcon("In favor") // Returns '<span style="position: relative; cursor: pointer;" title="In favor">👍</span>'
 */
function renderVoteIcon(value) {
  const icons = {
    "In favor": "👍",
    Against: "👎",
    Abstain: "👀",
    "Not participated": "🔕",
  };
  return icons[value] || value;
}

/**
 * Generates a Markdown table header cell, optionally with a tooltip or a GitHub issue link.
 * This function formats column headers in a Markdown table, enhancing them with tooltips for better context
 * or converting headers with issue references (e.g., "Title$$123") into clickable GitHub issue links.
 * It supports user-friendly table rendering in documentation.
 *
 * @param {string} key - The column header key to display (e.g., "name", "Proposal$$123").
 * @param {Object} titles - A mapping of header keys to human-readable descriptions for tooltips.
 * @param {string} orgName - The GitHub organization name (e.g., "my-org") for constructing issue links.
 * @param {string} repoName - The GitHub repository name (e.g., "my-repo") for constructing issue links.
 * @returns {string} - A Markdown or HTML string representing the header cell. If the key includes "$$",
 *                     it returns a Markdown link to a GitHub issue. Otherwise, it returns a `<span>` with
 *                     a tooltip containing the key's description or the key itself.
 * @example
 * renderHeaderCell("Proposal$$123", { "Proposal": "Proposal Description" }, "org", "repo")
 * // Returns '[Proposal](https://github.com/org/repo/issues/123)'
 * renderHeaderCell("name", { "name": "GitHub user name" }, "org", "repo")
 * // Returns '<span style="position: relative; cursor: pointer;" title="GitHub user name">name</span>'
 */
function renderHeaderCell(key, titles, orgName, repoName) {
  if (key.includes("$$")) {
    const [title, issueNumber] = key.split("$$");
    return `[${title}](https://github.com/${orgName}/${repoName}/issues/${issueNumber})`;
  }

  return key;
}

/**
 * Generates the Markdown header row and separator row for a table.
 * This function creates the top two rows of a Markdown table: the header row with column names
 * (optionally formatted with tooltips or GitHub issue links) and the separator row with dashes
 * to define the table structure. It ensures proper Markdown table syntax for rendering in documentation.
 *
 * @param {string[]} keys - An array of column header keys to include in the table.
 * @param {Object} titles - A mapping of header keys to human-readable descriptions for tooltips.
 * @param {string} orgName - The GitHub organization name for constructing issue links in headers.
 * @param {string} repoName - The GitHub repository name for constructing issue links in headers.
 * @returns {string} - A string containing the Markdown header row and separator row, separated by a newline.
 * @example
 * generateMarkdownHeader(["name", "Proposal$$123"], { name: "GitHub user name" }, "org", "repo")
 * // Returns:
 * // "| <span style=\"position: relative; cursor: pointer;\" title=\"GitHub user name\">name</span> | [Proposal](https://github.com/org/repo/issues/123) |\n| --- | --- |"
 */
function generateMarkdownHeader(keys, titles, orgName, repoName) {
  const headerRow = "| " + keys.map(key => renderHeaderCell(key, titles, orgName, repoName)).join(" | ") + " |";
  const separatorRow = "| " + keys.map(() => "---").join(" | ") + " |";
  return `${headerRow}\n${separatorRow}`;
}

/**
 * Generates all Markdown table rows for the given data.
 * This function converts an array of data objects into Markdown table rows, formatting specific columns
 * (e.g., "name" as a GitHub profile link, vote status keys as emoji icons) to create a user-friendly table body.
 * Each row is formatted according to Markdown table syntax.
 *
 * @param {Object[]} data - An array of objects, where each object represents a table row with key-value pairs.
 * @param {string[]} keys - An array of keys defining the columns to render for each row.
 * @returns {string} - A string containing all Markdown table rows, separated by newlines.
 * @example
 * generateMarkdownRows([{ name: "user1", "Proposal$$123": "In favor" }], ["name", "Proposal$$123"])
 * // Returns:
 * // "| [user1](https://github.com/user1) | <span style=\"position: relative; cursor: pointer;\" title=\"In favor\">👍</span> |"
 */
function generateMarkdownRows(data, keys) {
  if (!data || data.length === 0) {
    console.error("No data provided to generateMarkdownRows.");
    return "";
  } else {
    console.log(
      "Markdown table rows generation with the following data as input:",
      JSON.stringify(data, null, 2)
    );
  }
  return data.map(row => {
    const rowStr = keys.map(key => {
      if (key === "name") {
        return `[${row[key]}](https://github.com/${row[key]})`;
      }
      if (key.includes("$$")) {
        return renderVoteIcon(row[key]);
      }
      return row[key];
    }).join(" | ");
    return `| ${rowStr} |`;
  }).join("\n");
}

/**
 * Normalizes each object in the dataset to ensure all keys are present.
 * This function ensures that every row in the dataset has all expected columns by filling missing
 * values with "N/A". This prevents errors during table generation and ensures consistent column alignment
 * in the resulting Markdown table.
 *
 * @param {Object[]} data - An array of raw data objects, where each object represents a table row.
 * @param {string[]} keys - An array of expected keys (columns) for the table.
 * @returns {Object[]} - An array of normalized data objects, where each object contains all specified keys,
 *                       with missing values set to "N/A".
 * @example
 * normalizeTableData([{ name: "user1" }], ["name", "vote"])
 * // Returns [{ name: "user1", vote: "N/A" }]
 */
function normalizeTableData(data, keys) {
  return data.map((item) => {
    const normalized = {};
    keys.forEach((key) => {
      normalized[key] = item[key] !== undefined ? item[key] : "N/A";
    });
    return normalized;
  });
}

/**
 * Converts an array of voting records into a Markdown-formatted table.
 * This function orchestrates the creation of a complete Markdown table from voting data, typically used
 * to document Technical Steering Committee (TSC) voting records in a GitHub repository. It processes the data
 * to generate a table with formatted headers (with tooltips or GitHub issue links), vote statuses as emojis,
 * and user names as GitHub profile links. The table is prefixed with a comment indicating it is script-generated.
 *
 * @param {Object[]} data - An array of voting records, where each object represents a row with keys like
 *                          "name", "lastParticipatedVoteTime", and vote statuses for specific proposals.
 * @param {string} orgName - The GitHub organization name (e.g., "my-org") for constructing links.
 * @param {string} repoName - The GitHub repository name (e.g., "my-repo") for constructing links.
 * @returns {Promise<string>} - A Promise resolving to the complete Markdown table as a string, including
 *                              a header comment, table headers, and table rows. Returns an empty string if
 *                              the input data is empty or undefined.
 * @example
 * jsonToMarkdownTable(
 *   [{ name: "user1", "Proposal$$123": "In favor" }],
 *   "org",
 *   "repo"
 * )
 * // Returns a Promise resolving to:
 * // <!-- This file is generated by a script. Do not manually update it unless there is a visible mistake and point to the script that is responsible for updating the document. -->
 * // | <span style="position: relative; cursor: pointer;" title="GitHub user name">name</span> | [Proposal](https://github.com/org/repo/issues/123) |
 * // | --- | --- |
 * // | [user1](https://github.com/user1) | <span style="position: relative; cursor: pointer;" title="In favor">👍</span> |
 */
async function jsonToMarkdownTable(data, orgName, repoName) {
  if (!data || data.length === 0) {
    console.error("Data is empty or undefined");
    return "";
  }
  else {
    console.log(
      "Working on markdown generation with the following data as input:",
      JSON.stringify(data, null, 2)
    )
  }

  const titles = {
    name: "GitHub user name",
    lastParticipatedVoteTime: "Last time the TSC member participated in a vote",
    hasVotedInLast3Months: "Flag indicating if TSC member voted in last 3 months",
    lastVoteClosedTime: "Date when last vote was closed",
    agreeCount: "Number of times TSC member agreed in a vote",
    disagreeCount: "Number of times TSC member did not agree in a vote",
    abstainCount: "Number of times TSC member abstained from voting",
    notParticipatingCount: "Number of times TSC member did not participate in voting",
  };

  // We extract all keys from the first row of data to determine the columns for the table.
  // However, we explicitly **exclude "firstVoteClosedTime"** because:
  // * It is likely a metadata field (e.g., the date when the first vote was closed) that is irrelevant for the table’s purpose of documenting TSC voting records.
  // * Including it would clutter the table with information that does not contribute to the reader’s understanding of voting outcomes or participation.
  // * Filtering it ensures that `normalizeTableData` only processes relevant keys, maintaining a consistent table structure and avoiding unnecessary columns.

  const keys = Object.keys(data[0]).filter(k => k !== "firstVoteClosedTime");
  const normalizedData = normalizeTableData(data, keys);

  let markdown = `---
title: TSC Voting Overview
weight: 40
---

<!-- This file is generated by a script. Do not manually update it unless there is a visible mistake and point to the script that is responsible for updating the document. -->\n`;

  markdown += generateMarkdownHeader(keys, titles, orgName, repoName) + "\n";
  markdown += generateMarkdownRows(normalizedData, keys);

  return markdown;
}

module.exports = {
  jsonToMarkdownTable,
  renderVoteIcon,
  renderHeaderCell,
  generateMarkdownHeader,
  generateMarkdownRows,
};
