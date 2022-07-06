import { Global } from '@emotion/react';
import { SnackbarProvider } from 'notistack';

import Footer from '../footer';

import { globalStyles } from './container.styles';

import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => (
  <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
    <Global styles={globalStyles} />

    <main>{children}</main>

    <Footer />
  </SnackbarProvider>
);

export default Container;
