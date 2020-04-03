import { NextApiRequest } from 'next';
import { CSSObject, SerializedStyles } from '@emotion/core';

export interface FormValues {
  name: string;
  email: string;
  message: string;
  token: string;
}

export interface APIRequest extends NextApiRequest {
  body: FormValues;
}

export type APIResponseSuccess = {
  success: true;
};

export type APIResponseError = {
  success: false;
  error: {
    code: number;
    message: string;
  };
};

export type APIResponse = APIResponseSuccess | APIResponseError;

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

  spacing: {
    readonly small: string;
    readonly base: string;
    readonly large: string;
  };
}
