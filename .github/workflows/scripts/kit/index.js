/**
 * This code is centrally managed in https://github.com/asyncapi/.github/
 * Don't make changes to this file in this repo as they will be overwritten with changes made to the same file in above mentioned repo
 */
const core = require('@actions/core');
const htmlContent = require('./htmlContent.js');

module.exports = async (link, title) => {
    const KIT_BASE = 'https://api.kit.com/v4';
    const TSC_TAG_ID = Number(process.env.KIT_TSC_TAG_ID);

    // Schedule ~1 hour ahead, on the hour (same timing logic as previous Mailchimp version)
    const sendAt = new Date(Date.now() + 60 * 60 * 1000);
    sendAt.setUTCMinutes(0, 0, 0);

    const res = await fetch(`${KIT_BASE}/broadcasts`, {
        method: 'POST',
        headers: {
            'X-Kit-Api-Key': process.env.KIT_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: `TSC attention required: ${title}`,
            preview_text: 'Check out the latest topic that TSC members have to be aware of',
            content: htmlContent(link, title),
            description: `TSC notification - ${new Date().toUTCString()}`,
            public: false,
            published_at: null,
            send_at: sendAt.toISOString(),
            subscriber_filter: [{ all: [{ type: 'tag', ids: [TSC_TAG_ID] }] }]
        })
    });

    if (!res.ok) return core.setFailed(`Failed creating broadcast: ${await res.text()}`);
    core.info('Kit.com TSC broadcast scheduled');
};
