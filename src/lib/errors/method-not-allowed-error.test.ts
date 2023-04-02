import { MethodNotAllowedError } from './method-not-allowed-error';

describe('MethodNotAllowedError', () => {
  describe('.constructor', () => {
    it('sets status code to 405', () => {
      const error = new MethodNotAllowedError();
      expect(error.status).toEqual(405);
    });

    it('sets type correctly', () => {
      const error = new MethodNotAllowedError();
      expect(error.type).toEqual('https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405');
    });

    it('sets title correctly', () => {
      const error = new MethodNotAllowedError();
      expect(error.title).toEqual('Method Not Allowed');
    });

    it('sets default detail when none supplied', () => {
      const error = new MethodNotAllowedError();
      expect(error.detail).toEqual('Method Not Allowed');
    });

    it('sets detail when provided', () => {
      const error = new MethodNotAllowedError('Testing');
      expect(error.detail).toEqual('Testing');
    });
  });

  describe('.isHttpError', () => {
    it('returns true', () => {
      const error = new MethodNotAllowedError();
      expect(error.isHttpError).toBeTruthy();
    });
  });
});
