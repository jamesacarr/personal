import { HTTPError } from './http-error';

describe('HTTPError', () => {
  describe('.constructor', () => {
    it('sets status code to 500', () => {
      const error = new HTTPError();
      expect(error.status).toEqual(500);
    });

    it('sets type correctly', () => {
      const error = new HTTPError();
      expect(error.type).toEqual('https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500');
    });

    it('sets title correctly', () => {
      const error = new HTTPError();
      expect(error.title).toEqual('Internal Server Error');
    });

    it('sets default detail when none supplied', () => {
      const error = new HTTPError();
      expect(error.detail).toEqual('Internal Server Error');
    });

    it('sets detail when provided', () => {
      const error = new HTTPError('Testing');
      expect(error.detail).toEqual('Testing');
    });
  });

  describe('.isHttpError', () => {
    it('returns true', () => {
      const error = new HTTPError();
      expect(error.isHttpError).toBeTruthy();
    });
  });
});
