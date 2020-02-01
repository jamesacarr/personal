/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import { OutboundLink } from 'react-ga';

import { wrapperStyles } from './icon.styles';

interface Props {
  children: JSX.Element;
  href: string;
  label: string;
}

const Icon: FC<Props> = ({ children, href, label }) => (
  <OutboundLink css={wrapperStyles} eventLabel={label} to={href} aria-label={`Visit my ${label} account`}>
    {children}
  </OutboundLink>
);

export default Icon;
