// @vitest-environment node
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { config, proxy } from './proxy';
import { CSP_HEADER_NAME } from './security/csp';

const nonceOf = (policy: string | null) =>
  policy?.match(/'nonce-([^']+)'/)?.[1];

const callProxy = () => proxy(new NextRequest('https://jamescarr.dev/'));

// NextResponse.next({ request: { headers } }) forwards request headers to the
// app as x-middleware-request-* response headers.
const forwardedHeader = (response: Response, name: string) =>
  response.headers.get(`x-middleware-request-${name.toLowerCase()}`);

describe('proxy', () => {
  it('sends a CSP with a nonce on the response', () => {
    const response = callProxy();

    expect(nonceOf(response.headers.get(CSP_HEADER_NAME))).toBeDefined();
  });

  it('enforces the CSP rather than only reporting violations', () => {
    const response = callProxy();

    expect(response.headers.get('Content-Security-Policy')).toBeTruthy();
    expect(response.headers.has('Content-Security-Policy-Report-Only')).toBe(
      false,
    );
  });

  it('uses a fresh nonce for every request', () => {
    const first = nonceOf(callProxy().headers.get(CSP_HEADER_NAME));
    const second = nonceOf(callProxy().headers.get(CSP_HEADER_NAME));

    expect(first).not.toBe(second);
  });

  it('forwards the same CSP to the app so Next.js can nonce its scripts', () => {
    const response = callProxy();
    const policy = response.headers.get(CSP_HEADER_NAME);

    expect(policy).not.toBeNull();
    expect(forwardedHeader(response, CSP_HEADER_NAME)).toBe(policy);
  });

  it('forwards the nonce to the app as x-nonce', () => {
    const response = callProxy();

    expect(forwardedHeader(response, 'x-nonce')).toBe(
      nonceOf(response.headers.get(CSP_HEADER_NAME)),
    );
  });

  describe('matcher', () => {
    const matches = (url: string, headers?: Record<string, string>): boolean =>
      unstable_doesMiddlewareMatch({
        config,
        headers,
        url: `https://jamescarr.dev${url}`,
      });

    it('runs on the home page', () => {
      expect(matches('/')).toBe(true);
    });

    it('runs on server action posts to the home page', () => {
      expect(
        matches('/', { 'content-type': 'text/plain', 'next-action': 'abc' }),
      ).toBe(true);
    });

    it.each(['/apiary', '/opengraph-image-guide'])(
      'runs on pages that only share a prefix with a skipped path: %s',
      path => {
        expect(matches(path)).toBe(true);
      },
    );

    it.each([
      '/_next/static/chunks/x.js',
      '/_next/image?url=%2Fx.png&w=64&q=75',
      '/api/ping',
      '/robots.txt',
      '/sitemap.xml',
      '/manifest.webmanifest',
      '/opengraph-image',
      '/icons/favicon-32x32.png',
      '/favicon.ico',
    ])('skips %s', url => {
      expect(matches(url)).toBe(false);
    });

    it('skips router prefetches', () => {
      expect(matches('/', { 'next-router-prefetch': '1' })).toBe(false);
    });

    it('skips browser prefetches', () => {
      expect(matches('/', { purpose: 'prefetch' })).toBe(false);
    });
  });
});
