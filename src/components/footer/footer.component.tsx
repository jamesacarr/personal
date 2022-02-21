import GithubIcon from 'mdi-react/GithubIcon';
import LinkedinIcon from 'mdi-react/LinkedinIcon';
import { VFC } from 'react';

import Icon from '../icon';

import { copyrightStyles, footerStyles } from './footer.styles';

const Footer: VFC = () => (
  <footer css={footerStyles}>
    <div>
      <Icon href="https://www.linkedin.com/in/james-a-carr/" label="LinkedIn">
        <LinkedinIcon size="1.5rem" />
      </Icon>
      <Icon href="https://github.com/jamesacarr" label="GitHub">
        <GithubIcon size="1.5rem" />
      </Icon>
    </div>

    <span css={copyrightStyles}>
      James Carr <span>&copy; 2022</span>
    </span>
  </footer>
);

export default Footer;
