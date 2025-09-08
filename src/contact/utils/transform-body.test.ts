import { describe, expect, it } from 'vitest';

import { transformBody } from './transform-body';

describe('transformBody', () => {
  it('strips html from name', () => {
    const body = {
      email: '',
      message: '',
      name: '<b>James</b>',
    };

    expect(transformBody(body)).toEqual({
      email: '',
      message: '',
      name: 'James',
    });
  });

  it('strips html from email', () => {
    const body = {
      email: 'john<p>@doe.com</p>',
      message: '',
      name: '',
    };

    expect(transformBody(body)).toEqual({
      email: 'john@doe.com',
      message: '',
      name: '',
    });
  });

  it('strips html from message', () => {
    const body = {
      email: '',
      message: 'This is <script>alert("blah")</script>a message',
      name: '',
    };

    expect(transformBody(body)).toEqual({
      email: '',
      message: 'This is a message',
      name: '',
    });
  });
});
