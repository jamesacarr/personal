import { NOT_FOUND } from 'http-status-codes';

import errorHandler from '../error-handler';
import { Validator } from './types';

const validateMethod: Validator = (request, response) => {
  if (request.method !== 'POST') {
    errorHandler(response, NOT_FOUND);
    return false;
  }

  return true;
};

export default validateMethod;
