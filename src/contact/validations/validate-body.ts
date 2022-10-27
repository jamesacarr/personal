import { ValidationError } from 'yup';

import { BadRequestError } from '../../lib/errors';
import schema from '../schema';

import type { ContactRequestBody } from '../types';

const getErrorMessage = (error: ValidationError) => {
  switch (error.type) {
    case 'email': {
      return error.message.toLowerCase();
    }

    case 'typeError': {
      return 'invalid body';
    }

    default: {
      return `${error.path ?? '<unknown>'} ${error.message.toLowerCase()}`;
    }
  }
};

const validateBody = async (body: any): Promise<ContactRequestBody> => {
  try {
    return await schema.validate(body, { stripUnknown: true });
  } catch (error: unknown) {
    if (ValidationError.isError(error)) {
      throw new BadRequestError(getErrorMessage(error));
    }

    throw error;
  }
};

export default validateBody;
