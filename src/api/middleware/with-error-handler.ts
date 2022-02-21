import { HTTPError, InternalServerError } from '../lib/errors';
import type { Middleware } from '../types';

export interface ErrorResponseBody {
  error: {
    statusCode: number;
    error: string;
    message: string;
  };
}

const isHttpError = (error: any): error is HTTPError => Boolean(error?.isHttpError);

const withErrorHandler: Middleware<ErrorResponseBody> = handler => async (request, response) => {
  try {
    await handler(request, response);
    return;
  } catch (caughtError: unknown) {
    // Get error information
    const httpError: HTTPError = isHttpError(caughtError) ? caughtError : new InternalServerError();
    const { statusCode, error, message } = httpError;

    // Send response to client
    response.status(statusCode).json({
      error: {
        statusCode,
        error,
        message,
      },
    });
  }
};

export default withErrorHandler;
