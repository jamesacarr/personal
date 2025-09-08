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
  title: {
    default: 'James Carr',
    template: '%s | James Carr',
  },
  description: `Hello, I'm James Carr. I'm a full-stack web developer.`,
  icons: [
    {
      url: '/icons/android-chrome-512x512.png',
      type: 'image/png',
      sizes: '512x512',
    },
    {
      url: '/icons/android-chrome-192x192.png',
      type: 'image/png',
      sizes: '192x192',
    },
    { url: '/icons/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    { url: '/icons/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    {
      url: '/icons/apple-touch-icon.png',
      type: 'image/png',
      sizes: '180x180',
      rel: 'apple-touch-icon',
    },
    { url: '/favicon.ico' },
  ],
  manifest: '/icons/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
};

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en-AU" className={raleway.className}>
    <body>{children}</body>
  </html>
);

export default RootLayout;
