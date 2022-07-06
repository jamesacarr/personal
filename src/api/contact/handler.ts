import sendMessage from './send-message';
import validateBody from './validate-body';
import validateMethod from './validate-method';

import type { NextApiHandler } from 'next';

const contactHandler: NextApiHandler<void> = async (request, response) => {
  validateMethod(request.method);
  const body = await validateBody(request.body);
  await sendMessage(body);
  response.status(200).end();
};

export default contactHandler;
