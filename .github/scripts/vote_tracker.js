const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const message = process.env.COMMENT_BODY;
const Issue_Number = process.env.Issue_Number;
// Extract the binding votes section

const bindingVotesSectionMatch = message.match(/Binding votes \(\d+\)[\s\S]*?(?=(<details>|$))/);

if (!bindingVotesSectionMatch) {
  console.error('No binding votes section found');
  process.exit(0);
}

const bindingVotesSection = bindingVotesSectionMatch[0];

// Extract the binding voting rows
const rows = bindingVotesSection.match(/\| @\w+.*?\|.*?\|.*?\|/g);

if (!rows) {
  console.error('No binding vote rows found');
  process.exit(0);
}

// Parse the extracted rows to get user names, votes, and timestamps
const latestVotes = rows.map(row => {
  const columns = row.split('|').map(col => col.trim());
  return {
    user: columns[1].replace('@', ''),
    vote: columns[2],
    timestamp: columns[3],
    isVotedInLast3Months: true
  };
});

//console.log(latestVotes)
const filePath = path.join('voteTracking.json');
// Check whether the VoteTracking file is present in the directory or not 
if (!fs.existsSync(filePath)) {
  const yamlData = fs.readFileSync("MAINTAINERS.yaml", 'utf8');
  const parsedData = yaml.load(yamlData);
  const tscMembers = parsedData.filter(entry => entry.isTscMember)
    .map(entry => ({
      name: entry.github,
      lastParticipatedVoteTime: "",
      isVotedInLast3Months: "Member doesn't give vote to any voting process",
      lastVoteClosedTime: new Date().toISOString(),
      agreeCount: 0,
      disagreeCount: 0,
      abstainCount: 0,
      notParticipatingCount: 0

    }));

  fs.writeFileSync(filePath, JSON.stringify(tscMembers, null, 2));
}


const voteDetailsAll = fs.readFileSync(filePath, 'utf8');
const voteDetails = JSON.parse(voteDetailsAll);
const updatedVotes = []
voteDetails.forEach(voteInfo => {
  // Checking the member who voted in the latest voting process
  const tscMember = latestVotes.findIndex(vote => vote.user === voteInfo.name);
  const currentTime = new Date().toISOString();
  if (tscMember !== -1) {
    voteInfo.isVotedInLast3Months = true;
    voteInfo.lastParticipatedVoteTime = currentTime;
    const userInfo = latestVotes.find(vote => vote.user === voteInfo.name);
    const choice = userInfo.vote;
    if (choice === "In favor") {
      voteInfo.agreeCount++;
    } else if (choice === "Against") {
      voteInfo.disagreeCount++;
    } else {
      voteInfo.abstainCount++;
    }
    let updatedVoteInfo = {};
    Object.keys(voteInfo).forEach(key => {
      if (key == 'name') {
        updatedVoteInfo['name'] = voteInfo.name
        updatedVoteInfo["IssueNumber#" + Issue_Number] = choice;
      }
      else {
        updatedVoteInfo[key] = voteInfo[key];
      }
    })
    updatedVotes.push(updatedVoteInfo)


  } else {
    voteInfo.notParticipatingCount++;
    if (voteInfo.isVotedInLast3Months === "Member doesn't give vote to any voting process") {
      if (checkVotingDurationMoreThanThreeMonths(voteInfo)) {
        voteInfo.isVotedInLast3Months = false;
      }
    } else {
      if (!checkVotingDurationMoreThanThreeMonths(voteInfo)) {
        voteInfo.isVotedInLast3Months = true;
      }
    }
    updatedVotes.push(voteInfo)
  }
});

fs.rmSync(filePath)
fs.writeFileSync(filePath, JSON.stringify(updatedVotes, null, 2));

function checkVotingDurationMoreThanThreeMonths(voteInfo) {

  const currentDate = new Date();
  const lastCompletedVoteDate = new Date(voteInfo.lastVoteClosedTime);
  const lastVoteDateOfTCSMember = new Date(voteInfo.lastParticipatedVoteTime)
  const threeMonthsAgoDate = new Date(currentDate);
  threeMonthsAgoDate.setMonth(currentDate.getMonth() - 3);

  return lastCompletedVoteDate >= threeMonthsAgoDate && lastVoteDateOfTCSMember <= threeMonthsAgoDate
}