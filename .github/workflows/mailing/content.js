const typeToContent = {
  voting: {
    subject: "TSC Voting Required",
    content: (name, links, title, custom = {}) => `
      <p>👋 Hi ${name},</p>
      <p>We need your vote on the following topic: <strong>${title}</strong>.</p>
      <p><strong>Issue Details</strong>: </p>
      <ul>
      ${
        links.map(link => `<li><strong>${link.title}</strong>: <a href="${link.url}" style="color:#007c89;font-weight:normal;text-decoration:underline" target="_blank">${link.url}</a></li>`).join('')
      }
      </ul>
      <p><strong>Days since started</strong>: ${custom.days}</p>
      <p>Your input is crucial to our decision-making process. Please take a moment to review the voting topic and share your thoughts.</p>
      <p>Thank you for your contribution! 🙏</p>
      <p style="font-size: 10px; color: #999999; margin-top: 20px;">Note: Please react on the vote comment to indicate your vote.</p>
    `,
  },
  warning: {
    subject: "TSC Voting Warning",
    content: (name, links, title, custom = {}) => `
      <p>Hey ${name},</p>
      <p>We've noticed you haven't participated in TSC voting for the past 3 months.</p>
      <p>As per our governance guidelines, active participation is essential for maintaining your TSC membership.</p>
      <p>Please review our <a href="${links[0].url}" style="color:#007c89;font-weight:normal;text-decoration:underline" target="_blank">${links[0].url}</a> and resume your participation.</p>
      <p>If you're facing any challenges or need assistance, please reach out to the team.</p>
    `,
  },
  removal: {
    subject: "TSC Membership Removal",
    content: (name, links, title, custom = {}) => `
      <p>Hey ${name},</p>
      <p>Following our previous communication and in accordance with AsyncAPI's governance policies, we regret to inform you that your TSC membership status has been changed due to extended inactivity.</p>
      <p>Details regarding this decision can be found here: <p>
      <ul>
      ${
        links.map(link => `<li><strong>${link.title}</strong>: <a href="${link.url}" style="color:#007c89;font-weight:normal;text-decoration:underline" target="_blank">${link.url}</a></li>`).join('')
      }
      </ul>
      <p>We appreciate your past contributions and hope to see you re-engage with the community in the future.</p>
      <p>If you have any questions or concerns, please feel free to reach out.</p> 
    `,
  },
};

const htmlToText = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};

const htmlMailContent = (type, name, links, title, custom = {}) => {
  const { subject, content } = typeToContent[type];

  return {
    subject,
    html: `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AsyncAPI Initiative</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .banner {
                background-color: #673756;
                padding: 0px;
                text-align: center;
                margin-bottom: 30px;
            }
            .banner img {
                width: 100%;
            }
            .content {
                padding: 20px;
                background-color: #ffffff;
                color: #3f3f3f;
                border-radius: 5px;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eeeeee;
                text-align: center;
                font-size: 12px;
                color: #666666;
            }
            a {
                color: #04a49c;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="banner">
                <img src="https://raw.githubusercontent.com/asyncapi/.github/master/assets/Github_Banner.png" alt="AsyncAPI Logo">
            </div>
            
            <div class="content">
                ${content(name, links, title, custom)}
                
                <p style="margin-top: 30px;">
                    Regards,<br>
                    AsyncAPI GitHub Action
                </p>
            </div>
            
            <div class="footer">
                <p>AsyncAPI Initiative &copy; ${new Date().getFullYear()}</p>
                <p>
                    <a href="https://www.asyncapi.com/">Website</a> |
                    <a href="https://github.com/asyncapi">GitHub</a> |
                    <a href="https://twitter.com/AsyncAPISpec">Twitter</a>
                </p>
            </div>
        </div>
    </body>
</html>`,
  };
};

module.exports = {
  htmlMailContent,
  htmlToText,
};
