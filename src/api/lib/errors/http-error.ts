import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class HTTPError extends Error {
  protected static readonly STATUS_CODE: number = StatusCodes.INTERNAL_SERVER_ERROR;
  readonly statusCode: number;
  readonly error: string;

  constructor(message?: string) {
    super(message);

    this.statusCode = (this.constructor as typeof HTTPError).STATUS_CODE;
    this.error = getReasonPhrase(this.statusCode);
    this.message = this.message || this.error;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get isHttpError() {
    return true;
  }
}

export default HTTPError;
