const dayjs = require('./dayjs.min.js');
const utc = require('./utc.js');
dayjs.extend(utc);

/**
 * @param {string} date Date as 2019-01-25T08:00:00Z
*/
module.exports.parseDate = (date) => {

    const meetingDate = dayjs(date);
    const formattedDate = meetingDate.utc().format('YYYY-MM-DD');
    const fullDate = meetingDate.utc().format('dddd MMMM D YYYY');
    const hour = meetingDate.utc().format('H');

    return { formattedDate, fullDate, hour }
}



