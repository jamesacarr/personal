import { css } from '@emotion/core';

import { CSSFunc } from '../../types';

export const globalStyles: CSSFunc = ({ theme }) =>
  css(
    {
      /* Raleway-regular - latin */
      '@font-face': {
        fontFamily: "'Raleway'",
        fontStyle: 'normal',
        fontWeight: 400,
        src:
          "local('Raleway'), local('Raleway-Regular'), url('/fonts/raleway-v13-latin-regular.woff2') format('woff2'), url('/fonts/raleway-v13-latin-regular.woff') format('woff')",
      },
    },
    {
      /* Raleway-700 - latin */
      '@font-face': {
        fontFamily: "'Raleway'",
        fontStyle: 'normal',
        fontWeight: 700,
        src:
          "local('Raleway Bold'), local('Raleway-Bold'), url('/fonts/raleway-v13-latin-700.woff2') format('woff2'), url('/fonts/raleway-v13-latin-700.woff') format('woff')",
      },
    },
    {
      html: {
        fontSize: '12pt',

        [theme.breakpoint.medium]: {
          fontSize: '14pt',
        },

        [theme.breakpoint.xlarge]: {
          fontSize: '16pt',
        },
      },

      body: {
        backgroundColor: theme.color.neutral000,
        fontFamily: theme.font.family,
        fontSize: '1rem',
        lineHeight: 1.65,
        margin: 0,
        textAlign: 'center',
      },

      'h1, h2': {
        fontWeight: 400,
        lineHeight: 1.5,
        margin: `0 0 ${theme.spacing.base} 0`,
      },

      h1: {
        fontSize: '2rem',
        lineHeight: 1.3,
      },

      h2: {
        fontSize: '1.2rem',
        lineHeight: 1.4,
      },

      '*, *:before, *:after': {
        boxSizing: 'border-box',
      },
    }
  );
