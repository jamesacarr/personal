'use server';

import type { ContactFormFields, ContactFormState } from './types';
import { transformBody } from './utils';
import { validateBody } from './validations';

const WEBHOOK_TIMEOUT_MS = 10_000;
const ERROR_MESSAGE = 'Your message could not be sent. Please try again later.';

const getField = (formData: FormData, name: keyof ContactFormFields) => {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
};

export const sendMessage = async (
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> => {
  const result = await validateBody({
    email: getField(formData, 'email'),
    message: getField(formData, 'message'),
    name: getField(formData, 'name'),
  });

  if (!result.success) {
    return { errors: result.errors, status: 'invalid' };
  }

  try {
    const { WEBHOOK_URL } = process.env;
    if (!WEBHOOK_URL) {
      throw new Error('Missing WEBHOOK_URL');
    }

    const res = await fetch(WEBHOOK_URL, {
      body: JSON.stringify(transformBody(result.data)),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error(`Webhook responded ${res.status}`);
    }
  } catch (caughtError: unknown) {
    // biome-ignore lint/suspicious/noConsole: We want to log errors so they show up in Vercel
    console.error(caughtError);
    return { message: ERROR_MESSAGE, status: 'error' };
  }

  return { status: 'success' };
};
