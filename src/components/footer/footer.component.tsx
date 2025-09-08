import GithubIcon from 'mdi-react/GithubIcon';
import LinkedinIcon from 'mdi-react/LinkedinIcon';
import type { FC } from 'react';

import { Icon } from '@/components/icon';

import styles from './styles.module.css';

export const Footer: FC = () => (
  <div className={styles.wrapper}>
    <div>
      <Icon href="https://www.linkedin.com/in/james-a-carr/" label="LinkedIn">
        <LinkedinIcon size="1.5rem" />
      </Icon>
      <Icon href="https://github.com/jamesacarr" label="GitHub">
        <GithubIcon size="1.5rem" />
      </Icon>
    </div>

    <span className={styles.copyright}>
      James Carr <span className={styles.highlight}>&copy; 2025</span>
    </span>
  </div>
);
