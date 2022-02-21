import { StatusCodes } from 'http-status-codes';

import HTTPError from './http-error';

class BadRequestError extends HTTPError {
  protected static readonly STATUS_CODE: number = StatusCodes.BAD_REQUEST;
}

export default BadRequestError;
