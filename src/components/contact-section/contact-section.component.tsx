import { ContactForm } from '../contact-form';

import styles from './styles.module.css';

import type { FC, RefObject } from 'react';

interface Props {
  scrollRef: RefObject<HTMLDivElement>;
}

export const ContactSection: FC<Props> = ({ scrollRef }) => (
  <div ref={scrollRef} className={styles.wrapper}>
    <svg preserveAspectRatio="none" viewBox="0 0 100 102" xmlns="http://www.w3.org/2000/svg" className={styles.arrow}>
      <path d="M0 0 L50 100 L100 0 Z" />
    </svg>

    <div className={styles.content}>
      <header>
        <h2 className={styles.header}>CONTACT</h2>
        <h3>Have a question or just want to get in touch?</h3>
      </header>

      <ContactForm />
    </div>
  </div>
);
