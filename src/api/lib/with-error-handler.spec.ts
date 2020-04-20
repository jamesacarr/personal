import { NextApiRequest } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';

import { APIResponse } from '../types';
import { BadRequestError, InternalServerError } from './errors';
import withErrorHandler from './with-error-handler';

describe('withErrorHandler', () => {
  const handler = jest.fn();
  const request = createRequest<NextApiRequest>();
  const response = createResponse<APIResponse<string>>();
  jest.spyOn(response, 'status');
  jest.spyOn(response, 'json');

  beforeEach(() => {
    jest.clearAllMocks();
    handler.mockImplementation(async () => Promise.resolve('data'));
  });

  it('calls handler with request', async () => {
    await withErrorHandler<string>(handler)(request, response);
    expect(handler).toHaveBeenCalledWith(request);
  });

  it('sends data from handler', async () => {
    await withErrorHandler<string>(handler)(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ success: true, data: 'data' });
  });

  it('responds with InternalServerError when unknown error raised', async () => {
    const { statusCode, error, message } = new InternalServerError();
    handler.mockImplementation(() => {
      throw new Error('testing');
    });

    await withErrorHandler<string>(handler)(request, response);
    expect(response.status).toHaveBeenCalledWith(statusCode);
    expect(response.json).toHaveBeenCalledWith({ success: false, error: { statusCode, error, message } });
  });

  it('responds with correct details when HTTPError raised', async () => {
    const badRequest = new BadRequestError('testing');
    const { statusCode, error, message } = badRequest;
    handler.mockImplementation(() => {
      throw badRequest;
    });

    await withErrorHandler<string>(handler)(request, response);
    expect(response.status).toHaveBeenCalledWith(statusCode);
    expect(response.json).toHaveBeenCalledWith({ success: false, error: { statusCode, error, message } });
  });
});
