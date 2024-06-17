const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const message = process.env.COMMENT_BODY;
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

const filePath = path.join('VoteTracking.json');
// Check whether the VoteTracking file is present in the directory or not 
if (!fs.existsSync(filePath)) {
  const yamlData = fs.readFileSync("MAINTAINERS.yaml", 'utf8');
  const parsedData = yaml.load(yamlData);
  const tscMembers = parsedData.filter(entry => entry.isTscMember)
                               .map(entry => ({
                                 name: entry.github,
                                 isVotedInLast3Months: "Member doesn't give vote to any voting process",
                                 lastClosedVoteTime: new Date().toISOString()
                               }));

  fs.writeFileSync(filePath, JSON.stringify(tscMembers, null, 2));
}

const voteDetailsAll = fs.readFileSync(filePath, 'utf8');
  const voteDetails = JSON.parse(voteDetailsAll);
  voteDetails.forEach(voteInfo => {
    // Finding the member in the VoteTracking.json
    const tscMember = latestVotes.findIndex(vote => vote.user === voteInfo.name);
    const currentTime = new Date().toISOString();

    if (tscMember !== -1) {
      voteInfo.isVotedInLast3Months = true;
      voteInfo.lastClosedVoteTime = currentTime;
    } else {
      if (voteInfo.isVotedInLast3Months === "Member doesn't give vote to any voting process") {
        if (checkVotingDurationMoreThanThreeMonths(voteInfo)) {
          voteInfo.isVotedInLast3Months = false;
        }
      } else {
        if (!checkVotingDurationMoreThanThreeMonths(voteInfo)) {
          voteInfo.isVotedInLast3Months = true;
          voteInfo.lastClosedVoteTime = currentTime;
        }
      }
    }
  });
  fs.writeFileSync(filePath, JSON.stringify(voteDetails, null, 2));


function checkVotingDurationMoreThanThreeMonths(voteInfo) {
  const lastVoteDate = new Date(voteInfo.lastClosedVoteTime);
  const currentDate = new Date();
  const threeMonthsAgo = new Date(currentDate);

  // Set the date to 3 months ago
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

  return lastVoteDate <= threeMonthsAgo;
}