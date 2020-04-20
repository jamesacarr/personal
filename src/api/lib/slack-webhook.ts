import { IncomingWebhook } from '@slack/webhook';

const SLACK_URL = process.env.SLACK_CONTACT_WEBHOOK ?? '';

class SlackWebhook extends IncomingWebhook {
  constructor() {
    super(SLACK_URL);
  }
}

export default SlackWebhook;
