import type { MetadataRoute } from 'next';

import { SITE_DESCRIPTION, SITE_NAME } from './site';

const manifest = (): MetadataRoute.Manifest => ({
  background_color: '#1f2933',
  description: SITE_DESCRIPTION,
  display: 'standalone',
  icons: [
    {
      sizes: '192x192',
      src: '/icons/android-chrome-192x192.png',
      type: 'image/png',
    },
    {
      sizes: '512x512',
      src: '/icons/android-chrome-512x512.png',
      type: 'image/png',
    },
  ],
  name: SITE_NAME,
  short_name: SITE_NAME,
  start_url: '/',
  theme_color: '#1f2933',
});

export default manifest;
