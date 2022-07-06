import { tooltipStyles, tooltipContainerStyles } from './tooltip.styles';

import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
  message: string;
  visible: boolean;
}

export const Tooltip: FC<Props> = ({ children, message, visible }) => (
  <div css={tooltipContainerStyles}>
    {children}
    {visible && (
      <div className="tooltip" css={tooltipStyles}>
        {message}
      </div>
    )}
  </div>
);

export default Tooltip;
