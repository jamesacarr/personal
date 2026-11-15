import type { FC } from 'react';

import { GITHUB_URL, LINKEDIN_URL } from '@/app/site';
import { Icon } from '@/components/icon';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@/components/icons';

import styles from './styles.module.css';

export const Footer: FC = () => (
  <div className={styles.wrapper}>
    <div>
      <Icon href={LINKEDIN_URL} label="LinkedIn">
        <LinkedInLogoIcon />
      </Icon>
      <Icon href={GITHUB_URL} label="GitHub">
        <GitHubLogoIcon />
      </Icon>
    </div>

    <span className={styles.copyright}>
      James Carr{' '}
      <span className={styles.highlight}>
        &copy; {new Date().getFullYear()}
      </span>
    </span>
  </div>
);
