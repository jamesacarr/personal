import withErrorHandler from '../lib/with-error-handler';

import validateBody from './validate-body';
import validateMethod from './validate-method';
import validateReCAPTCHA from './validate-recaptcha';
import sendMessage from './send-message';
import { ContactRequest, ContactResponse } from './types';

type Handler = (request: ContactRequest, response: ContactResponse) => Promise<void>;

const contactHandler: Handler = async (request, response) => {
  validateMethod(request);
  validateBody(request);
  await validateReCAPTCHA(request);
  await sendMessage(request);
  response.json({ success: true });
};

export default withErrorHandler(contactHandler);
