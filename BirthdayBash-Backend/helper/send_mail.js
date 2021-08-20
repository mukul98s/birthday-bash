const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.EMAIL_SERVICE_CLIENT_ID;
const CLIENT_SECRET = process.env.EMAIL_SERVICE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.EMAIL_SERVICE_REFRESH_TOKEN;
const REDIRECT_URL = process.env.EMAIL_SERVICE_REDIRECT_URL;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = {
  sendMail: async (mailOptions) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'gamilOAuthaccounthere',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return next(error);
    }
  },
};
