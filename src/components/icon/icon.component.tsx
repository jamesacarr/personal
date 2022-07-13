import { wrapperStyles } from './icon.styles';

import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
  href: string;
  label: string;
}

const Icon: FC<Props> = ({ children, href, label }) => {
  const title = `Visit my ${label} account`;

  return (
    <a
      aria-label={`Visit my ${label} account`}
      css={wrapperStyles}
      href={href}
      rel="noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </a>
  );
};

export default Icon;
