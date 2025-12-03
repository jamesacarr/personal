import { NextResponse } from 'next/server';

import { withErrorHandler } from '@/lib/middleware';

export const GET = withErrorHandler<'/api/ping'>(
  () => new NextResponse(null, { status: 200 }),
);
