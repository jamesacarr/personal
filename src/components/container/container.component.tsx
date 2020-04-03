/** @jsx jsx */
import { createRef, FC } from 'react';
import { jsx, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { SnackbarProvider } from 'notistack';

import { getRecaptchaToken } from '../../utils';
import Contact from '../contact';
import Home from '../home';
import { globalStyles } from './container.styles';
import theme from './theme';

const Container: FC = () => {
  const contactRef = createRef<HTMLElement>();
  getRecaptchaToken('homepage');

  return (
    <ThemeProvider theme={{ theme }}>
      <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <>
          <Global styles={globalStyles} />

          <main>
            <Home contactRef={contactRef} />
            <Contact scrollRef={contactRef} />
          </main>
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Container;
