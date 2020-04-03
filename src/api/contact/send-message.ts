import axios from 'axios';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import errorHandler from '../error-handler';
import generatePayload from './generate-payload';
import { ContactRequest, ContactResponse } from './types';

const sendMessage = async (request: ContactRequest, response: ContactResponse): Promise<void> => {
  const url = process.env.SLACK_CONTACT_WEBHOOK ?? '';
  if (!url) {
    errorHandler(response, INTERNAL_SERVER_ERROR);
    return;
  }

  await axios.post(url, generatePayload(request.body));
  response.json({ success: true });
};

export default sendMessage;
