import Form from '../form';
import SectionHeader from '../section-header';

import { contentStyles, headerStyles, wrapperStyles } from './contact.styles';

import type { FC, RefObject } from 'react';

interface Props {
  scrollRef: RefObject<HTMLElement>;
}

const Contact: FC<Props> = ({ scrollRef }) => (
  <section ref={scrollRef} css={wrapperStyles}>
    <SectionHeader />

    <div css={contentStyles}>
      <header>
        <h1 css={headerStyles}>CONTACT</h1>
        <h2>Have a question or just want to get in touch?</h2>
      </header>

      <Form />
    </div>
  </section>
);

export default Contact;
