import { NextApiRequest, NextApiResponse } from 'next';

import { ContactRequestBody as _ContactRequestBody, ContactResponseBody as _ContactResponseBody } from './contact';

export type ContactRequestBody = _ContactRequestBody;
export type ContactResponseBody = _ContactResponseBody;

export type ErrorResponseBody = {
  success: false;
  error: {
    statusCode: number;
    error: string;
    message: string;
  };
};

export type SuccessResponseBody<T> = {
  success: true;
  data: T;
};

export type ResponseBody<T> = SuccessResponseBody<T> | ErrorResponseBody;

export interface APIRequest<T = any> extends NextApiRequest {
  body: T;
}

export type APIResponse<T = any> = NextApiResponse<ResponseBody<T>>;

export type Handler<Request, Response> = (request: APIRequest<Request>) => Response | Promise<Response>;
