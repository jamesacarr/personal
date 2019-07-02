import { CSSFunc } from '../../types';

export const headerStyles: CSSFunc = ({ theme }) => ({
  color: theme.color.neutral900,

  h1: {
    borderBottom: `2px solid ${theme.color.neutral900}`,
    margin: '2rem auto',
    width: 'fit-content',
  },
});

export const svgStyles: CSSFunc = ({ theme }) => ({
  fill: theme.color.neutral000,
  stroke: theme.color.neutral000,
  height: 75,
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
});

export const wrapperStyles: CSSFunc = ({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.color.neutral300,
  color: theme.color.neutral100,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  position: 'relative',
});
