import { css } from '@emotion/react';

import theme from '../theme';

export const buttonStyles = css`
  border: 2px solid ${theme.color.neutral900};
  border-radius: 4px;
  font-size: 1.2rem;
  margin-top: ${theme.spacing.large};
  padding: ${theme.spacing.small} ${theme.spacing.base};
  transition: all 0.3s;

  &:hover {
    background-color: ${theme.color.primary500};
    border-color: ${theme.color.primary500};
    cursor: pointer;

    svg {
      transform: rotate(90deg);
    }
  }
`;

export const iconStyles = css`
  margin-left: ${theme.spacing.small};
  transition: transform 0.3s;
  vertical-align: sub;
`;

export const textStyles = css`
  h1 {
    margin: 0;
  }

  span {
    color: ${theme.color.yellow500};
  }
`;

export const wrapperStyles = css`
  align-items: center;
  background-color: ${theme.color.neutral000};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;
