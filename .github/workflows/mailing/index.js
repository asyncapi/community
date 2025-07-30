const { Client } = require('node-mailjet')
const { htmlMailContent, htmlToText } = require('./content');

const mailjet = new Client({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
})

const from = 'info@asyncapi.io';

const sendMail = async (to, type, name, links, title, custom = {}) => {
  const { subject, html } = htmlMailContent(type, name, links, title, custom);
  const text = htmlToText(html);

  console.debug(`Sending mail with subject: ${subject}`);
  console.debug(`Sending mail with text: ${text}`);
  console.debug(`Sending mail with text in html: ${html}`);

  const data = {
    Messages: [
      {
        From: {
          Email: from,
        },
        To: [
          {
            Email: to,
          },
        ],
        Subject: subject,
        HTMLPart: html,
        TextPart: text
      },
    ],
  }

  try {
    const response = await mailjet
      .post('send', { version: 'v3.1' })
      .request(data);

    const { Status, Errors } = response.body.Messages[0]

    return {
      success: Status === 'success',
      message: Errors,
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendMail,
};
