import { css } from '@emotion/core';

import theme from '../theme';

export const copyrightStyles = css`
  color: ${theme.color.neutral600};
  font-size: 0.8rem;
  margin: 0;
  text-transform: uppercase;

  span {
    color: ${theme.color.yellow500};
  }
`;

export const footerStyles = css`
  align-items: center;
  background-color: ${theme.color.neutral000};
  display: flex;
  flex-direction: column;
  height: 5rem;
  justify-content: space-around;
  margin-top: ${theme.spacing.large};
  width: 100%;
`;
