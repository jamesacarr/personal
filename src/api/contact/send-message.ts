import { IncomingWebhook } from '@slack/webhook';

import { InternalServerError } from '../lib/errors';
import generatePayload from './generate-payload';
import { ContactRequestBody } from './types';

const SLACK_URL = process.env.SLACK_CONTACT_WEBHOOK ?? '';
const webhook = new IncomingWebhook(SLACK_URL);

const sendMessage = async (body: ContactRequestBody): Promise<void> => {
  if (!SLACK_URL) {
    throw new InternalServerError();
  }

  const payload = generatePayload(body);
  await webhook.send(payload);
};

export default sendMessage;
