import { UNAUTHORIZED } from 'http-status-codes';
import HTTPError from './http-error';

class UnauthorizedError extends HTTPError {
  protected static readonly STATUS_CODE: number = UNAUTHORIZED;
}

export default UnauthorizedError;
