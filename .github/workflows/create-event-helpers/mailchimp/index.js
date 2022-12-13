const mailchimp = require('@mailchimp/mailchimp_marketing');
const core = require('@actions/core');
const htmlContent = require('./htmlContent.js');
const { listEvents } = require('../calendar/index.js');

/**
 * Listing events from Google Calendar and sending them to Newsletter subscribers. 
 * This code is not triggered separately in workflow, in 2 separate steps a GitHub actions have issues when doing code.setOutput with complex JSON in String.
 */
module.exports = async () => {

    const events = await listEvents();
    if (!events.length) return core.info('No events scheduled for next week so no email will be sent');
    core.info(`Formatted list of events: ${ JSON.stringify(events, null, 4) }`)

    let newCampaign;

    mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: 'us12'
    });

    /*
    * First we create campaign
    */
    try {
        newCampaign = await mailchimp.campaigns.create({
            type: 'regular',
            recipients: {
                list_id: '6e3e437abe',
                segment_opts: {
                    match: 'any',
                    conditions: [{
                        condition_type: 'Interests',
                        field: 'interests-2801e38b9f',
                        op: 'interestcontains',
                        value: ['3505cd49d1']
                    }]
                }
            },
            settings: {
                subject_line: 'AsyncAPI meetings scheduled for this week.',
                preview_text: 'Check out what AsyncAPI meetings are scheduled for this week and learn how to join them.',
                title: `Meetings info - ${ new Date(Date.now()).toUTCString()}`,
                from_name: 'AsyncAPI Initiative',
                reply_to: 'info@asyncapi.io',
            }
        });
    } catch (error) {
        return core.setFailed(`Failed creating campaign: ${ JSON.stringify(error) }`);
    }

    /*
    * Content of the email is added separately after campaign creation
    */
    try {
        await mailchimp.campaigns.setContent(newCampaign.id, { html: htmlContent(events) });
    } catch (error) {
        return core.setFailed(`Failed adding content to campaign: ${ JSON.stringify(error) }`);
    }

    /*
    * We schedule an email, we do not send it at midnight immediately but use schedule with `timewarp` to basically send email at the same time for anyone no matter what time zone they live in
    */
    try {
        //next day 11:00
        const scheduleDate = new Date(Date.parse(new Date(Date.now()).toISOString()) + 1 * 24 * 60 * 60 * 1000);
        scheduleDate.setUTCHours(11);
        scheduleDate.setUTCMinutes(00);


        await mailchimp.campaigns.schedule(newCampaign.id, {
            schedule_time: scheduleDate.toISOString(),
            timewarp: true
        });
    } catch (error) {
        return core.setFailed(`Failed scheduling email: ${ JSON.stringify(error) }`);
    }

    core.info(`New email campaign created`);
}