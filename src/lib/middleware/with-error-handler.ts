import { InternalServerError } from '../errors';

import type { Middleware } from './types';
import type { HTTPError } from '../errors';

const isHttpError = (error: any): error is HTTPError => Boolean(error?.isHttpError);

export const withErrorHandler: Middleware = handler => async request => {
  try {
    return await handler(request);
  } catch (caughtError: unknown) {
    console.error(caughtError);
    const httpError: HTTPError = isHttpError(caughtError) ? caughtError : new InternalServerError();
    const { detail, status, title, type } = httpError;

    return new Response(
      JSON.stringify({
        detail,
        status,
        title,
        type,
        instance: request.url,
      }),
      {
        status,
        headers: { 'Content-Type': 'application/problem+json; charset=utf-8' },
      }
    );
  }
};
