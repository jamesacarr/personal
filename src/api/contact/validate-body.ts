import { ValidationError } from 'yup';

import { BadRequestError } from '../lib/errors';
import schema from './schema';
import { ContactRequestBody } from './types';

const getErrorMessage = (error: ValidationError) =>
  error.type === 'required' ? `${error.path} required` : error.message.toLowerCase();

const validateBody = async (body: any): Promise<ContactRequestBody> => {
  try {
    return await schema.validate(body);
  } catch (error) {
    if (ValidationError.isError(error)) {
      throw new BadRequestError(`Bad Request: ${getErrorMessage(error)}`);
    }

    throw error;
  }
};

export default validateBody;
