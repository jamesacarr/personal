import { IncomingWebhook } from '@slack/webhook';

import generatePayload from './generate-payload';
import { ContactRequest } from './types';
import { InternalServerError } from '../lib/errors';

const url = process.env.SLACK_CONTACT_WEBHOOK ?? '';
const webhook = new IncomingWebhook(url);

const sendMessage = async (request: ContactRequest): Promise<void> => {
  if (!url) {
    throw new InternalServerError();
  }

  const payload = generatePayload(request.body);
  webhook.send(payload);
};

export default sendMessage;
