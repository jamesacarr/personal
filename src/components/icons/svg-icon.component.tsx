import type { FC } from 'react';

export interface IconProps {
  className?: string;
}

interface Props extends IconProps {
  path: string;
}

// Decorative only: the surrounding link or button carries the accessible name
export const SvgIcon: FC<Props> = ({ className, path }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    focusable="false"
    height="1.5rem"
    viewBox="0 0 15 15"
    width="1.5rem"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path clipRule="evenodd" d={path} fillRule="evenodd" />
  </svg>
);
