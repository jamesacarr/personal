import { getScriptNonceFromHeader } from 'next/dist/server/app-render/get-script-nonce-from-header';
import { describe, expect, it } from 'vitest';

import { buildCsp } from './csp';

const NONCE = 'MTIzNGFiY2QtZWY=';

const directives = (policy: string) =>
  policy.split(';').map(directive => directive.trim());

const directive = (policy: string, name: string) =>
  directives(policy).find(entry => entry.split(/\s+/)[0] === name);

describe('buildCsp', () => {
  describe('in production', () => {
    const policy = buildCsp(NONCE, false);

    it('allows scripts only from the nonce and scripts they load', () => {
      expect(directive(policy, 'script-src')).toBe(
        `script-src 'self' 'nonce-${NONCE}' 'strict-dynamic'`,
      );
    });

    it('allows style elements only from the site or the nonce', () => {
      expect(directive(policy, 'style-src-elem')).toBe(
        `style-src-elem 'self' 'nonce-${NONCE}'`,
      );
    });

    it('allows inline style attributes', () => {
      expect(directive(policy, 'style-src-attr')).toBe(
        "style-src-attr 'unsafe-inline'",
      );
    });

    it('blocks framing by any origin', () => {
      expect(directive(policy, 'frame-ancestors')).toBe(
        "frame-ancestors 'none'",
      );
    });

    it('blocks plugins', () => {
      expect(directive(policy, 'object-src')).toBe("object-src 'none'");
    });

    it('never allows eval', () => {
      expect(policy).not.toContain("'unsafe-eval'");
    });

    it('allows unsafe-inline only for style attributes', () => {
      const unsafeInline = directives(policy).filter(entry =>
        entry.includes("'unsafe-inline'"),
      );
      expect(unsafeInline).toEqual(["style-src-attr 'unsafe-inline'"]);
    });

    it('exposes the nonce where Next.js looks for it', () => {
      expect(getScriptNonceFromHeader(policy)).toBe(NONCE);
    });
  });

  describe('in development', () => {
    const policy = buildCsp(NONCE, true);

    it('allows eval for React dev tooling', () => {
      expect(directive(policy, 'script-src')).toBe(
        `script-src 'self' 'nonce-${NONCE}' 'strict-dynamic' 'unsafe-eval'`,
      );
    });

    it('allows inline style elements without a nonce for the dev overlay', () => {
      expect(directive(policy, 'style-src-elem')).toBe(
        "style-src-elem 'self' 'unsafe-inline'",
      );
    });

    it('still exposes the nonce where Next.js looks for it', () => {
      expect(getScriptNonceFromHeader(policy)).toBe(NONCE);
    });
  });

  it('returns the policy as a single header line', () => {
    expect(buildCsp(NONCE, false)).not.toMatch(/[\r\n]/);
  });

  it('lists the directives in a stable order', () => {
    const names = directives(buildCsp(NONCE, false)).map(
      entry => entry.split(/\s+/)[0],
    );
    expect(names).toEqual([
      'default-src',
      'script-src',
      'style-src-elem',
      'style-src-attr',
      'img-src',
      'font-src',
      'connect-src',
      'object-src',
      'base-uri',
      'form-action',
      'frame-ancestors',
      'upgrade-insecure-requests',
    ]);
  });
});
