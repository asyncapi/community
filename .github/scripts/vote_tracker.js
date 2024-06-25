const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

module.exports = async ({ github, context, core }) => {

  const message = context.payload.comment.body;
  const eventNumber = context.issue.number;
  const eventTitle = context.payload.issue.title
  const orgName = context.issue.number.owner
  const repoName = context.issue.number.repo

  const filePath = path.join('VoteTracking.json');

  const bindingVotesSectionMatch = message.match(/Binding votes \(\d+\)[\s\S]*?(?=(<details>|$))/);
  const bindingVotesSection = bindingVotesSectionMatch ? bindingVotesSectionMatch[0] : '';
  const rows = bindingVotesSection.match(/\| @\w+.*?\|.*?\|.*?\|/g) || [];
  const latestVotes = rows.map(row => {
    const [, user, vote, timestamp] = row.split('|').map(col => col.trim());
    return { user: user.replace('@', ''), vote, timestamp, isVotedInLast3Months: true };
  });

  const yamlData = fs.readFileSync('MAINTAINERS.yaml', 'utf8');
  const parsedData = yaml.load(yamlData);
  // Initialize vote tracking file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    const tscMembers = parsedData.filter(entry => entry.isTscMember).map(entry => ({
      name: entry.github,
      lastParticipatedVoteTime: '',
      isVotedInLast3Months: 'false',
      lastVoteClosedTime: new Date().toISOString().split('T')[0],
      agreeCount: 0,
      disagreeCount: 0,
      abstainCount: 0,
      notParticipatingCount: 0
    }));
    fs.writeFileSync(filePath, JSON.stringify(tscMembers, null, 2));
  }
  const found = parsedData.some(item => item.github === "AayushSaini101");
  console.log(found)
  const voteDetails = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const latestVotesInfo = []
  voteDetails.map(voteInfo => {
    const checkPersonisTSC = parsedData.some(item => item.github === voteInfo.name);
    if (checkPersonisTSC) {
      const currentTime = new Date().toISOString().split('T')[0];
      const userInfo = latestVotes.find(vote => vote.user === voteInfo.name);
      const choice = userInfo ? userInfo.vote : "Not participated";
  
      if (userInfo) {
        voteInfo.isVotedInLast3Months = true;
        voteInfo.lastParticipatedVoteTime = currentTime;
        voteInfo[choice === "In favor" ? 'agreeCount' : choice === "Against" ? 'disagreeCount' : 'abstainCount']++;
      } else {
        voteInfo.notParticipatingCount++;
        voteInfo.lastVoteClosedTime = currentTime;
        if (!checkVotingDurationMoreThanThreeMonths(voteInfo)) {
          voteInfo.isVotedInLast3Months = false;
        }
      }
  
      let updatedVoteInfo = {};
      Object.keys(voteInfo).forEach(key => {
        if (key == 'name') {
          updatedVoteInfo['name'] = voteInfo.name
          updatedVoteInfo[eventTitle + "$$" + eventNumber] = choice
        }
        else {
          updatedVoteInfo[key] = voteInfo[key];
        }
      })
      latestVotesInfo.push(updatedVoteInfo)
    }
  });
  
  fs.writeFileSync(filePath, JSON.stringify(latestVotesInfo, null, 2));

  // Check voting duration
  function checkVotingDurationMoreThanThreeMonths(voteInfo) {
    const currentDate = new Date();
    const threeMonthsAgoDate = new Date(currentDate);
    threeMonthsAgoDate.setMonth(currentDate.getMonth() - 3);
    return new Date(voteInfo.lastVoteClosedTime) >= threeMonthsAgoDate &&
      new Date(voteInfo.lastParticipatedVoteTime) <= threeMonthsAgoDate;
  }

  // Convert JSON data to markdown table
  function jsonToMarkdownTable(data) {
    const keys = Object.keys(data[0]);
    let markdownTable = '| ' + keys.map(key => {
      if (key.includes('$$')) {
        const [title, number] = key.split('$$');
        return `[${title}](https://github.com/${orgName}/${repoName}/issues/${number})`;
      }
      const titles = {
        name: "GitHub user name",
        lastParticipatedVoteTime: "Last time the TSC member participated in a vote",
        hasVotedInLast3Months: "Flag indicating if TSC member voted in last 3 months. This information is calculated after each voting, and not basing on a schedule as there might be moments when there is no voting in place for 3 months and therefore no TSC member votes.",
        lastVoteClosedTime: "Date when last vote was closed. It indicated when the last voting took place and marks the date when this tracking document was updated.",
        agreeCount: "Number of times TSC member agreed in a vote.",
        disagreeCount: "Number of times TSC member did not agree in a vote.",
        abstainCount: "Number of times TSC member abstained from voting.",
        notParticipatingCount: "Number of times TSC member did not participate in voting."
      };
      return `<span style="position: relative; cursor: pointer;" title="${titles[key] || key}">${key}</span>`;
    }).join(' | ') + ' |\n';

    markdownTable += '| ' + keys.map(() => '---').join(' | ') + ' |\n';
    markdownTable += data.map(obj => '| ' + keys.map(key => {
      if (key === 'name') return `[${obj[key]}](https://github.com/${obj[key]})`;
      if (key.includes('$$')) {
        const icons = {
          "In favor": "👍",
          "Against": "👎",
          "Abstain": "👀",
          "Not participated": "🔕"
        };
        return `<span style="position: relative; cursor: pointer;" title="${obj[key]}">${icons[obj[key]] || obj[key]}</span>`;
      }
      return obj[key];
    }).join(' | ') + ' |').join('\n');

    return markdownTable;
  }

  const markdownTable = jsonToMarkdownTable(latestVotesInfo);
  fs.writeFileSync('voteTrackingDetails.md', markdownTable);
  console.log('Markdown table has been written to voteTrackingDetails.md');
}