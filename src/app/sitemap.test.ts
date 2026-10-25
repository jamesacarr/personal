import { describe, expect, it } from 'vitest';

import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists only the production home page', () => {
    expect(sitemap().map(({ url }) => url)).toEqual(['https://jamescarr.dev']);
  });
});
