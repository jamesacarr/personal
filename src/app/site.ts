import type { Metadata } from 'next';

export const SITE_URL = 'https://jamescarr.dev';

export const SITE_NAME = 'James Carr';

export const SITE_DESCRIPTION = `Hello, I'm James Carr. I'm a full-stack web developer.`;

// Shared Open Graph fields. Routes that set their own `openGraph` replace the
// layout's object wholesale (metadata merges shallowly), so they spread this.
export const OPEN_GRAPH = {
  locale: 'en_AU',
  siteName: SITE_NAME,
  type: 'website',
} as const satisfies NonNullable<Metadata['openGraph']>;
