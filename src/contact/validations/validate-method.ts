import { NotFoundError } from '../../lib/errors';

export const validateMethod = (method?: string): void => {
  if (method !== 'POST') {
    throw new NotFoundError();
  }
};
