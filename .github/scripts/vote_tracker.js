const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const message = process.env.COMMENT_BODY;
const Issue_Number = process.env.EVENT_NUMBER;
const Issue_Title = process.env.EVENT_TITLE
const orgName = process.env.ORG_NAME
const repoName = process.env.REPO_NAME
const bindingVotesSectionMatch = message.match(/Binding votes \(\d+\)[\s\S]*?(?=(<details>|$))/);

const bindingVotesSection = bindingVotesSectionMatch ? bindingVotesSectionMatch[0] : '';

// Extract the binding voting rows
const rows = bindingVotesSection.match(/\| @\w+.*?\|.*?\|.*?\|/g) || [];


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
      lastParticipatedVoteTime: "",
      isVotedInLast3Months: "false",
      lastVoteClosedTime: new Date().toISOString().split('T')[0],
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
  const currentTime = new Date().toISOString().split('T')[0];
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
        updatedVoteInfo[Issue_Title+"$$"+Issue_Number] = choice
      }
      else {
        updatedVoteInfo[key] = voteInfo[key];
      }
    })
    updatedVotes.push(updatedVoteInfo)


  } else {
    voteInfo.notParticipatingCount++;
    voteInfo.lastVoteClosedTime = currentTime
    let updatedVoteInfo = {};
    Object.keys(voteInfo).forEach(key => {
      if (key == 'name') {
        updatedVoteInfo['name'] = voteInfo.name
        updatedVoteInfo[Issue_Title+"$$"+Issue_Number] = "Not participated"
      }
      else {
        updatedVoteInfo[key] = voteInfo[key];
      }
    })
    if (voteInfo.isVotedInLast3Months === "Member doesn't give vote to any voting process") {
      if (checkVotingDurationMoreThanThreeMonths(voteInfo)) {
        voteInfo.isVotedInLast3Months = false;
      }
    } else {
      if (!checkVotingDurationMoreThanThreeMonths(voteInfo)) {
        voteInfo.isVotedInLast3Months = true;
      }
    }
    updatedVotes.push(updatedVoteInfo)
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

// Function to read JSON data from file
function readJsonFile(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filename}: ${err}`);
      return callback(err);
    }
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseError) {
      console.error(`Error parsing ${filename} as JSON: ${parseError}`);
      callback(parseError);
    }
  });
}

// Function to convert JSON data to markdown table
function jsonToMarkdownTable(data) {

  let markdownTable = '';
  // Get keys from the first object to use as headers
  const keys = Object.keys(data[0]);

  //console.log(keys)
  // Initialize header row
  markdownTable += '| ';
  keys.forEach((key, index) => {
    if (index > 0) {
      markdownTable += ' | ';
    }
    // Check if the key contains ':'
    if (key.includes('$$')) {
      const [title, number] = key.split('$$');
      markdownTable += `[${title}](https://github.com/${orgName}/${repoName}/issues/${number})`;
    } else {
      markdownTable += key;
    }
  });
  markdownTable += ' |\n';

  // Initialize separator row
  markdownTable += '| ';
  keys.forEach((_, index) => {
    if (index > 0) {
      markdownTable += ' | ';
    }
    markdownTable += '---';
  });
  markdownTable += ' |\n';
  // Append values for each object
  data.forEach(obj => {
    markdownTable += '| ';
    keys.forEach(key => {
      // Format name field as clickable GitHub username link
      if (key === 'name') {
        markdownTable += `[${obj[key]}](https://github.com/${obj[key]})`;
      }
      else
        if (key.includes("$$")) {
          if (obj[key] === "In favor") {
    
            markdownTable +=  `<span style="position: relative; cursor: pointer;" title="In favor">👍</span>`
          }
          else
            if (obj[key] === "Against") {
              markdownTable += `<span style="position: relative; cursor: pointer;" title="Against">👎</span>`;
            }
            else
              if (obj[key] === "Abstain") {
                markdownTable += `<span  style="position: relative; cursor: pointer;" title="Abstain">👀</span>`;
              }
              else 
              if(obj[key] === "Not participated"){
                markdownTable += `<span style="position: relative; cursor: pointer;" title="Not participated">🔕</span>`;
              }
        }

        else {
          markdownTable += obj[key];
        }


      markdownTable += ' | '
    });
    markdownTable = markdownTable.slice(0, -2) + '|\n';
  });

  return markdownTable;
}
// Read JSON data from file
readJsonFile('VoteTracking.json', (err, jsonData) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  // Convert JSON data to markdown table
  const markdownTable = jsonToMarkdownTable(jsonData);
  if(fs.existsSync("voteTrackingDetails.md")){
  fs.rmSync('voteTrackingDetails.md')
  }
  // Write markdown table to a file
  fs.writeFile('voteTrackingDetails.md', markdownTable, (writeErr) => {
    if (writeErr) {
      console.error('Error writing markdown table to file:', writeErr);
    } else {
      console.log('Markdown table has been written to output.md');
    }
  });
});