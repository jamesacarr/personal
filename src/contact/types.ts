import type { InferType } from 'yup';

import type { schema } from './schema';

export type ContactRequestBody = InferType<typeof schema>;
