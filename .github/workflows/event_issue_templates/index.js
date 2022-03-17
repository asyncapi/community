const { writeFileSync } = require('fs');
const { getMeetingIssueContent } = require('./meetings/community.js');
const { parseDate } = require('./utils/date.js');

/**
 * @param {string} date Date as YYYY-MM-DD
 * @param {string} time Number that represents hour, 2-digit format
 * @param {string} code Entire core package helper
 * @param {string} getMeetingIssueContent Function that returns content of the meeting issue 
*/
module.exports = (date, time, core, getMeetingIssueContent) => {
    
    core.info(`Workflow triggered with the following hour ${time} and date ${date}`);
    const dateDetails = parseDate(`${ date }T${ time }:00:00Z`);
    
    core.info('This is how time and date looks like after parsing:');
    core.info(JSON.stringify(dateDetails));

    if (dateDetails === 'Invalid Date') core.setFailed('Invalid date of the event. Make sure that you provided correct hour of the meeting and date in a format described in the meeting input form.')

    const issueContent =  getMeetingIssueContent(dateDetails.hour, dateDetails.formattedDate);

    writeFileSync('content.md', issueContent, { encoding: 'utf8'});

    core.setOutput('formattedDate', dateDetails.formattedDate);
    core.setOutput('fullDate', dateDetails.fullDate);
    core.setOutput('hour', dateDetails.hour);
}