import generatePayload from './generate-payload';

describe('generatePayload', () => {
  it('generates the payload correctly', () => {
    const data = {
      name: 'John Doe',
      email: 'test@test.com',
      message: 'testing',
    };

    expect(generatePayload(data)).toMatchSnapshot();
  });
});
