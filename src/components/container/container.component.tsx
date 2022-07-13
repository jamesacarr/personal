import { Global } from '@emotion/react';
import { Toaster } from 'react-hot-toast';

import Footer from '../footer';

import { globalStyles } from './container.styles';

import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => (
  <>
    <Global styles={globalStyles} />

    <main>{children}</main>

    <Footer />
    <Toaster position="bottom-center" />
  </>
);

export default Container;
