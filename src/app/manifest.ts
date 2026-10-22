import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  background_color: '#1f2933',
  description: `Hello, I'm James Carr. I'm a full-stack web developer.`,
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
  name: 'James Carr',
  short_name: 'James Carr',
  start_url: '/',
  theme_color: '#1f2933',
});

export default manifest;
