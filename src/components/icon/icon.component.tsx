import { FC } from 'react';

import { wrapperStyles } from './icon.styles';

interface Props {
  href: string;
  label: string;
}

const Icon: FC<Props> = ({ children, href, label }) => (
  <a aria-label={`Visit my ${label} account`} css={wrapperStyles} href={href} rel="noreferrer" target="_blank">
    {children}
  </a>
);

export default Icon;
