const path = require("path");
const { fetchCommentInformation } = require("./github");
const { parseVoteClosedComment, parseLatestVotes } = require("./parser");
const { findValidTemplateMember, findNewMembers, processVoteDetails } = require("./tracker");
const { loadYaml, readVoteTrackingFile, writeVoteTrackingFile, writeMarkdownFile } = require("./files");
const { jsonToMarkdownTable } = require("./markdownTable");

const VOTE_TRACKING_FILE = path.join("voteTrackingFile.json");
const TSC_BOARD_MEMBERS_FILE = "TSC_BOARD_MEMBERS.yaml";
const MARKDOWN_OUTPUT_FILE = "docs/020-governance-and-policies/TSC_VOTING_OVERVIEW.md";

module.exports = async ({ github, context, botCommentURL }) => {
  try {
    let message, eventNumber, eventTitle, orgName, repoName;

    if (botCommentURL) {
      const ctx = await fetchCommentInformation(github, botCommentURL);
      message = ctx.messageBody;
      eventNumber = ctx.eventNumber;
      eventTitle = ctx.eventTitle;
      orgName = ctx.orgName;
      repoName = ctx.repoName;
    } else {
      message = context.payload.comment.body;
      eventNumber = context.issue.number;
      eventTitle = context.payload.issue.title;
      orgName = context.repo.owner;
      repoName = context.repo.repo;
    }

    // Parse votes from the bot comment
    const votingRows = parseVoteClosedComment(message);
    const latestVotes = parseLatestVotes(votingRows);
    console.log("content of latestVotes:", JSON.stringify(latestVotes, null, 2));

    // Load TSC membership list and existing vote records
    const tscBoardMembersInformation = await loadYaml(TSC_BOARD_MEMBERS_FILE);
    const tscMembers = tscBoardMembersInformation.filter((e) => e.isTscMember);
    let voteDetails = await readVoteTrackingFile(VOTE_TRACKING_FILE);
    console.log("content of voteDetails:", JSON.stringify(voteDetails, null, 2));

    // Add tracking records for any TSC members not yet in the file
    const templateMember = findValidTemplateMember(voteDetails);
    if (templateMember) {
      const newMembers = findNewMembers(voteDetails, tscMembers, templateMember);
      if (newMembers.length > 0) {
        voteDetails = [...voteDetails, ...newMembers];
        await writeVoteTrackingFile(VOTE_TRACKING_FILE, voteDetails);
      }
    } else {
      console.log("No valid template member found in voteDetails.");
    }

    // Apply the latest votes to all member records
    const updatedVoteDetails = processVoteDetails(voteDetails, latestVotes, eventTitle, eventNumber);
    await writeVoteTrackingFile(VOTE_TRACKING_FILE, updatedVoteDetails);

    // Generate and write the markdown overview table
    const markdownTable = await jsonToMarkdownTable(updatedVoteDetails, orgName, repoName);
    await writeMarkdownFile(MARKDOWN_OUTPUT_FILE, markdownTable);
    console.log("Markdown table has been written to", MARKDOWN_OUTPUT_FILE);
  } catch (error) {
    console.error("Error while running the vote_tracker workflow:", error);
  }
};
