import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import type { FC } from 'react';

import styles from './styles.module.css';

export const Hero: FC = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.header}>
      <span className={styles.line}>
        Hello, I&apos;m <span className={styles.highlight}>James Carr</span>.
      </span>{' '}
      <span className={styles.line}>I&apos;m a full-stack web developer.</span>
    </h1>

    <a className={styles.button} href="#contact">
      Contact Me
      <ArrowRightIcon className={styles.icon} size="1.5rem" />
    </a>
  </div>
);
