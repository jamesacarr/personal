import React, { FC } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? '');

const MyApp: FC<any> = ({ Component, pageProps }) => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    ReactGA.pageview(router.route);
  }

  return <Component {...pageProps} />;
};

export default MyApp;
