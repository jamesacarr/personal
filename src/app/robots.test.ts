import { describe, expect, it } from 'vitest';

import robots from './robots';

describe('robots', () => {
  it('allows every crawler to index the whole site', () => {
    const rules = [robots().rules].flat();
    expect(rules).toEqual([{ allow: '/', userAgent: '*' }]);
  });

  it('points crawlers at the production sitemap', () => {
    expect(robots().sitemap).toEqual('https://jamescarr.dev/sitemap.xml');
  });
});
