import { NotFoundError } from '../../lib/errors';

import validateMethod from './validate-method';

describe('validateMethod', () => {
  it('returns when method is POST', () => {
    expect(() => {
      validateMethod('POST');
    }).not.toThrowError();
  });

  it('raises error when method is undefined', () => {
    expect(() => {
      validateMethod();
    }).toThrow(new NotFoundError());
  });

  it('raises error when method is not POST', () => {
    expect(() => {
      validateMethod('GET');
    }).toThrow(new NotFoundError());
  });
});
