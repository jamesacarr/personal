import { css, SerializedStyles } from '@emotion/core';
import { CSSFunc, CSSProps } from '../../types';

type ButtonStyle = (submitting?: boolean) => (props: CSSProps) => SerializedStyles;
export const buttonStyles: ButtonStyle = submitting => ({ theme }) =>
  css(
    {
      backgroundColor: theme.color.neutral000,
      border: 0,
      borderRadius: '4px',
      color: theme.color.neutral600,
      fontSize: '1rem',
      margin: '0.1rem',
      padding: '0.5rem 1rem',
      transition: 'all .3s',
      width: '100%',

      '&:hover': {
        backgroundColor: theme.color.primary500,
        borderColor: theme.color.primary500,
        color: theme.color.neutral900,
        cursor: 'pointer',
      },
    },
    submitting && {
      animationName: 'color',
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in',
      backgroundColor: theme.color.primary500,
      borderColor: theme.color.primary500,
      color: theme.color.neutral900,

      '@keyframes color': {
        '0%': {
          backgroundColor: theme.color.primary500,
          borderColor: theme.color.primary500,
        },
        '50%': {
          backgroundColor: theme.color.primary200,
          borderColor: theme.color.primary200,
        },
        '100': {
          backgroundColor: theme.color.primary500,
          borderColor: theme.color.primary500,
        },
      },
    }
  );

export const formStyles: CSSFunc = ({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '40px auto 0 auto',
  minWidth: '95%',

  [theme.breakpoint.small]: {
    minWidth: '500px',
  },
});

type InputStyle = (error?: boolean) => CSSFunc;
export const inputStyles: InputStyle = error => ({ theme }) => ({
  backgroundColor: theme.color.neutral000,
  border: `1px solid ${error ? theme.color.red400 : theme.color.neutral000}`,
  borderRadius: '4px',
  color: theme.color.neutral900,
  fontSize: '0.8rem',
  margin: '0.1rem',
  minWidth: 'inherit',
  outline: 'none',
  padding: '0.5rem 1rem',
  width: '100%',
  transition: 'border-color .3s',

  '&:focus': {
    borderColor: theme.color.primary500,
  },

  '&::placeholder': {
    color: theme.color.neutral600,
  },

  '&:not(input)': {
    minHeight: '6rem',
  },
});
