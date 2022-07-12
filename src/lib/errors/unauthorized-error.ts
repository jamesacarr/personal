import { StatusCodes } from 'http-status-codes';

import HTTPError from './http-error';

class UnauthorizedError extends HTTPError {
  protected static readonly STATUS_CODE: number = StatusCodes.UNAUTHORIZED;
}

export default UnauthorizedError;
