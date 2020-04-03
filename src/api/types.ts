import { NextApiResponse, NextApiRequest } from 'next';

export interface APIRequestBody {
  token: string;
}

export interface APIRequest extends NextApiRequest {
  body: {
    token: string;
  };
}

export interface ErrorBody {
  success: false;
  error: {
    code: number;
    message: string;
  };
}

export type ErrorResponse = NextApiResponse<ErrorBody>;
