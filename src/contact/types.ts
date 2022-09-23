import type schema from './schema';
import type { InferType } from 'yup';

export type ContactRequestBody = InferType<typeof schema>;
