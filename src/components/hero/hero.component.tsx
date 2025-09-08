import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import type { FC } from 'react';

import styles from './styles.module.css';

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

    <button className={styles.button} onClick={onClick} type="button">
      Contact Me
      <ArrowRightIcon className={styles.icon} size="1.5rem" />
    </button>
  </div>
);
