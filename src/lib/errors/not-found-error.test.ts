import { NotFoundError } from './not-found-error';

describe('NotFoundError', () => {
  describe('.constructor', () => {
    it('sets status code to 404', () => {
      const error = new NotFoundError();
      expect(error.status).toEqual(404);
    });

    it('sets type correctly', () => {
      const error = new NotFoundError();
      expect(error.type).toEqual('https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404');
    });

    it('sets title correctly', () => {
      const error = new NotFoundError();
      expect(error.title).toEqual('Not Found');
    });

    it('sets default detail when none supplied', () => {
      const error = new NotFoundError();
      expect(error.detail).toEqual('Not Found');
    });

    it('sets detail when provided', () => {
      const error = new NotFoundError('Testing');
      expect(error.detail).toEqual('Testing');
    });
  });

  describe('.isHttpError', () => {
    it('returns true', () => {
      const error = new NotFoundError();
      expect(error.isHttpError).toBeTruthy();
    });
  });
});
