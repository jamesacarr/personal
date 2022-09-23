import { HTTPError, TimeoutError } from 'ky-universal';

import { BadRequestError } from '../../lib/errors';

import getErrorMessage from './get-error-message';

import type { ErrorResponseBody } from '../../lib/middleware/types';
import type { Writable } from 'type-fest';

const createFakeResponse = ({ status, body }: { status?: number; body?: ErrorResponseBody }): Response => {
  // Start with a realistic fetch Response.
  const response: Partial<Writable<Response>> = { ...new Response() };

  response.status = status;
  response.json = async () => body;

  return response as Response;
};

const request = { ...new Request('https://jamescarr.dev', { method: 'POST' }) };

describe('getErrorMessage', () => {
  it('handles ky HTTPError', async () => {
    const { detail, status, title, type } = new BadRequestError('testing');
    const error = new HTTPError(
      createFakeResponse({ status: 500, body: { detail, status, title, type } }),
      request,
      // @ts-expect-error Invalid options
      {}
    );
    const message = await getErrorMessage(error);

    expect(message).toEqual('Unable to send message: testing');
  });

  it('handles ky TimeoutError', async () => {
    const error = new TimeoutError(request);
    const message = await getErrorMessage(error);

    expect(message).toEqual('Unable to send message: Request timed out');
  });

  it('handles generic error', async () => {
    const error = new Error('generic error');
    const message = await getErrorMessage(error);

    expect(message).toEqual('Unable to send message: generic error');
  });
});
