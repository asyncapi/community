const mailer = require('@sendgrid/mail');
const { htmlMailContent, htmlToText } = require('./content');

mailer.setApiKey(process.env.SENDGRID_API_KEY);
const from = 'info@asyncapi.io';

const sendMail = async (to, type, name, link, title, custom = {}) => {
  const { subject, html } = htmlMailContent(type, name, link, title, custom);
  const text = htmlToText(html);

  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };

  try {
    const response = await mailer.send(msg);

    return {
      success: response[0].statusCode === 202,
      message: response[0].body,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendMail,
};
