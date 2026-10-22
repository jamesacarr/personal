import type { FC } from 'react';

import styles from './styles.module.css';

interface Props {
  id: string;
  message?: string;
}

export const FieldError: FC<Props> = ({ id, message }) => (
  <p className={styles.error} id={id}>
    {message}
  </p>
);
