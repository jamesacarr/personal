import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { VFC } from 'react';
import { initialize, pageview } from 'react-ga';

initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? '');

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    pageview(router.route);
  }

  return (
    <>
      <Head>
        <title>James Carr</title>
        <meta name="description" content="Hello, I'm James Carr. I'm a full-stack web developer." />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,viewport-fit=cover" />

        <link rel="preload" href="/fonts/raleway-v13-latin-regular.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/raleway-v13-latin-regular.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/raleway-v13-latin-700.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/raleway-v13-latin-700.woff2" as="font" crossOrigin="" />

        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
