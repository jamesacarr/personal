/** @jsx jsx */
import { jsx } from '@emotion/core';

import { wrapperStyles } from './icon.styles';

interface Props {
  children: JSX.Element;
  href: string;
}

const Icon = ({ children, href }: Props): JSX.Element => (
  <a css={wrapperStyles} href={href}>
    {children}
  </a>
);

export default Icon;
