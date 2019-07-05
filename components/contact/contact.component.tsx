/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC, RefObject } from 'react';

import Form from '../form/form.component';
import Footer from './footer.component';
import { headerStyles, svgStyles, wrapperStyles } from './contact.styles';

interface Props {
  scrollRef: RefObject<HTMLElement>;
}

const Contact: FC<Props> = ({ scrollRef }) => (
  <section ref={scrollRef} css={wrapperStyles}>
    <svg preserveAspectRatio="none" viewBox="0 0 100 102" xmlns="http://www.w3.org/2000/svg" css={svgStyles}>
      <path d="M0 0 L50 100 L100 0 Z" />
    </svg>

    <div css={headerStyles}>
      <h1>CONTACT</h1>
      <h2>Have a question or just want to get in touch?</h2>
    </div>

    <Form />

    <Footer />
  </section>
);

export default Contact;
