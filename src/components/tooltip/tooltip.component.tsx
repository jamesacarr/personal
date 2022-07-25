import { tooltipStyles, tooltipContainerStyles } from './tooltip.styles';

import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
  message: string;
  isVisible?: boolean;
}

const Tooltip: FC<Props> = ({ children, message, isVisible = false }) => (
  <div css={tooltipContainerStyles}>
    {children}
    {isVisible && (
      <div className="tooltip" css={tooltipStyles}>
        {message}
      </div>
    )}
  </div>
);

export default Tooltip;
