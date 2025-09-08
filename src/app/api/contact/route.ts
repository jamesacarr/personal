import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { transformBody } from '@/contact/utils';
import { validateBody } from '@/contact/validations';
import { InternalServerError } from '@/lib/errors';
import { withErrorHandler } from '@/lib/middleware';

const { WEBHOOK_URL } = process.env;

export const POST = withErrorHandler(async (request: NextRequest) => {
  if (!WEBHOOK_URL) {
    throw new InternalServerError('Missing WEBHOOK_URL');
  }

  const body = await validateBody(await request.json());

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transformBody(body)),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return NextResponse.json({ success: true });
});
