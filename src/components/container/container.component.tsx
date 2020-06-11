/** @jsx jsx */
import { FC } from 'react';
import { jsx, Global } from '@emotion/core';
import { SnackbarProvider } from 'notistack';

import Footer from '../footer';
import { globalStyles } from './container.styles';

const Container: FC = ({ children }) => {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Global styles={globalStyles} />

      <main>{children}</main>

      <Footer />
    </SnackbarProvider>
  );
};

export default Container;
