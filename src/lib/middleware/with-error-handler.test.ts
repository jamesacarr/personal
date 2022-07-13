import { jest } from '@jest/globals';

import mock from '../../utils/mock';
import { BadRequestError, InternalServerError } from '../errors';

import withErrorHandler from './with-error-handler';

import type { NextApiRequest, NextApiResponse } from 'next';

describe('withErrorHandler', () => {
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>;
  const handler = jest.fn();
  const request = { url: 'https://example.com' } as NextApiRequest; // eslint-disable-line @typescript-eslint/consistent-type-assertions
  const response = {} as NextApiResponse; // eslint-disable-line @typescript-eslint/consistent-type-assertions
  response.status = jest.fn(() => response);
  response.setHeader = jest.fn(() => response);
  response.send = jest.fn(() => response);
  const statusMock = mock(response.status);
  const setHeaderMock = mock(response.setHeader);
  const sendMock = mock(response.send);

  beforeEach(() => {
    // @ts-expect-error For some reason, the typings behind this aren't working
    consoleLogSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {
      /* Intentionally empty */
    });
    handler.mockReset();
    statusMock.mockClear();
    setHeaderMock.mockClear();
    sendMock.mockClear();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('calls handler with request', async () => {
    await withErrorHandler(handler)(request, response);
    expect(handler).toHaveBeenCalledWith(request, response);
  });

  it('logs error when error raised', async () => {
    const error = new InternalServerError('Testing');
    handler.mockImplementation(() => {
      throw error;
    });

    await withErrorHandler(handler)(request, response);
    expect(consoleLogSpy).toHaveBeenCalledWith(error);
  });

  it('responds with InternalServerError when unknown error raised', async () => {
    const { detail, status, title, type } = new InternalServerError();
    handler.mockImplementation(() => {
      throw new Error('testing');
    });

    await withErrorHandler(handler)(request, response);
    expect(statusMock).toHaveBeenCalledWith(status);
    expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/problem+json; charset=utf-8');
    expect(sendMock).toHaveBeenCalledWith({
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

    await withErrorHandler(handler)(request, response);
    expect(statusMock).toHaveBeenCalledWith(status);
    expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/problem+json; charset=utf-8');
    expect(sendMock).toHaveBeenCalledWith({
      detail,
      status,
      title,
      type,
      instance: request.url,
    });
  });
});
