import { css } from '@emotion/core';

import theme from '../theme';

export const headerStyles = css`
  color: ${theme.color.neutral900};

  h1 {
    border-bottom: 2px solid ${theme.color.neutral900};
    margin: ${theme.spacing.large} auto;
    width: fit-content;
  }
`;

export const svgStyles = css`
  fill: ${theme.color.neutral000};
  stroke: ${theme.color.neutral000};
  height: 75px;
  width: 100%;
`;

export const wrapperStyles = css`
  align-items: center;
  background-color: ${theme.color.neutral300};
  color: ${theme.color.neutral100};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  position: relative;
`;
