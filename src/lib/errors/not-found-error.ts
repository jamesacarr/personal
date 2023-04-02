import { StatusCodes } from 'http-status-codes';

import { HTTPError } from './http-error';

export class NotFoundError extends HTTPError {
  protected static readonly STATUS_CODE: number = StatusCodes.NOT_FOUND;
}
