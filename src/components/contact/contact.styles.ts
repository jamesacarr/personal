import { css } from '@emotion/react';

import theme from '../theme';

export const contentStyles = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-evenly;
`;

export const headerStyles = css`
  border-bottom: 2px solid ${theme.color.neutral900};
  margin: ${theme.spacing.large} auto;
  width: fit-content;
`;

export const wrapperStyles = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.neutral300};
  min-height: calc(100vh - 5rem);
  padding-bottom: ${theme.spacing.large};
  position: relative;
`;
