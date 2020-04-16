import { IncomingWebhook } from '@slack/webhook';

import { InternalServerError } from '../lib/errors';
import generatePayload from './generate-payload';
import { ContactRequestBody } from './types';

const url = process.env.SLACK_CONTACT_WEBHOOK ?? '';
const webhook = new IncomingWebhook(url);

const sendMessage = async (body: ContactRequestBody): Promise<void> => {
  if (!url) {
    throw new InternalServerError();
  }

  const payload = generatePayload(body);
  webhook.send(payload);
};

export default sendMessage;
