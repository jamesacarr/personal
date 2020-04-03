import { IncomingWebhook } from '@slack/webhook';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import errorHandler from '../error-handler';
import generatePayload from './generate-payload';
import { ContactRequest, ContactResponse } from './types';

const url = process.env.SLACK_CONTACT_WEBHOOK ?? '';
const webhook = new IncomingWebhook(url);

const sendMessage = async (request: ContactRequest, response: ContactResponse): Promise<void> => {
  if (!url) {
    errorHandler(response, INTERNAL_SERVER_ERROR);
    return;
  }

  const payload = generatePayload(request.body);
  await webhook.send(payload);
  response.json({ success: true });
};

export default sendMessage;
