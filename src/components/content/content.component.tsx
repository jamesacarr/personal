'use client';

import type { FC } from 'react';
import { createRef, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import { ContactSection } from '../contact-section';
import { Hero } from '../hero';

export const Content: FC = () => {
  const scrollRef = createRef<HTMLDivElement>();

  const onClick = useCallback(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollRef]);

  return (
    <>
      <section>
        <Hero onClick={onClick} />
      </section>

      <section>
        <ContactSection scrollRef={scrollRef} />
      </section>

      <Toaster position="bottom-center" />
    </>
  );
};
