import { NextApiRequest } from 'next';
import { Handler, APIResponse } from '../types';
import { HTTPError, InternalServerError } from './errors';

const isHttpError = (error: any): error is HTTPError => {
  return Boolean(error?.isHttpError);
};

const withErrorHandler = <T>(handler: Handler<T>) => async (request: NextApiRequest, response: APIResponse<T>) => {
  try {
    const data = await handler(request);
    response.status(200).json({ success: true, data });
  } catch (caughtError: unknown) {
    const httpError: HTTPError = isHttpError(caughtError) ? caughtError : new InternalServerError();
    const { statusCode, error, message } = httpError;

    response.status(statusCode).json({
      success: false,
      error: {
        statusCode,
        error,
        message,
      },
    });
  }
};

export default withErrorHandler;
