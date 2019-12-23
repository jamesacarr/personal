module.exports = {
  target: 'serverless',
  env: {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    SLACK_CONTACT_WEBHOOK: process.env.SLACK_CONTACT_WEBHOOK,
  },
};
