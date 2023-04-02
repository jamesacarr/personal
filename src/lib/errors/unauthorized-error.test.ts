import { UnauthorizedError } from './unauthorized-error';

describe('UnauthorizedError', () => {
  describe('.constructor', () => {
    it('sets status code to 401', () => {
      const error = new UnauthorizedError();
      expect(error.status).toEqual(401);
    });

    it('sets type correctly', () => {
      const error = new UnauthorizedError();
      expect(error.type).toEqual('https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401');
    });

    it('sets title correctly', () => {
      const error = new UnauthorizedError();
      expect(error.title).toEqual('Unauthorized');
    });

    it('sets default detail when none supplied', () => {
      const error = new UnauthorizedError();
      expect(error.detail).toEqual('Unauthorized');
    });

    it('sets detail when provided', () => {
      const error = new UnauthorizedError('Testing');
      expect(error.detail).toEqual('Testing');
    });
  });

  describe('.isHttpError', () => {
    it('returns true', () => {
      const error = new UnauthorizedError();
      expect(error.isHttpError).toBeTruthy();
    });
  });
});
