import { CSSObject } from '@emotion/core';
import { OptionsObject } from 'notistack';

export interface FormValues {
  name?: string;
  email?: string;
  message?: string;
}

export interface CSSProps {
  theme: Theme;
}

export type CSSFunc = (props: CSSProps) => CSSObject;

export type EnqueueSnackbar = (
  message: string | React.ReactNode,
  options?: OptionsObject
) => OptionsObject['key'] | null;

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
}
