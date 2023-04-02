import { StatusCodes } from 'http-status-codes';

import { HTTPError } from './http-error';

export class InternalServerError extends HTTPError {
  protected static readonly STATUS_CODE: number = StatusCodes.INTERNAL_SERVER_ERROR;
}
