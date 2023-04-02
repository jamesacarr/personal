import { transformBody } from './transform-body';

describe('transformBody', () => {
  it('strips html from name', () => {
    const body = {
      name: '<b>James</b>',
      email: '',
      message: '',
    };

    expect(transformBody(body)).toEqual({
      name: 'James',
      email: '',
      message: '',
    });
  });

  it('strips html from email', () => {
    const body = {
      name: '',
      email: 'john<p>@doe.com</p>',
      message: '',
    };

    expect(transformBody(body)).toEqual({
      name: '',
      email: 'john@doe.com',
      message: '',
    });
  });

  it('strips html from message', () => {
    const body = {
      name: '',
      email: '',
      message: 'This is <script>alert("blah")</script>a message',
    };

    expect(transformBody(body)).toEqual({
      name: '',
      email: '',
      message: 'This is a message',
    });
  });
});
