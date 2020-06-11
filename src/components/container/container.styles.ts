import { css } from '@emotion/core';

import theme from '../theme';

export const globalStyles = css`
  /* Raleway-regular - latin */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: local('Raleway'), local('Raleway-Regular'), url('/fonts/raleway-v13-latin-regular.woff2') format('woff2'),
      url('/fonts/raleway-v13-latin-regular.woff') format('woff');
  }

  /* Raleway-700 - latin */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    src: local('Raleway Bold'), local('Raleway-Bold'), url('/fonts/raleway-v13-latin-700.woff2') format('woff2'),
      url('/fonts/raleway-v13-latin-700.woff') format('woff');
  }

  html {
    font-size: 12pt;

    ${theme.breakpoint.medium} {
      font-size: 14pt;
    }

    ${theme.breakpoint.xlarge} {
      font-size: 16pt;
    }
  }

  body {
    background-color: ${theme.color.neutral000};
    color: ${theme.color.neutral900};
    font-family: ${theme.font.family};
    font-size: 1rem;
    line-height: 1.65;
    margin: 0;
    min-height: 200vh;
    text-align: center;
  }

  h1,
  h2 {
    font-weight: 400;
    line-height: 1.5;
    margin: 0 0 ${theme.spacing.base} 0;
  }

  h1 {
    font-size: 2rem;
    line-height: 1.4;
  }

  h2 {
    font-size: 1.2rem;
    line-height: 1.3;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;
