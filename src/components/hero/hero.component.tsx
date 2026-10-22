import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import type { FC } from 'react';

import styles from './styles.module.css';

interface Props {
  onClick: () => void;
}

export const Hero: FC<Props> = ({ onClick }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.header}>
      <span className={styles.line}>
        Hello, I&apos;m <span className={styles.highlight}>James Carr</span>.
      </span>{' '}
      <span className={styles.line}>I&apos;m a full-stack web developer.</span>
    </h1>

    <button className={styles.button} onClick={onClick} type="button">
      Contact Me
      <ArrowRightIcon className={styles.icon} size="1.5rem" />
    </button>
  </div>
);
