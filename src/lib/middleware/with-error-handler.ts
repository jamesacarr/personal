import type { HTTPError } from '../errors';
import { InternalServerError } from '../errors';
import type { Middleware } from './types';

const isHttpError = (error: unknown): error is HTTPError =>
  typeof error === 'object' &&
  error !== null &&
  'isHttpError' in error &&
  Boolean(error.isHttpError);

export const withErrorHandler: Middleware = handler => async request => {
  try {
    return await handler(request);
  } catch (caughtError: unknown) {
    // biome-ignore lint/suspicious/noConsole: We want to log errors so they show up in Vercel
    console.error(caughtError);
    const httpError: HTTPError = isHttpError(caughtError)
      ? caughtError
      : new InternalServerError();
    const { detail, status, title, type } = httpError;

    return new Response(
      JSON.stringify({
        detail,
        instance: request.url,
        status,
        title,
        type,
      }),
      {
        headers: { 'Content-Type': 'application/problem+json; charset=utf-8' },
        status,
      },
    );
  }
};
