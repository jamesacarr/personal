import ky from 'ky-universal';

import { InternalServerError } from '../lib/errors';

import { transformBody } from './utils';
import { validateBody, validateMethod } from './validations';

import type { NextApiHandler } from 'next';

const { WEBHOOK_URL } = process.env;

const contactHandler: NextApiHandler<void> = async (request, response) => {
  validateMethod(request.method);
  const body = await validateBody(request.body);

  if (!WEBHOOK_URL) {
    throw new InternalServerError('Missing WEBHOOK_URL');
  }

  await ky.post(WEBHOOK_URL, { json: transformBody(body) }).json();
  response.status(200).end();
};

export default contactHandler;
