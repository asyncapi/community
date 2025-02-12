module.exports = { filterIssues, getTSCLeftToVote, sendSlackNotification };

const axios = require('axios');

/**
 * 
 * @param {Array} issues  list of issues having `vote open` label
 * @param {Object} state  has the last notified date for each issue
 * @param {Object} config configuration object (e.g. days)
 * @returns {Object} state and issuesToNotify
 */
function filterIssues(issues, state, config) {
  // Add new issues and close the issues which are already closed and present in the state
  const newIssues = issues.filter(issue => !state[issue.number]);
  const closedIssues = Object.keys(state).filter(issue => !issues.find(i => i.number === parseInt(issue)));

  // Can be extended later to include more configuration, e.g. deadline for voting
  const { days } = config;

  console.debug("Config: ", config);

  // Make last_notified null for new issues to notify the TSC members
  for (const issue of newIssues) {
    state[issue.number] = {
      status: 'open',
      last_notified: null, 
    }
  }

  for (const issue of closedIssues) {
    state[issue] = {
      ...state[issue],
      status: 'closed',
    }
  }

  const issuesToNotify = issues.filter(issue => 
    state[issue.number].status === 'open' && 
    (!state[issue.number].last_notified ||
    new Date(state[issue.number].last_notified).getTime() + days * 24 * 60 * 60 * 1000 < new Date().getTime()) // Notify every {days} days
  );

  return {
    state,
    issuesToNotify
  };
}

/**
 * 
 * @param {Object} issue  Issue object
 * @param {Array} tscMembers  List of TSC members
 * @param {Object} github  GitHub object
 * @param {Object} context  GitHub context object
 * @returns 
 */
async function getTSCLeftToVote(issue, tscMembers, github, context) {
  try {
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issue.number,
    });

    // Finds the comment created by the bot where everybody reacts
    const voteOpeningComment = comments.findLast(comment => comment.body.includes('Vote created') && comment.user.login === 'git-vote[bot]');

    if (!voteOpeningComment) {
      console.log(`Vote Opening Comment not found for issue #${issue.number}`);
      return;
    }

    const { data: reactions } = await github.rest.reactions.listForIssueComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: voteOpeningComment.id,
    });

    // Only 👍,👎, and 👀 are valid votes
    const validEmojis = ['+1', '-1', 'eyes'];
    const validReactions = reactions.filter(reaction => validEmojis.includes(reaction.content));

    // Filter out the TSC members who have not voted yet and who have a Slack account (in the MAINTAINERS.yaml file)
    const leftToVote = tscMembers.filter(member => member.slack && !validReactions.find(reaction => reaction.user.login === member.github));
    return {
      leftToVote,

      // Currently we have 4 weeks deadline for voting from creation of voting comment (28 days)
      daysBeforeDeadline: 28 - Math.ceil((new Date().getTime() - new Date(voteOpeningComment.created_at).getTime()) / (1000 * 60 * 60 * 24)),
    }
  } catch (error) {
    console.log(`Error fetching comments and reactions for issue #${issue.number}: ${error}`);
    return [];
  }
}

/**
 * 
 * @param {Object} member  TSC member object
 * @param {Object} issue  Issue object
 * @param {String} slackToken  Slack token
 * 
 * @returns {Boolean} true if Slack notification sent successfully, false otherwise
 */
async function sendSlackNotification(member, issue, daysBeforeDeadline, slackToken) {
  const message = `👋 Hi ${member.name},\nWe need your vote on the following topic: *${issue.title}*.\n*Issue Details*: ${issue.html_url}\n*Days left before voting closes: ${daysBeforeDeadline}*\nYour input is crucial to our decision-making process. Please take a moment to review the voting topic and share your thoughts.\nThank you for your contribution! 🙏`;

  // Sending Slack DM via API
  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: member.slack,
      text: message,
    }, {
      headers: {
        'Authorization': `Bearer ${slackToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.ok) {
      console.error(`Error sending Slack DM to ${member.name}: ${response.data.error}`);
      return false;
    } else {
      console.log(`Slack DM sent to ${member.name}`);
      return true;
    }
  } catch (error) {
    console.error(`Error sending Slack DM to ${member.name}: ${error.message}`);

    return false;
  }
}