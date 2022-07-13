import ArrowRightIcon from 'mdi-react/ArrowRightIcon';

import { buttonStyles, iconStyles, textStyles, wrapperStyles } from './header.styles';

import type { FC } from 'react';

interface Props {
  onClick: () => void;
}

const Header: FC<Props> = ({ onClick }) => (
  <header css={wrapperStyles}>
    <div css={textStyles}>
      <h1>
        Hello, I&apos;m <span>James Carr</span>.
        <br />
        I&apos;m a full-stack web developer.
      </h1>
    </div>

    <div css={buttonStyles} onClick={onClick}>
      Contact Me
      <ArrowRightIcon css={iconStyles} size="1.5rem" />
    </div>
  </header>
);

export default Header;
