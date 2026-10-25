import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { FC, ReactNode } from 'react';

import './global.css';

import { OPEN_GRAPH, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site';

interface Props {
  children: ReactNode;
}

const raleway = localFont({
  display: 'swap',
  src: '../../node_modules/@fontsource/raleway/files/raleway-latin-400-normal.woff2',
  style: 'normal',
  variable: '--font-family',
  weight: '400',
});

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
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
  metadataBase: new URL(SITE_URL),
  openGraph: OPEN_GRAPH,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  twitter: { card: 'summary_large_image' },
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
