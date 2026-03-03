const path = require("path");
const { fetchClosedVoteIssues, fetchVoteClosedComment } = require("./github");
const { parseVoteClosedComment, parseLatestVotes } = require("./parser");
const { buildVoteDetails, findInactiveMembers } = require("./tracker");
const {
  loadYaml,
  writeVoteTrackingFile,
  writeMarkdownFile,
  setIsTscMemberFalse,
  addToEmeritus,
} = require("./files");
const { jsonToMarkdownTable } = require("./markdownTable");

const VOTE_TRACKING_FILE = path.join("voteTrackingFile.json");
const TSC_BOARD_MEMBERS_FILE = "TSC_BOARD_MEMBERS.yaml";
const MAINTAINERS_FILE = "MAINTAINERS.yaml";
const EMERITUS_FILE = "Emeritus.yaml";
const MARKDOWN_OUTPUT_FILE = "docs/020-governance-and-policies/TSC_VOTING_OVERVIEW.md";

/**
 * Full-refresh vote tracker.
 *
 * Fetches every issue/PR labelled "gitvote/closed", parses the "Vote closed"
 * comment on each one, then rebuilds the voteTrackingFile.json and
 * TSC_VOTING_OVERVIEW.md from scratch using only the current TSC members.
 *
 * Members inactive for the last 3 consecutive voting rounds are automatically
 * moved to emeritus: isTscMember is set to false in both MAINTAINERS.yaml and
 * TSC_BOARD_MEMBERS.yaml, and their github handle is appended to Emeritus.yaml.
 *
 * Called from the vote-tracker GitHub Actions workflow with:
 *   await script({ github, context });
 *
 * Called locally via run-local.js with:
 *   await script({ github, orgName, repoName });
 */
module.exports = async ({ github, context, orgName: orgOverride, repoName: repoOverride }) => {
  try {
    const orgName = orgOverride || context.repo.owner;
    const repoName = repoOverride || context.repo.repo;

    // 1. Load current TSC membership
    const tscBoardMembersInformation = await loadYaml(TSC_BOARD_MEMBERS_FILE);
    const tscMembers = tscBoardMembersInformation.filter((e) => e.isTscMember);
    console.log(`Found ${tscMembers.length} current TSC members`);

    // 2. Fetch all issues/PRs that had a completed vote
    const closedVoteIssues = await fetchClosedVoteIssues(github, orgName, repoName);
    console.log(`Found ${closedVoteIssues.length} issues/PRs with label gitvote/closed`);

    // 3. For each issue, find its "Vote closed" comment and parse the binding votes
    const votingRounds = [];
    for (const issue of closedVoteIssues) {
      const comment = await fetchVoteClosedComment(github, orgName, repoName, issue.number);
      if (!comment) {
        console.log(`No "Vote closed" comment found for issue #${issue.number} — skipping`);
        continue;
      }

      const votingRows = parseVoteClosedComment(comment.body);
      const votes = parseLatestVotes(votingRows);
      votingRounds.push({
        issueNumber: issue.number,
        issueTitle: issue.title,
        voteClosedAt: comment.createdAt.split("T")[0],
        votes,
      });
      console.log(`Parsed ${votes.length} votes for issue #${issue.number}: ${issue.title}`);
    }

    // Sort oldest-first so table columns appear in chronological order
    votingRounds.sort((a, b) => a.voteClosedAt.localeCompare(b.voteClosedAt));

    // Build a lookup map from voteKey ("Title$$N") → close date, needed by findInactiveMembers
    const voteDates = new Map(
      votingRounds.map((r) => [`${r.issueTitle}$$${r.issueNumber}`, r.voteClosedAt])
    );

    // 4. Build fresh vote details for current TSC members only
    let voteDetails = buildVoteDetails(tscMembers, votingRounds);

    // 5. Detect members inactive per the charter rule (no participation in any 3-month period)
    //    and move them to emeritus
    const inactiveMembers = findInactiveMembers(voteDetails, voteDates);
    if (inactiveMembers.length > 0) {
      const handles = inactiveMembers.map((m) => m.name);
      console.log(`Moving ${inactiveMembers.length} TSC member(s) to emeritus due to inactivity:`);
      for (const member of inactiveMembers) {
        console.log(`  → ${member.name}: ${member._inactivityReason}`);
      }

      // Set isTscMember: false in both source-of-truth and the generated file
      await setIsTscMemberFalse(MAINTAINERS_FILE, handles);
      await setIsTscMemberFalse(TSC_BOARD_MEMBERS_FILE, handles);
      await addToEmeritus(EMERITUS_FILE, handles);

      // Exclude them from the tracking table going forward
      const inactiveSet = new Set(handles.map((h) => h.toLowerCase()));
      voteDetails = voteDetails.filter((v) => !inactiveSet.has(v.name.toLowerCase()));
    }

    // 6. Sort rows alphabetically by member name before writing output
    voteDetails.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

    // 7. Write updated vote tracking file and markdown table
    await writeVoteTrackingFile(VOTE_TRACKING_FILE, voteDetails);

    const markdownTable = await jsonToMarkdownTable(voteDetails, orgName, repoName);
    await writeMarkdownFile(MARKDOWN_OUTPUT_FILE, markdownTable);
    console.log("Markdown table has been written to", MARKDOWN_OUTPUT_FILE);

    // 8. Print a final summary so the outcome is easy to spot at the end of the log
    console.log("\n========== VOTE TRACKER RUN SUMMARY ==========");
    if (inactiveMembers.length === 0) {
      console.log("No TSC members moved to emeritus this run.");
    } else {
      console.log(`${inactiveMembers.length} TSC member(s) moved to emeritus:`);
      for (const member of inactiveMembers) {
        console.log(`\n  Member : ${member.name}`);
        console.log(`  Reason : ${member._inactivityReason}`);
      }
    }
    console.log("===============================================\n");
  } catch (error) {
    console.error("Error while running the vote_tracker workflow:", error);
    throw error;
  }
};
