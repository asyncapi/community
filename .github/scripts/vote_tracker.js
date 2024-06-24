const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const message = process.env.COMMENT_BODY;
const eventNumber = process.env.EVENT_NUMBER;
const eventTitle = process.env.EVENT_TITLE
const orgName = process.env.ORG_NAME
const repoName = process.env.REPO_NAME
const filePath = path.join('VoteTracking.json');

const bindingVotesSectionMatch = message.match(/Binding votes \(\d+\)[\s\S]*?(?=(<details>|$))/);
const bindingVotesSection = bindingVotesSectionMatch ? bindingVotesSectionMatch[0] : '';
const rows = bindingVotesSection.match(/\| @\w+.*?\|.*?\|.*?\|/g) || [];
const latestVotes = rows.map(row => {
  const [ , user, vote, timestamp] = row.split('|').map(col => col.trim());
  return { user: user.replace('@', ''), vote, timestamp, isVotedInLast3Months: true };
});

// Initialize vote tracking file if it doesn't exist
if (!fs.existsSync(filePath)) {
  const yamlData = fs.readFileSync('MAINTAINERS.yaml', 'utf8');
  const parsedData = yaml.load(yamlData);
  const tscMembers = parsedData.filter(entry => entry.isTscMember).map(entry => ({
    name: entry.github,
    lastParticipatedVoteTime: '',
    hasVotedInLast3Months: 'false',
    lastVoteClosedTime: new Date().toISOString().split('T')[0],
    agreeCount: 0,
    disagreeCount: 0,
    abstainCount: 0,
    notParticipatingCount: 0
  }));
  fs.writeFileSync(filePath, JSON.stringify(tscMembers, null, 2));
}

const voteDetails = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const latestVotesInfo = []
voteDetails.map(voteInfo => {
  const currentTime = new Date().toISOString().split('T')[0];
  const userInfo = latestVotes.find(vote => vote.user === voteInfo.name);
  const choice = userInfo ? userInfo.vote : "Not participated";
  
  if (userInfo) {
    voteInfo.hasVotedInLast3Months = true;
    voteInfo.lastParticipatedVoteTime = currentTime;
    voteInfo[choice === "In favor" ? 'agreeCount' : choice === "Against" ? 'disagreeCount' : 'abstainCount']++;
  } else {
    voteInfo.notParticipatingCount++;
    voteInfo.lastVoteClosedTime = currentTime;
    if (!checkVotingDurationMoreThanThreeMonths(voteInfo)) {
      voteInfo.hasVotedInLast3Months = false;
    }
  }

  let updatedVoteInfo = {};
  Object.keys(voteInfo).forEach(key => {
    if (key == 'name') {
      updatedVoteInfo['name'] = voteInfo.name
      updatedVoteInfo[eventTitle+"$$"+eventNumber] = choice
    }
    else {
      updatedVoteInfo[key] = voteInfo[key];
    }
  })
  latestVotesInfo.push(updatedVoteInfo)
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
      name: "Github user name",
      lastParticipatedVoteTime: "Last participated vote time of the user",
      hasVotedInLast3Months: "Voted in last 3 months or not",
      lastVoteClosedTime: "Last vote closed time",
      agreeCount: "Number of agreements votes",
      disagreeCount: "Number of disagreements votes",
      abstainCount: "Number of abstentions votes",
      notParticipatingCount: "Number of non-participations votes"
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