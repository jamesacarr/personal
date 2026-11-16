import { describe, expect, it } from 'vitest';

import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists the production home and privacy pages', () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      'https://jamescarr.dev',
      'https://jamescarr.dev/privacy',
    ]);
  });
});
