import { HTTPError as KyError, TimeoutError } from 'ky-universal';

import type { ErrorResponseBody } from '../../lib/middleware/types';

const getErrorMessage = async (error: unknown) => {
  const messages = ['Unable to send message'];

  if (error instanceof KyError) {
    const errorBody = (await error.response.json()) as ErrorResponseBody;
    messages.push(errorBody.detail);
  } else if (error instanceof TimeoutError) {
    messages.push('Request timed out');
  } else {
    messages.push((error as Error).message);
  }

  return messages.join(': ');
};

export default getErrorMessage;
