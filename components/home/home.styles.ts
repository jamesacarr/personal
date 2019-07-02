import { CSSFunc } from '../../types';

export const buttonStyles: CSSFunc = ({ theme }) => ({
  border: `2px solid ${theme.color.neutral900}`,
  borderRadius: '4px',
  marginTop: '2rem',
  padding: '0.5rem 1rem',
  transition: 'all .5s',

  '&:hover': {
    backgroundColor: theme.color.primary500,
    borderColor: theme.color.primary500,
    cursor: 'pointer',

    svg: {
      transform: 'rotate(90deg)',
    },
  },
});

export const iconStyles = {
  marginLeft: '0.5rem',
  transition: 'transform .5s',
  verticalAlign: 'sub',
};

export const textStyles: CSSFunc = ({ theme }) => ({
  h1: {
    margin: 0,
  },

  span: {
    color: theme.color.yellow500,
  },
});

export const wrapperStyles: CSSFunc = ({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.color.neutral000,
  color: theme.color.neutral900,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
});
