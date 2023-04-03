import GithubIcon from 'mdi-react/GithubIcon';
import LinkedinIcon from 'mdi-react/LinkedinIcon';

import { Icon } from '../icon';

import styles from './styles.module.css';

import type { FC } from 'react';

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
      James Carr <span className={styles.highlight}>&copy; 2023</span>
    </span>
  </div>
);
