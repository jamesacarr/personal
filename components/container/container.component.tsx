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
        <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" />
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
