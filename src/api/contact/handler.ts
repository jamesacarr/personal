import { Handler } from '../types';
import getIPAddress from '../lib/get-ip-address';
import withErrorHandler from '../lib/with-error-handler';

import validateBody from './validate-body';
import validateMethod from './validate-method';
import validateSpam from './validate-spam';
import sendMessage from './send-message';

const contactHandler: Handler<void> = async (request) => {
  validateMethod(request.method ?? '');
  const body = await validateBody(request.body);

  await validateSpam({
    ip: getIPAddress(request),
    userAgent: request.headers['user-agent'] ?? '',
    ...body,
  });
  await sendMessage(body);
};

export default withErrorHandler(contactHandler);
