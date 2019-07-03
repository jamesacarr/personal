/** @jsx jsx */
import { createRef } from 'react';
import { jsx, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';

import Contact from '../contact';
import Home from '../home';
import { globalStyles } from './container.styles';
import theme from './theme';

const Container = (): JSX.Element => {
  const contactRef = createRef<HTMLElement>();

  return (
    <>
      <Head>
        <title>James Carr</title>
        <meta name="description" content="Hello, I'm James Carr. I'm a full-stack web developer." />
        <link as="font" href="/static/fonts/raleway-v13-latin-regular.woff" rel="preload" crossOrigin="" />
        <link as="font" href="/static/fonts/raleway-v13-latin-regular.woff2" rel="preload" crossOrigin="" />
        <link as="font" href="/static/fonts/raleway-v13-latin-700.woff" rel="preload" crossOrigin="" />
        <link as="font" href="/static/fonts/raleway-v13-latin-700.woff2" rel="preload" crossOrigin="" />
      </Head>

      <ThemeProvider theme={{ theme }}>
        <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Global styles={globalStyles} />

          <main>
            <Home contactRef={contactRef} />
            {/* <About /> */}
            <Contact scrollRef={contactRef} />
          </main>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default Container;
