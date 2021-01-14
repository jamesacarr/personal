import React, { FC } from 'react';
import { Global } from '@emotion/react';
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
