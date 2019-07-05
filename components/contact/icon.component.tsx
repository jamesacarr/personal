/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';

import { wrapperStyles } from './icon.styles';

interface Props {
  children: JSX.Element;
  href: string;
  label: string;
}

const Icon: FC<Props> = ({ children, href, label }) => (
  <a css={wrapperStyles} href={href} aria-label={`Visit my ${label} account`}>
    {children}
  </a>
);

export default Icon;
