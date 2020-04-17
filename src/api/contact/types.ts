import { InferType } from 'yup';

import { ResponseBody } from '../types';
import schema from './schema';

export type ContactRequestBody = InferType<typeof schema>;
export type ContactResponseBody = ResponseBody<void>;
