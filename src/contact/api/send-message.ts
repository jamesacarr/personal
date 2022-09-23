import ky from 'ky-universal';

import { getErrorMessage } from '../utils';

import type { ContactRequestBody } from '../types';

const sendMessage = async (data: ContactRequestBody) => {
  try {
    await ky.post('/api/contact', { json: data });
  } catch (error: unknown) {
    const message = await getErrorMessage(error);
    throw new Error(message);
  }
};

export default sendMessage;
