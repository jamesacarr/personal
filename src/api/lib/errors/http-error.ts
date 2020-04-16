import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';

class HTTPError extends Error {
  protected static readonly STATUS_CODE: number = INTERNAL_SERVER_ERROR;
  readonly statusCode: number;
  readonly error: string;

  constructor(message?: string) {
    super(message);

    this.statusCode = (this.constructor as typeof HTTPError).STATUS_CODE;
    this.error = getStatusText(this.statusCode);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get isHttpError() {
    return true;
  }
}

export default HTTPError;
