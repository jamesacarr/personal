import { NextApiResponse, NextApiRequest } from 'next';

import { InternalServerError } from './errors';

type Handler = (request: NextApiRequest, response: NextApiResponse) => void | Promise<void>;

const withErrorHandler = (handler: Handler): Handler => async (request, response) => {
  try {
    return await handler(request, response);
  } catch (caughtError) {
    const httpError = caughtError.isHttpError ? caughtError : new InternalServerError();
    const { statusCode, error, message } = httpError;

    response.status(statusCode).json({
      success: false,
      error: {
        statusCode,
        error,
        message: message || error,
      },
    });
  }
};

export default withErrorHandler;
