import { css } from '@emotion/core';

import theme from '../theme';

export const fieldWrapperStyles = css`
  line-height: normal;
  position: relative;
  width: 100%;
`;

export const fieldStyles = css`
  appearance: none;
  background-color: ${theme.color.neutral000};
  border: 1px solid ${theme.color.neutral000};
  border-radius: 4px;
  color: ${theme.color.neutral900};
  font-family: ${theme.font.family};
  font-size: 1rem;
  margin: 0.1rem 0;
  min-width: inherit;
  outline: none;
  padding: ${theme.spacing.small} ${theme.spacing.base};
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${theme.color.primary500};
  }

  &::placeholder {
    color: ${theme.color.neutral600};
    font-family: ${theme.font.family};
  }

  &:not(input) {
    min-height: 6rem;
  }
`;

export const errorStyles = css`
  border: 1px solid ${theme.color.red400};
`;
