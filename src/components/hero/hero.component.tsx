import ArrowRightIcon from 'mdi-react/ArrowRightIcon';

import styles from './styles.module.css';

import type { FC } from 'react';

interface Props {
  onClick: () => void;
}

export const Hero: FC<Props> = ({ onClick }) => (
  <div className={styles.wrapper}>
    <div>
      <h1 className={styles.header}>
        Hello, I&apos;m <span className={styles.highlight}>James Carr</span>.
      </h1>
      <h1 className={styles.header}>I&apos;m a full-stack web developer.</h1>
    </div>

    <div className={styles.button} onClick={onClick}>
      Contact Me
      <ArrowRightIcon className={styles.icon} size="1.5rem" />
    </div>
  </div>
);
