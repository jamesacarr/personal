import { NextApiRequest, NextApiResponse } from 'next';

import mock from '../../utils/mock';
import { BadRequestError, InternalServerError } from '../lib/errors';

import withErrorHandler from './with-error-handler';

describe('withErrorHandler', () => {
  const handler = jest.fn();
  const request = {} as NextApiRequest; // eslint-disable-line @typescript-eslint/consistent-type-assertions
  const response = {} as NextApiResponse; // eslint-disable-line @typescript-eslint/consistent-type-assertions
  response.status = jest.fn(() => response);
  response.json = jest.fn(() => response);
  const statusMock = mock(response.status);
  const jsonMock = mock(response.json);

  beforeEach(() => {
    handler.mockReset();
    statusMock.mockClear();
    jsonMock.mockClear();
  });

  it('calls handler with request', async () => {
    await withErrorHandler(handler)(request, response);
    expect(handler).toHaveBeenCalledWith(request, response);
  });

  it('responds with InternalServerError when unknown error raised', async () => {
    const { statusCode, error, message } = new InternalServerError();
    handler.mockImplementation(() => {
      throw new Error('testing');
    });

    await withErrorHandler(handler)(request, response);
    expect(statusMock).toHaveBeenCalledWith(statusCode);
    expect(jsonMock).toHaveBeenCalledWith({
      error: { statusCode, error, message },
    });
  });

  it('responds with correct details when HTTPError raised', async () => {
    const badRequest = new BadRequestError('testing');
    const { statusCode, error, message } = badRequest;
    handler.mockImplementation(() => {
      throw badRequest;
    });

    await withErrorHandler(handler)(request, response);
    expect(statusMock).toHaveBeenCalledWith(statusCode);
    expect(jsonMock).toHaveBeenCalledWith({
      error: { statusCode, error, message },
    });
  });
});
