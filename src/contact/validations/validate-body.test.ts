import { describe, expect, it, vi } from 'vitest';

import { BadRequestError } from '@/lib/errors';

import { schema } from '../schema';
import { validateBody } from './validate-body';

describe('validateBody', () => {
  it('raises error for invalid body type', async () => {
    const body = 'testing';
    await expect(validateBody(body)).rejects.toThrow(
      new BadRequestError('invalid body'),
    );
  });

  it('raises error for null body', async () => {
    const body = null;
    await expect(validateBody(body)).rejects.toThrow(
      new BadRequestError('body required'),
    );
  });

  it('raises error when no name', async () => {
    const body = { email: 'test@test.com', message: 'this is for a test' };
    await expect(validateBody(body)).rejects.toThrow(
      new BadRequestError('name required'),
    );
  });

  it('raises error when no message', async () => {
    const body = { email: 'test@test.com', name: 'John Doe' };
    await expect(validateBody(body)).rejects.toThrow(
      new BadRequestError('message required'),
    );
  });

  it('raises error when message is less than 5 words', async () => {
    const body = {
      email: 'test@test.com',
      message: 'testing',
      name: 'John Doe',
    };
    await expect(validateBody(body)).rejects.toThrow(
      new BadRequestError('message must be at least 5 words'),
    );
  });

  it('raises error when no email', async () => {
    const body = { message: 'this is for a test', name: 'John Doe' };
    await expect(validateBody(body)).rejects.toThrow(
      new BadRequestError('email required'),
    );
  });

  it('raises error when invalid email', async () => {
    const body = {
      email: 'invalid',
      message: 'this is for a test',
      name: 'John Doe',
    };
    await expect(validateBody(body)).rejects.toThrow(
      new BadRequestError('invalid email'),
    );
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
    await expect(validateBody(body)).resolves.toEqual(body);
  });
});
