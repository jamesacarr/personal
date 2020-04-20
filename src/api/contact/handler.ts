import { Handler } from '../types';
import withErrorHandler from '../lib/with-error-handler';

import validateBody from './validate-body';
import validateMethod from './validate-method';
import sendMessage from './send-message';

const contactHandler: Handler<void> = async (request) => {
  validateMethod(request.method);
  const body = await validateBody(request.body);
  await sendMessage(body);
};

export default withErrorHandler(contactHandler);
