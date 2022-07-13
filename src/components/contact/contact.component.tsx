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
        <h2 css={headerStyles}>CONTACT</h2>
        <h3>Have a question or just want to get in touch?</h3>
      </header>

      <Form />
    </div>
  </section>
);

export default Contact;
