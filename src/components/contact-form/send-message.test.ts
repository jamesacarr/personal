import fetchMock from '@fetch-mock/vitest';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { sendMessage } from './send-message';

const DATA = {
  name: 'John Doe',
  email: 'test@test.com',
  message: 'This is a test message',
};

describe('sendMessage', () => {
  beforeAll(() => {
    fetchMock.mockGlobal();
  });

  afterAll(() => {
    fetchMock.unmockGlobal();
  });

  afterEach(() => {
    fetchMock.mockReset();
  });

  it('calls contact API', async () => {
    fetchMock.route('/api/contact', 200);
    await sendMessage(DATA);
    expect(fetchMock).toHaveFetched('/api/contact', { body: DATA });
  });

  it('throws error on internal server error', async () => {
    fetchMock.route('/api/contact', 500);
    await expect(sendMessage(DATA)).rejects.toThrow('Internal Server Error');
  });

  it('throws error on bad request', async () => {
    fetchMock.route('/api/contact', 400);
    await expect(sendMessage(DATA)).rejects.toThrow('Bad Request');
  });

  it('returns when request successful', async () => {
    fetchMock.route('/api/contact', 200);
    await expect(sendMessage(DATA)).resolves.not.toThrow();
  });
});
