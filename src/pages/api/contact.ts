import { transformBody } from '../../contact/utils';
import { validateBody, validateMethod } from '../../contact/validations';
import { InternalServerError } from '../../lib/errors';
import { withErrorHandler } from '../../lib/middleware';

import type { NextApiHandler } from 'next';

const { WEBHOOK_URL } = process.env;

const handler: NextApiHandler<void> = async (request, response) => {
  validateMethod(request.method);
  const body = await validateBody(request.body);

  if (!WEBHOOK_URL) {
    throw new InternalServerError('Missing WEBHOOK_URL');
  }

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transformBody(body)),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  response.status(200).end();
};

export default withErrorHandler(handler);
