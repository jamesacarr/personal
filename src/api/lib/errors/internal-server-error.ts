import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import HTTPError from './http-error';

class InternalServerError extends HTTPError {
  protected static readonly STATUS_CODE: number = INTERNAL_SERVER_ERROR;
}

export default InternalServerError;
