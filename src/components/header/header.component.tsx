import ArrowRightIcon from 'mdi-react/ArrowRightIcon';

import { buttonStyles, iconStyles, textStyles, wrapperStyles } from './header.styles';

import type { FC } from 'react';

interface Props {
  onClick: () => void;
}

const Header: FC<Props> = ({ onClick }) => (
  <section css={wrapperStyles}>
    <header css={textStyles}>
      <h1>
        Hello, I&apos;m <span>James Carr</span>.
      </h1>
      <h1>I&apos;m a full-stack web developer.</h1>
    </header>

    <div css={buttonStyles} onClick={onClick}>
      Contact Me
      <ArrowRightIcon css={iconStyles} size="1.5rem" />
    </div>
  </section>
);

export default Header;
