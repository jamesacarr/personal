import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class HTTPError extends Error {
  protected static readonly STATUS_CODE: number = StatusCodes.INTERNAL_SERVER_ERROR;

  readonly status: number;
  readonly title: string;
  readonly type: string;
  readonly detail: string;

  constructor(message?: string) {
    super(message);

    this.status = (this.constructor as typeof HTTPError).STATUS_CODE;
    this.title = getReasonPhrase(this.status);
    this.type = `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${this.status}`;
    this.detail = this.message || this.title;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get isHttpError() {
    return true;
  }
}

export default HTTPError;
