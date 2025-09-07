import { describe, expect, it } from 'vitest';

import { InternalServerError } from './internal-server-error';

describe('InternalServerError', () => {
  describe('.constructor', () => {
    it('sets status code to 500', () => {
      const error = new InternalServerError();
      expect(error.status).toEqual(500);
    });

    it('sets type correctly', () => {
      const error = new InternalServerError();
      expect(error.type).toEqual(
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500',
      );
    });

    it('sets title correctly', () => {
      const error = new InternalServerError();
      expect(error.title).toEqual('Internal Server Error');
    });

    it('sets default detail when none supplied', () => {
      const error = new InternalServerError();
      expect(error.detail).toEqual('Internal Server Error');
    });

    it('sets detail when provided', () => {
      const error = new InternalServerError('Testing');
      expect(error.detail).toEqual('Testing');
    });
  });

  describe('.isHttpError', () => {
    it('returns true', () => {
      const error = new InternalServerError();
      expect(error.isHttpError).toBeTruthy();
    });
  });
});
