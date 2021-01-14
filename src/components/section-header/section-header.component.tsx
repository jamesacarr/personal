/** @jsxImportSource @emotion/react */
/* eslint-disable react/react-in-jsx-scope */

import { FC } from 'react';

import { svgStyles } from './section-header.styles';

const SectionHeader: FC = () => (
  <svg preserveAspectRatio="none" viewBox="0 0 100 102" xmlns="http://www.w3.org/2000/svg" css={svgStyles}>
    <path d="M0 0 L50 100 L100 0 Z" />
  </svg>
);

export default SectionHeader;
