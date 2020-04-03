import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import errorHandler from '../error-handler';
import validateReCAPTCHA from '../validate-recaptcha';
import validateBody from './validate-body';
import validateMethod from './validate-method';
import sendMessage from './send-message';
import { ContactRequest, ContactResponse } from './types';

type Handler = (request: ContactRequest, response: ContactResponse) => void | Promise<void>;

const contactHandler: Handler = async (request, response) => {
  try {
    if (!validateMethod(request, response)) {
      return;
    }

    if (!validateBody(request, response)) {
      return;
    }

    const validToken = await validateReCAPTCHA(request, response);
    if (!validToken) {
      return;
    }

    await sendMessage(request, response);
  } catch {
    errorHandler(response, INTERNAL_SERVER_ERROR);
  }
};

export default contactHandler;
