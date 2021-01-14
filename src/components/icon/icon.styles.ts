import { css } from '@emotion/react';

import theme from '../theme';

export const wrapperStyles = css`
  background: ${theme.color.neutral100};
  border: 1px solid ${theme.color.neutral600};
  border-radius: 4px;
  color: ${theme.color.neutral600};
  display: inline-flex;
  margin: ${theme.spacing.small};
  padding: ${theme.spacing.small};
  transition: all 0.3s;

  svg: {
    vertical-align: sub;
  }

  &:hover {
    background-color: ${theme.color.primary500};
    border-color: ${theme.color.primary500};
    color: ${theme.color.neutral900};
    cursor: pointer;
  }
`;
