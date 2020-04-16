import { NOT_FOUND } from 'http-status-codes';
import HTTPError from './http-error';

class NotFoundError extends HTTPError {
  protected static readonly STATUS_CODE: number = NOT_FOUND;
}

export default NotFoundError;
