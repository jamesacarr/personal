/** @jsx jsx */
import { jsx } from '@emotion/core';
import { RefObject } from 'react';

import Form from '../form/form.component';
import Footer from './footer.component';
import { headerStyles, svgStyles, wrapperStyles } from './contact.styles';

interface Props {
  scrollRef: RefObject<HTMLElement>;
}

const Contact = ({ scrollRef }: Props): JSX.Element => (
  <section ref={scrollRef} css={wrapperStyles}>
    <svg preserveAspectRatio="none" viewBox="0 0 100 102" xmlns="http://www.w3.org/2000/svg" css={svgStyles}>
      <path d="M0 0 L50 100 L100 0 Z" />
    </svg>

    <div css={headerStyles}>
      <h1>CONTACT</h1>
      <h3>Have a question or want to work together?</h3>
    </div>

    <Form />

    <Footer />
  </section>
);

export default Contact;
