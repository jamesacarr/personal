import { css } from '@emotion/react';

import theme from '../theme';

export const buttonStyles = css`
  appearance: none;
  background-color: ${theme.color.neutral500};
  border: 0;
  border-radius: 4px;
  color: ${theme.color.neutral600};
  font-size: 1.2rem;
  margin: 0.1rem;
  padding: ${theme.spacing.small} ${theme.spacing.base};
  transition: all 0.3s;
  width: 100%;

  &:not(:disabled) {
    background-color: ${theme.color.neutral000};

    &:hover {
      background-color: ${theme.color.primary500};
      color: ${theme.color.neutral900};
      cursor: pointer;
    }
  }

  @keyframes color {
    0% {
      background-color: ${theme.color.primary500};
      border-color: ${theme.color.primary500};
    }
    50% {
      background-color: ${theme.color.primary300};
      border-color: ${theme.color.primary300};
    }
    100% {
      background-color: ${theme.color.primary500};
      border-color: ${theme.color.primary500};
    }
  }
`;

export const buttonStylesSubmitting = css`
  animation: color 1s ease-in-out infinite;
  background-color: ${theme.color.primary500};
  color: ${theme.color.neutral900};
`;

export const formStyles = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 40px auto 0 auto;
  min-width: 95%;

  ${theme.breakpoint.small} {
    min-width: 500px;
  }
`;
