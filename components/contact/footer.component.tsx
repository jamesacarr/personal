/** @jsx jsx */
import { jsx } from '@emotion/core';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import LinkedinIcon from 'mdi-react/LinkedinIcon';
import { FC } from 'react';

import { copyrightStyles, footerStyles } from './footer.styles';
import Icon from './icon.component';

const Footer: FC = () => (
  <footer css={footerStyles}>
    <div>
      <Icon href="https://www.linkedin.com/in/james-a-carr/" label="LinkedIn">
        <LinkedinIcon size="1.5rem" />
      </Icon>
      <Icon href="https://github.com/jamesacarr" label="GitHub">
        <GithubCircleIcon size="1.5rem" />
      </Icon>
    </div>

    <h4 css={copyrightStyles}>
      James Carr <span>&copy; 2019</span>
    </h4>
  </footer>
);

export default Footer;
