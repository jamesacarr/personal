import { css } from '@emotion/core';

import theme from '../theme';

export const tooltipStyles = css`
  background-color: ${theme.color.neutral100};
  border-radius: 4px;
  color: ${theme.color.neutral900};
  font-size: 0.8rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.1rem;
  padding: 2px 5px;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  width: fit-content;
  z-index: 1;

  &:after {
    background-color: ${theme.color.neutral100};
    position: absolute;
    content: '';
    bottom: 100%;
    left: 50%;
    height: 5px;
    width: 5px;
    transform: translate(-50%, 50%) rotate(45deg);
  }
`;

export const tooltipContainerStyles = css`
  .tooltip {
    display: none;
  }

  &:hover,
  &:focus-within {
    .tooltip {
      display: unset;
    }
  }
`;
