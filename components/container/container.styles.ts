import { CSSFunc } from '../../types';

export const globalStyles: CSSFunc = ({ theme }) => ({
  html: {
    fontSize: '8pt',

    [theme.breakpoint.xsmall]: {
      fontSize: '10pt',
    },

    [theme.breakpoint.small]: {
      fontSize: '11pt',
    },

    [theme.breakpoint.medium]: {
      fontSize: '12pt',
    },

    [theme.breakpoint.large]: {
      fontSize: '14pt',
    },

    [theme.breakpoint.xlarge]: {
      fontSize: '16pt',
    },
  },

  body: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.65,
    margin: 0,
    textAlign: 'center',
  },

  'h1, h2, h3, h4, h5, h6': {
    fontWeight: 400,
    lineHeight: 1.5,
    margin: `0 0 1rem 0`,
  },

  h1: {
    fontSize: '2rem',
    lineHeight: 1.3,
  },

  h2: {
    fontSize: '1.2rem',
    lineHeight: 1.4,
  },

  h3: {
    fontSize: '1rem',
  },

  h4: {
    fontSize: '0.8rem',
  },

  h5: {
    fontSize: '0.7rem',
  },

  h6: {
    fontSize: '0.6rem',
  },

  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
});
