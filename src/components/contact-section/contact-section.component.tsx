import type { FC, RefObject } from 'react';
import { ContactForm } from '../contact-form';
import styles from './styles.module.css';

interface Props {
  scrollRef: RefObject<HTMLDivElement | null>;
}

export const ContactSection: FC<Props> = ({ scrollRef }) => (
  <div ref={scrollRef} className={styles.wrapper}>
    {/* biome-ignore lint/a11y/noSvgWithoutTitle: This isn't an actual image, it's decorative */}
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 100 102"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.arrow}
    >
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
