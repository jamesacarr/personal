/** @jsx jsx */
import { createRef, FC } from 'react';
import { jsx, Global } from '@emotion/core';
import { SnackbarProvider } from 'notistack';

import Contact from '../contact';
import Home from '../home';
import { globalStyles } from './container.styles';

const Container: FC = () => {
  const contactRef = createRef<HTMLElement>();

  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <>
        <Global styles={globalStyles} />

        <main>
          <Home contactRef={contactRef} />
          <Contact scrollRef={contactRef} />
        </main>
      </>
    </SnackbarProvider>
  );
};

export default Container;
