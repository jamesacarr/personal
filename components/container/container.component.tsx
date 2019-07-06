/** @jsx jsx */
import { createRef, FC } from 'react';
import { jsx, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';

import Contact from '../contact';
import Home from '../home';
import { globalStyles } from './container.styles';
import theme from './theme';

const Container: FC = () => {
  const contactRef = createRef<HTMLElement>();

  return (
    <>
      <Head>
        <title>James Carr</title>
        <meta name="description" content="Hello, I'm James Carr. I'm a full-stack web developer." />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,viewport-fit=cover" />
        <link rel="preload" href="/static/fonts/raleway-v13-latin-regular.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/static/fonts/raleway-v13-latin-regular.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/static/fonts/raleway-v13-latin-700.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/static/fonts/raleway-v13-latin-700.woff2" as="font" crossOrigin="" />
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
