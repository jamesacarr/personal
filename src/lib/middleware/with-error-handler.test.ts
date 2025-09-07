import type { NextRequest } from 'next/server';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from 'vitest';
import { BadRequestError, InternalServerError } from '../errors';

import type { NextRoute } from './types';
import { withErrorHandler } from './with-error-handler';

const successResponse = new Response(JSON.stringify({ success: true }), {
  headers: { 'Content-Type': 'application/json' },
});

describe('withErrorHandler', () => {
  let consoleLogSpy: MockInstance<typeof console.error>;
  const handler = vi.fn<NextRoute>();
  const request = { url: 'https://example.com' } as NextRequest; // eslint-disable-line @typescript-eslint/consistent-type-assertions

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      /* Intentionally empty */
    });
    handler.mockImplementation(() => successResponse);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('calls handler with request', async () => {
    await withErrorHandler(handler)(request);
    expect(handler).toHaveBeenCalledWith(request);
  });

  it('returns hndler response', async () => {
    const response = await withErrorHandler(handler)(request);
    expect(response).toEqual(successResponse);
  });

  it('logs error when error raised', async () => {
    const error = new InternalServerError('Testing');
    handler.mockImplementation(() => {
      throw error;
    });

    await withErrorHandler(handler)(request);
    expect(consoleLogSpy).toHaveBeenCalledWith(error);
  });

  it('returns InternalServerError when unknown error raised', async () => {
    const { detail, status, title, type } = new InternalServerError();
    handler.mockImplementation(() => {
      throw new Error('testing');
    });

    const response = await withErrorHandler(handler)(request);
    expect(response.status).toEqual(status);

    const responseBody = await response.json();
    expect(responseBody).toEqual({
      detail,
      status,
      title,
      type,
      instance: request.url,
    });
  });

  it('responds with correct details when HTTPError raised', async () => {
    const badRequest = new BadRequestError('testing');
    const { detail, status, title, type } = badRequest;
    handler.mockImplementation(() => {
      throw badRequest;
    });

    const response = await withErrorHandler(handler)(request);
    expect(response.status).toEqual(status);

    const responseBody = await response.json();
    expect(responseBody).toEqual({
      detail,
      status,
      title,
      type,
      instance: request.url,
    });
  });
});
