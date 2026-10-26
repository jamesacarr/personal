import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { buildCsp, CSP_HEADER_NAME } from './security/csp';

// Next.js reads the nonce from the forwarded request CSP and applies it to its
// own scripts; the layout reads x-nonce for scripts it renders itself.
export const proxy = (request: NextRequest) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const policy = buildCsp(nonce, process.env.NODE_ENV === 'development');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set(CSP_HEADER_NAME, policy);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(CSP_HEADER_NAME, policy);

  return response;
};

// Only page requests need a CSP. Static assets, API routes, metadata routes and
// prefetches skip the proxy. Matcher values must be literals for Next.js to
// analyse them at build time.
export const config = {
  matcher: [
    {
      missing: [
        { key: 'next-router-prefetch', type: 'header' },
        { key: 'purpose', type: 'header', value: 'prefetch' },
      ],
      source:
        '/((?!(?:api|_next/static|_next/image|favicon\\.ico|icons|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|opengraph-image)(?:/|$)).*)',
    },
  ],
};
