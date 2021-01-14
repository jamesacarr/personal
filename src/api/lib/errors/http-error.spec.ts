import HTTPError from './http-error';

describe('HTTPError', () => {
  describe('.constructor', () => {
    it('sets status code to 500', () => {
      const error = new HTTPError();
      expect(error.statusCode).toEqual(500);
    });

    it('sets error correctly', () => {
      const error = new HTTPError();
      expect(error.error).toEqual('Internal Server Error');
    });

    it('sets default message when none supplied', () => {
      const error = new HTTPError();
      expect(error.message).toEqual('Internal Server Error');
    });

    it('sets message when provided', () => {
      const error = new HTTPError('Testing');
      expect(error.message).toEqual('Testing');
    });
  });

  describe('.isHttpError', () => {
    it('returns true', () => {
      const error = new HTTPError();
      expect(error.isHttpError).toBeTruthy();
    });
  });
});
