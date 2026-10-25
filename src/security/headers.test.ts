import { describe, expect, it } from 'vitest';

import { SECURITY_HEADERS } from './headers';

const header = (key: string) =>
  SECURITY_HEADERS.find(entry => entry.key === key)?.value;

describe('SECURITY_HEADERS', () => {
  it('stops browsers sniffing content types', () => {
    expect(header('X-Content-Type-Options')).toBe('nosniff');
  });

  it('sends only the origin to other sites', () => {
    expect(header('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
  });

  it('blocks framing by any origin', () => {
    expect(header('X-Frame-Options')).toBe('DENY');
  });

  it.each(['camera', 'microphone', 'geolocation'])(
    'disables %s for every origin',
    feature => {
      const policies = header('Permissions-Policy')?.split(/,\s*/);
      expect(policies).toContain(`${feature}=()`);
    },
  );
});
