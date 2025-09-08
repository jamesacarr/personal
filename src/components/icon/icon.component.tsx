import type { FC } from 'react';

import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
  href: string;
  label: string;
}

export const Icon: FC<Props> = ({ children, href, label }) => {
  const title = `Visit my ${label} account`;

  return (
    <a
      aria-label={`Visit my ${label} account`}
      className={styles.wrapper}
      href={href}
      rel="noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </a>
  );
};
