import { describe, expect, it, vi } from 'vitest';

import { schema } from '../schema';
import { validateBody } from './validate-body';

describe('validateBody', () => {
  it('returns error when no name', async () => {
    const body = {
      email: 'test@test.com',
      message: 'this is for a test',
      name: '',
    };
    await expect(validateBody(body)).resolves.toEqual({
      errors: { name: 'Required' },
      success: false,
    });
  });

  it('returns error when no message', async () => {
    const body = { email: 'test@test.com', message: '', name: 'John Doe' };
    await expect(validateBody(body)).resolves.toEqual({
      errors: { message: 'Required' },
      success: false,
    });
  });

  it('returns error when message is less than 5 words', async () => {
    const body = {
      email: 'test@test.com',
      message: 'testing',
      name: 'John Doe',
    };
    await expect(validateBody(body)).resolves.toEqual({
      errors: { message: 'Must be at least 5 words' },
      success: false,
    });
  });

  it('returns error when message is less than 5 words with extra whitespace', async () => {
    const body = {
      email: 'test@test.com',
      message: 'one  \n\n two\t\tthree   four',
      name: 'John Doe',
    };
    await expect(validateBody(body)).resolves.toEqual({
      errors: { message: 'Must be at least 5 words' },
      success: false,
    });
  });

  it.each([
    ['newlines', 'one\ntwo\nthree\nfour\nfive'],
    ['tabs', 'one\ttwo\tthree\tfour\tfive'],
    ['mixed whitespace', 'one two\nthree\tfour\r\nfive'],
  ])('accepts a 5 word message separated by %s', async (_, message) => {
    const body = { email: 'test@test.com', message, name: 'John Doe' };
    await expect(validateBody(body)).resolves.toEqual({
      data: body,
      success: true,
    });
  });

  it('returns error when no email', async () => {
    const body = {
      email: '',
      message: 'this is for a test',
      name: 'John Doe',
    };
    await expect(validateBody(body)).resolves.toEqual({
      errors: { email: 'Required' },
      success: false,
    });
  });

  it('returns error when invalid email', async () => {
    const body = {
      email: 'invalid',
      message: 'this is for a test',
      name: 'John Doe',
    };
    await expect(validateBody(body)).resolves.toEqual({
      errors: { email: 'Invalid email' },
      success: false,
    });
  });

  it('returns errors for every invalid field', async () => {
    const body = { email: 'invalid', message: 'too short', name: '' };
    await expect(validateBody(body)).resolves.toEqual({
      errors: {
        email: 'Invalid email',
        message: 'Must be at least 5 words',
        name: 'Required',
      },
      success: false,
    });
  });

  it('rethrows non-validation errors', async () => {
    const body = {
      email: 'test@test.com',
      message: 'this is for a test',
      name: 'John Doe',
    };
    const mock = vi.spyOn(schema, 'validate').mockImplementation(() => {
      throw new Error('Test');
    });

    await expect(validateBody(body)).rejects.toThrow(new Error('Test'));
    mock.mockRestore();
  });

  it('returns successfully if body is valid', async () => {
    const body = {
      email: 'test@test.com',
      message: 'this is for a test',
      name: 'John Doe',
    };
    await expect(validateBody(body)).resolves.toEqual({
      data: body,
      success: true,
    });
  });
});
