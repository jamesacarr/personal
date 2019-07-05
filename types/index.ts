import { CSSObject, SerializedStyles } from '@emotion/core';

export interface FormValues {
  name?: string;
  email?: string;
  message?: string;
}

export interface CSSProps {
  theme: Theme;
}

export type CSSFunc = (props: CSSProps) => CSSObject | SerializedStyles;

export interface Theme {
  breakpoint: {
    readonly xlarge: string;
    readonly large: string;
    readonly medium: string;
    readonly small: string;
    readonly xsmall: string;
    readonly xxsmall: string;
  };

  color: {
    readonly [key: string]: string;
  };

  font: {
    readonly family: string;
  };
}
