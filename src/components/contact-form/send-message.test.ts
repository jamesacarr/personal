import { sendMessage } from './send-message';

const DATA = {
  name: 'John Doe',
  email: 'test@test.com',
  message: 'This is a test message',
};

describe('sendMessage', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  it('throws error on internal server error', async () => {
    fetchMock.mockResponse('Internal Server Error', { status: 500 });
    await expect(sendMessage(DATA)).rejects.toThrow('Internal Server Error');
  });

  it('throws error when request fails', async () => {
    fetchMock.mockReject(new Error('Test Error'));
    await expect(sendMessage(DATA)).rejects.toThrow('Test Error');
  });

  it('returns when request successful', async () => {
    fetchMock.mockResponse('');
    await expect(sendMessage(DATA)).resolves.not.toThrow();
  });
});
