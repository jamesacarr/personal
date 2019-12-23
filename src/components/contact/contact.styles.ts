import { CSSFunc } from '../../types';

export const headerStyles: CSSFunc = ({ theme }) => ({
  color: theme.color.neutral900,

  h1: {
    borderBottom: `2px solid ${theme.color.neutral900}`,
    margin: `${theme.spacing.large} auto`,
    width: 'fit-content',
  },
});

export const svgStyles: CSSFunc = ({ theme }) => ({
  fill: theme.color.neutral000,
  stroke: theme.color.neutral000,
  height: 75,
  width: '100%',
});

export const wrapperStyles: CSSFunc = ({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.color.neutral300,
  color: theme.color.neutral100,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'space-between',
  position: 'relative',
});
