module.exports = {
  target: 'serverless',
  env: {
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    SLACK_CONTACT_WEBHOOK: process.env.SLACK_CONTACT_WEBHOOK,
  },
};
