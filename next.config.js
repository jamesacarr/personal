module.exports = {
  target: 'serverless',
  env: {
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    SLACK_CONTACT_WEBHOOK: process.env.SLACK_CONTACT_WEBHOOK,
  },
};
