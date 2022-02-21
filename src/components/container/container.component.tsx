import { Global } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';

import Footer from '../footer';

import { globalStyles } from './container.styles';

const Container: FC = ({ children }) => (
  <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
    <Global styles={globalStyles} />

    <main>{children}</main>

    <Footer />
  </SnackbarProvider>
);

export default Container;
