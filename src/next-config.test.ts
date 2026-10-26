// @vitest-environment node
import { unstable_getResponseFromNextConfig } from 'next/experimental/testing/server';
import { describe, expect, it } from 'vitest';

import nextConfig from '../next.config';
import { SECURITY_HEADERS } from './security/headers';

describe('next.config headers', () => {
  it.each(['/', '/robots.txt'])(
    'sends the security headers on %s',
    async path => {
      expect.hasAssertions();
      const response = await unstable_getResponseFromNextConfig({
        nextConfig,
        url: `https://jamescarr.dev${path}`,
      });

      for (const { key, value } of SECURITY_HEADERS) {
        expect(response.headers.get(key)).toBe(value);
      }
    },
  );
});
