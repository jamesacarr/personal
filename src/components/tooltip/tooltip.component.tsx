import styles from './styles.module.css';

import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
  message: string;
  isVisible?: boolean;
}

export const Tooltip: FC<Props> = ({ children, message, isVisible = false }) => (
  <div className={styles.wrapper}>
    {children}
    {isVisible && <div className={styles.tooltip}>{message}</div>}
  </div>
);
