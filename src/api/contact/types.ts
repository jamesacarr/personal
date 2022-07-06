import schema from './schema';

import type { InferType } from 'yup';

export type ContactRequestBody = InferType<typeof schema>;
export type ContactResponseBody = void;
