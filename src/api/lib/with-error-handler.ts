import { APIRequest, APIResponse, Handler } from '../types';
import { HTTPError, InternalServerError } from './errors';

type ErrorHandler<Request = any, Response = any> = (
  handler: Handler<Request, Response>
) => (request: APIRequest<Request>, response: APIResponse<Response>) => Promise<void>;

const withErrorHandler: ErrorHandler = (handler) => async (request, response) => {
  try {
    const data = await handler(request);
    response.status(200).json({ success: true, data });
  } catch (caughtError) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const httpError: HTTPError = caughtError.isHttpError ? caughtError : new InternalServerError();
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
