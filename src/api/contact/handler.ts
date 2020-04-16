import { Handler } from '../types';
import withErrorHandler from '../lib/with-error-handler';

import validateBody from './validate-body';
import validateMethod from './validate-method';
import validateSpam from './validate-spam';
import sendMessage from './send-message';
import { ContactRequestBody } from './types';

const contactHandler: Handler<ContactRequestBody, void> = async (request) => {
  validateMethod(request.method);
  validateBody(request.body);
  await validateSpam(request);
  await sendMessage(request.body);
};

export default withErrorHandler(contactHandler);
