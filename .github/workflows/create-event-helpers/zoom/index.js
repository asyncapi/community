const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const core = require('@actions/core');

/**
 * @param {string} date Date as YYYY-MM-DD
 * @param {string} time Number that represents hour, 2-digit format
 * @param {string} host email address of meeting host
 * @param {string} cohost coma-separated list of email addresses of alternative hosts
 */
module.exports = async(date, time, host, cohost) => {

    const meetingTitle = process.env.MEETING_NAME;
    let meetingDetails;

    const tokenConfig = {
        iss: process.env.ZOOM_API_KEY,
        exp: ((new Date()).getTime() + 5000)
    }

    const token = jwt.sign(tokenConfig, process.env.ZOOM_API_SECRET);

    const zoomSettings = JSON.stringify({
        topic: meetingTitle,
        type: '2',
        start_time: `${ date }T${ time }:00:00`,
        duration: '60',
        timezone: 'UTC',
        settings: {
            alternative_hosts: cohost,
            alternative_hosts_email_notification: false,
            contact_email: 'info@asyncapi.io',
            email_notification: false,
            host_video: true,
            mute_upon_entry: true,
            participant_video: true,
            join_before_host: false
        }
    })

    const fetchMeetingCreationOptions = {
        method: 'POST',

        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json',
            Authorization: `bearer ${ token }`
        },

        body: zoomSettings
    }

    try {
        const meetingCreationResponse = await fetch(`https://api.zoom.us/v2/users/${ host }/meetings`, fetchMeetingCreationOptions);
        meetingDetails = await meetingCreationResponse.json();
    } catch (error) {
        return core.setFailed(`Meeting creation failed: ${ error }`)
    }

    //core.debug(JSON.stringify(meetingDetails));
    const meetingId = meetingDetails.id;
    const meetingUrl = meetingDetails.join_url;

    const streamOptions = JSON.stringify({
        page_url: 'https://www.youtube.com/asyncapi',
        stream_key: process.env.STREAM_KEY,
        stream_url: process.env.STREAM_URL
    })

    const fetchMeetingUpdateOptions = {
        method: 'PATCH',

        headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${ token }`
        },

        body: streamOptions
    }

    try {
        await fetch(`https://api.zoom.us/v2/meetings/${ meetingId }/livestream`, fetchMeetingUpdateOptions);
    } catch (error) {
        return core.setFailed(`Meeting update with streaming info failed: ${ error }`)
    }

    if (!meetingId) return core.setFailed('meetingId is not available which means something went wrong in communication with Zoom. Most probably the host that you defined is not yet part of related Zoom account');
    core.info(`Created meeting ${ meetingId } that you can join at ${ meetingUrl }`);
    core.setOutput('meetingUrl', meetingUrl);
}