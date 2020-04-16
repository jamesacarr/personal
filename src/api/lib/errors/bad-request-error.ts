import { BAD_REQUEST } from 'http-status-codes';
import HTTPError from './http-error';

class BadRequestError extends HTTPError {
  protected static readonly STATUS_CODE: number = BAD_REQUEST;
}

export default BadRequestError;
