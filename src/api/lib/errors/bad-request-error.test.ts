import BadRequestError from './bad-request-error';

describe('BadRequestError', () => {
  describe('.constructor', () => {
    it('sets status code to 400', () => {
      const error = new BadRequestError();
      expect(error.status).toEqual(400);
    });

    it('sets type correctly', () => {
      const error = new BadRequestError();
      expect(error.type).toEqual('https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400');
    });

    it('sets title correctly', () => {
      const error = new BadRequestError();
      expect(error.title).toEqual('Bad Request');
    });

    it('sets default detail when none supplied', () => {
      const error = new BadRequestError();
      expect(error.detail).toEqual('Bad Request');
    });

    it('sets detail when provided', () => {
      const error = new BadRequestError('Testing');
      expect(error.detail).toEqual('Testing');
    });
  });

  describe('.isHttpError', () => {
    it('returns true', () => {
      const error = new BadRequestError();
      expect(error.isHttpError).toBeTruthy();
    });
  });
});
