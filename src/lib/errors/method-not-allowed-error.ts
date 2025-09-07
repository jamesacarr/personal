import { StatusCodes } from 'http-status-codes';

import { HTTPError } from './http-error';

export class MethodNotAllowedError extends HTTPError {
  protected static readonly STATUS_CODE: number =
    StatusCodes.METHOD_NOT_ALLOWED;
}
