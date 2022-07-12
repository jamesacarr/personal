import { HTTPError, InternalServerError } from '../errors';

import type { ErrorResponseBody, Middleware } from './types';

const isHttpError = (error: any): error is HTTPError => Boolean(error?.isHttpError);

const withErrorHandler: Middleware<ErrorResponseBody> = handler => async (request, response) => {
  try {
    await handler(request, response);
    return;
  } catch (caughtError: unknown) {
    console.error(caughtError);
    const httpError: HTTPError = isHttpError(caughtError) ? caughtError : new InternalServerError();
    const { detail, status, title, type } = httpError;

    // Need to use `send` here so that we can set a custom header for Content-Type.
    // Using `json` will set it to `application/json`, whereas we want to use
    // `application/problem+json` to match RFC7807.
    response.status(status).setHeader('Content-Type', 'application/problem+json; charset=utf-8').send({
      detail,
      status,
      title,
      type,
      instance: request.url,
    });
  }
};

export default withErrorHandler;
