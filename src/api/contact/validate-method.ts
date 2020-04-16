import { NotFoundError } from '../lib/errors';
import { ContactRequest } from './types';

const validateMethod = (request: ContactRequest): void => {
  if (request.method !== 'POST') {
    throw new NotFoundError();
  }
};

export default validateMethod;
