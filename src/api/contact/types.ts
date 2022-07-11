import schema from '../../schemas/contact-schema';

import type { InferType } from 'yup';

export type ContactRequestBody = InferType<typeof schema>;
