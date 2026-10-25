import type { FC } from 'react';

import { ArrowRightIcon } from '@/components/icons';

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
      <ArrowRightIcon className={styles.icon} />
    </a>
  </div>
);
