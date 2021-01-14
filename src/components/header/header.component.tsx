/** @jsxImportSource @emotion/react */
/* eslint-disable react/react-in-jsx-scope */

import { FC, RefObject } from 'react';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import ReactGA from 'react-ga';

import { buttonStyles, iconStyles, textStyles, wrapperStyles } from './header.styles';

interface Props {
  contactRef: RefObject<HTMLElement>;
}

const Home: FC<Props> = ({ contactRef }) => {
  const onClick = (): void => {
    if (contactRef?.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
      ReactGA.event({ category: 'navigation', action: 'click', label: 'Scroll' });
    }
  };

  return (
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
};

export default Home;
