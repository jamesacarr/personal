import type { NextRequest } from 'next/server';
import type { MockInstance } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { AppRouteHandlerRoutes } from '.next/types/routes';
import { BadRequestError, InternalServerError } from '../errors';
import type { NextRoute } from './types';
import { withErrorHandler } from './with-error-handler';

const successResponse = new Response(JSON.stringify({ success: true }), {
  headers: { 'Content-Type': 'application/json' },
});

describe('withErrorHandler', () => {
  let consoleLogSpy: MockInstance<typeof console.error>;
  const handler = vi.fn<NextRoute<AppRouteHandlerRoutes>>();
  const request = { url: 'https://example.com' } as NextRequest;
  const context: RouteContext<AppRouteHandlerRoutes> = {
    params: Promise.resolve({}),
  };

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
    await withErrorHandler(handler)(request, context);
    expect(handler).toHaveBeenCalledWith(request, context);
  });

  it('returns hndler response', async () => {
    const response = await withErrorHandler(handler)(request, context);
    expect(response).toEqual(successResponse);
  });

  it('logs error when error raised', async () => {
    const error = new InternalServerError('Testing');
    handler.mockImplementation(() => {
      throw error;
    });

    await withErrorHandler(handler)(request, context);
    expect(consoleLogSpy).toHaveBeenCalledWith(error);
  });

  it('returns InternalServerError when unknown error raised', async () => {
    const { detail, status, title, type } = new InternalServerError();
    handler.mockImplementation(() => {
      throw new Error('testing');
    });

    const response = await withErrorHandler(handler)(request, context);
    expect(response.status).toEqual(status);

    const responseBody = await response.json();
    expect(responseBody).toEqual({
      detail,
      instance: request.url,
      status,
      title,
      type,
    });
  });

  it('responds with correct details when HTTPError raised', async () => {
    const badRequest = new BadRequestError('testing');
    const { detail, status, title, type } = badRequest;
    handler.mockImplementation(() => {
      throw badRequest;
    });

    const response = await withErrorHandler(handler)(request, context);
    expect(response.status).toEqual(status);

    const responseBody = await response.json();
    expect(responseBody).toEqual({
      detail,
      instance: request.url,
      status,
      title,
      type,
    });
  });
});
