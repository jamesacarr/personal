import { Global } from '@emotion/react';
import { createRef, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';

import Contact from '../contact';
import Footer from '../footer';
import Header from '../header';

import { globalStyles } from './container.styles';

import type { FC } from 'react';

const Container: FC = () => {
  const scrollRef = createRef<HTMLElement>();

  const onClick = useCallback((): void => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollRef]);

  return (
    <>
      <Global styles={globalStyles} />

      <Header onClick={onClick} />

      <main>
        <Contact scrollRef={scrollRef} />
      </main>

      <Footer />
      <Toaster position="bottom-center" />
    </>
  );
};

export default Container;
