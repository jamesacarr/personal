import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';

class HTTPError extends Error {
  protected static readonly STATUS_CODE: number = INTERNAL_SERVER_ERROR;
  readonly statusCode: number;
  readonly error: string;
  readonly isHttpError = true;

  constructor(message?: string) {
    super(message);

    this.statusCode = (this.constructor as typeof HTTPError).STATUS_CODE;
    this.error = getStatusText(this.statusCode);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default HTTPError;
