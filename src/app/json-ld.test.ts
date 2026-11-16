import { describe, expect, it } from 'vitest';

import { serialiseJsonLd } from './json-ld';

describe('serialiseJsonLd', () => {
  const data = { name: '</script><script>alert(1)</script>' };

  it('leaves no "<" character in the output', () => {
    expect(serialiseJsonLd(data)).not.toContain('<');
  });

  it('writes each "<" as its unicode escape', () => {
    expect(serialiseJsonLd({ name: 'a<b' })).toBe('{"name":"a\\u003cb"}');
  });

  it('round-trips to the original value through JSON.parse', () => {
    expect(JSON.parse(serialiseJsonLd(data))).toEqual(data);
  });
});
