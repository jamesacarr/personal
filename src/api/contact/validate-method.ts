import { NotFoundError } from '../lib/errors';

const validateMethod = (method?: string): void => {
  if (method !== 'POST') {
    throw new NotFoundError();
  }
};

export default validateMethod;
