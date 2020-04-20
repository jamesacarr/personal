import SlackWebhook from '../lib/slack-webhook';
import generatePayload from './generate-payload';
import sendMessage from './send-message';

jest.mock('../lib/slack-webhook');
jest.mock('./generate-payload', () => jest.fn().mockImplementation(() => 'payload'));
const SlackWebhookMock = SlackWebhook as jest.Mock<SlackWebhook>;

describe('sendMessage', () => {
  it('calls generatePayload with the body', () => {
    const body = { name: 'John Doe', email: 'test@test.com', message: 'testing' };
    sendMessage(body);
    expect(generatePayload).toHaveBeenCalledWith(body);
  });

  it('calls webhook with payload', () => {
    const body = { name: 'John Doe', email: 'test@test.com', message: 'testing' };

    sendMessage(body);

    const instance = SlackWebhookMock.mock.instances[0];
    expect(instance.send).toHaveBeenCalledWith('payload');
  });
});
