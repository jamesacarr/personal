import { NOT_FOUND } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../error-handler';

const validateMethod = (request: NextApiRequest, response: NextApiResponse): boolean => {
  if (request.method !== 'POST') {
    errorHandler(response, NOT_FOUND);
    return false;
  }

  return true;
};

export default validateMethod;
