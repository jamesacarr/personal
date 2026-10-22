import type { InferType } from 'yup';

import type { schema } from './schema';

export type ContactRequestBody = InferType<typeof schema>;

export type ContactFormFields = Record<keyof ContactRequestBody, string>;

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'invalid'; errors: Partial<ContactFormFields> }
  | { status: 'error'; message: string };
