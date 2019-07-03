/** @jsx jsx */
import { jsx } from '@emotion/core';

import { wrapperStyles } from './icon.styles';

interface Props {
  children: JSX.Element;
  href: string;
  label: string;
}

const Icon = ({ children, href, label }: Props): JSX.Element => (
  <a css={wrapperStyles} href={href} aria-label={`Visit my ${label} account`}>
    {children}
  </a>
);

export default Icon;
