// @vitest-environment node
import fetchMock from '@fetch-mock/vitest';
import type { MockInstance } from 'vitest';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { sendMessage } from './actions';

const WEBHOOK_URL = 'https://webhook.example.com/contact';
const GENERIC_MESSAGE =
  'Your message could not be sent. Please try again later.';

const VALID = {
  email: 'test@test.com',
  message: 'This is a test message',
  name: 'John Doe',
};

const buildFormData = (fields: Record<string, string | Blob>) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }
  return formData;
};

describe('sendMessage', () => {
  let consoleErrorSpy: MockInstance<typeof console.error>;

  beforeAll(() => {
    fetchMock.mockGlobal();
  });

  afterAll(() => {
    fetchMock.unmockGlobal();
  });

  beforeEach(() => {
    vi.stubEnv('WEBHOOK_URL', WEBHOOK_URL);
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      /* Intentionally empty */
    });
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('posts the sanitised message to the webhook', async () => {
    fetchMock.route(WEBHOOK_URL, 200);

    const result = await sendMessage(
      { status: 'idle' },
      buildFormData({
        ...VALID,
        $ACTION_ID_abc: '',
        message: 'This is a <b>test</b> message',
      }),
    );

    expect(result).toEqual({ status: 'success' });
    expect(fetchMock).toHaveFetchedTimes(1, WEBHOOK_URL);
    expect(fetchMock).toHaveFetched(WEBHOOK_URL, {
      body: VALID,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it.each([
    ['name', { ...VALID, name: '' }, 'Required'],
    ['email', { ...VALID, email: '' }, 'Required'],
    ['email', { ...VALID, email: 'invalid' }, 'Invalid email'],
    ['message', { ...VALID, message: '' }, 'Required'],
    ['message', { ...VALID, message: 'too short' }, 'Must be at least 5 words'],
  ])(
    'returns the %s error without calling the webhook',
    async (field, fields, message) => {
      const result = await sendMessage(
        { status: 'idle' },
        buildFormData(fields),
      );

      expect(result).toEqual({
        errors: { [field]: message },
        status: 'invalid',
      });
      expect(fetchMock).not.toHaveFetched();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    },
  );

  it('treats missing fields as empty', async () => {
    const result = await sendMessage({ status: 'idle' }, new FormData());

    expect(result).toEqual({
      errors: { email: 'Required', message: 'Required', name: 'Required' },
      status: 'invalid',
    });
    expect(fetchMock).not.toHaveFetched();
  });

  it('treats a non-string entry as empty', async () => {
    const result = await sendMessage(
      { status: 'idle' },
      buildFormData({ ...VALID, name: new File(['John Doe'], 'name.txt') }),
    );

    expect(result).toEqual({
      errors: { name: 'Required' },
      status: 'invalid',
    });
    expect(fetchMock).not.toHaveFetched();
  });

  it('returns the generic error when the webhook responds non-2xx', async () => {
    fetchMock.route(WEBHOOK_URL, 500);

    const result = await sendMessage({ status: 'idle' }, buildFormData(VALID));

    expect(result).toEqual({ message: GENERIC_MESSAGE, status: 'error' });
    expect(consoleErrorSpy).toHaveBeenCalledOnce();
    expect(consoleErrorSpy.mock.calls[0][0]).toEqual(
      new Error('Webhook responded 500'),
    );
  });

  it('returns the generic error when the webhook times out', async () => {
    const timeoutSpy = vi
      .spyOn(AbortSignal, 'timeout')
      .mockReturnValue(
        AbortSignal.abort(new DOMException('timed out', 'TimeoutError')),
      );
    fetchMock.route(WEBHOOK_URL, 200);

    const result = await sendMessage({ status: 'idle' }, buildFormData(VALID));

    expect(result).toEqual({ message: GENERIC_MESSAGE, status: 'error' });
    expect(timeoutSpy).toHaveBeenCalledWith(10_000);
    expect(consoleErrorSpy).toHaveBeenCalledOnce();
    expect(consoleErrorSpy.mock.calls[0][0]).toHaveProperty(
      'name',
      'AbortError',
    );
  });

  it('returns the generic error on a network error', async () => {
    const networkError = new TypeError('fetch failed');
    fetchMock.route(WEBHOOK_URL, { throws: networkError });

    const result = await sendMessage({ status: 'idle' }, buildFormData(VALID));

    expect(result).toEqual({ message: GENERIC_MESSAGE, status: 'error' });
    expect(consoleErrorSpy).toHaveBeenCalledExactlyOnceWith(networkError);
  });

  describe('honeypot', () => {
    let consoleWarnSpy: MockInstance<typeof console.warn>;

    beforeEach(() => {
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
        /* Intentionally empty */
      });
    });

    it('returns success without calling the webhook when filled', async () => {
      const result = await sendMessage(
        { status: 'idle' },
        buildFormData({ ...VALID, website: 'https://spam.example.com' }),
      );

      expect(result).toEqual({ status: 'success' });
      expect(fetchMock).not.toHaveFetched();
      expect(consoleWarnSpy).toHaveBeenCalledExactlyOnceWith(
        'Honeypot filled; dropping contact submission',
      );
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('returns success for invalid input when filled', async () => {
      const result = await sendMessage(
        { status: 'idle' },
        buildFormData({ website: 'https://spam.example.com' }),
      );

      expect(result).toEqual({ status: 'success' });
      expect(fetchMock).not.toHaveFetched();
    });

    it('posts to the webhook when empty', async () => {
      fetchMock.route(WEBHOOK_URL, 200);

      const result = await sendMessage(
        { status: 'idle' },
        buildFormData({ ...VALID, website: '' }),
      );

      expect(result).toEqual({ status: 'success' });
      expect(fetchMock).toHaveFetchedTimes(1, WEBHOOK_URL);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  it('returns the generic error when WEBHOOK_URL is unset', async () => {
    vi.stubEnv('WEBHOOK_URL', undefined);

    const result = await sendMessage({ status: 'idle' }, buildFormData(VALID));

    expect(result).toEqual({ message: GENERIC_MESSAGE, status: 'error' });
    expect(fetchMock).not.toHaveFetched();
    expect(consoleErrorSpy).toHaveBeenCalledOnce();
    expect(consoleErrorSpy.mock.calls[0][0]).toEqual(
      new Error('Missing WEBHOOK_URL'),
    );
  });
});
