const core = require('@actions/core');
const htmlContent = require('./htmlContent.js');
const { listEvents } = require('../calendar/index.js');

module.exports = async () => {
    const events = await listEvents();
    if (!events.length) return core.info('No events scheduled for next week so no email will be sent');
    core.info(`Events: ${JSON.stringify(events, null, 2)}`);

    const KIT_BASE = 'https://api.kit.com/v4';

    if (!process.env.KIT_API_KEY) {
        return core.setFailed('KIT_API_KEY environment variable is not set');
    }
    if (!process.env.KIT_MEETINGS_TAG_ID) {
        return core.setFailed('KIT_MEETINGS_TAG_ID environment variable is not set');
    }

    const MEETINGS_TAG_ID = Number(process.env.KIT_MEETINGS_TAG_ID);

    if (Number.isNaN(MEETINGS_TAG_ID)) {
        return core.setFailed('KIT_MEETINGS_TAG_ID must be a valid number');
    }

    // Schedule for next day at 11:00 UTC
    const sendAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    sendAt.setUTCHours(11, 0, 0, 0);

    const res = await fetch(`${KIT_BASE}/broadcasts`, {
        method: 'POST',
        headers: {
            'X-Kit-Api-Key': process.env.KIT_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: 'AsyncAPI meetings scheduled for this week.',
            preview_text: 'Check out what AsyncAPI meetings are scheduled for this week.',
            content: htmlContent(events),
            description: `Meetings newsletter - ${new Date().toUTCString()}`,
            public: false,
            published_at: null,
            send_at: sendAt.toISOString(),
            subscriber_filter: [{ all: [{ type: 'tag', ids: [MEETINGS_TAG_ID] }] }]
        })
    });

    if (!res.ok) return core.setFailed(`Failed creating broadcast: ${await res.text()}`);
    core.info('Kit.com meetings broadcast scheduled');
};
