import { NextResponse } from 'next/server';

import { transformBody } from '@/contact/utils';
import { validateBody } from '@/contact/validations';
import { BadRequestError, InternalServerError } from '@/lib/errors';
import { withErrorHandler } from '@/lib/middleware';

const { WEBHOOK_URL } = process.env;

export const POST = withErrorHandler<'/api/contact'>(async request => {
  if (!WEBHOOK_URL) {
    throw new InternalServerError('Missing WEBHOOK_URL');
  }

  if (request.headers.get('content-length') === '0') {
    throw new BadRequestError('body required');
  }

  const body = await validateBody(await request.json());

  const res = await fetch(WEBHOOK_URL, {
    body: JSON.stringify(transformBody(body)),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return NextResponse.json({ success: true });
});
