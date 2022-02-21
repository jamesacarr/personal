import { InferType } from 'yup';

import schema from './schema';

export type ContactRequestBody = InferType<typeof schema>;
export type ContactResponseBody = void;
