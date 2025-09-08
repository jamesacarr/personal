import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';
import type { FC, ReactNode } from 'react';

// eslint-disable-next-line import/no-unassigned-import
import './global.css';

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line new-cap
const raleway = Raleway({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-family',
});

export const metadata: Metadata = {
  description: `Hello, I'm James Carr. I'm a full-stack web developer.`,
  icons: [
    {
      sizes: '512x512',
      type: 'image/png',
      url: '/icons/android-chrome-512x512.png',
    },
    {
      sizes: '192x192',
      type: 'image/png',
      url: '/icons/android-chrome-192x192.png',
    },
    { sizes: '32x32', type: 'image/png', url: '/icons/favicon-32x32.png' },
    { sizes: '16x16', type: 'image/png', url: '/icons/favicon-16x16.png' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      type: 'image/png',
      url: '/icons/apple-touch-icon.png',
    },
    { url: '/favicon.ico' },
  ],
  manifest: '/icons/site.webmanifest',
  title: {
    default: 'James Carr',
    template: '%s | James Carr',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
  width: 'device-width',
};

const RootLayout: FC<Props> = ({ children }) => (
  <html className={raleway.className} lang="en-AU">
    <body>{children}</body>
  </html>
);

export default RootLayout;
