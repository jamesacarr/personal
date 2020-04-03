import { NOT_FOUND } from 'http-status-codes';
import { NextApiResponse } from 'next';

import { APIRequest, APIResponse } from '../../types';
import errorHandler from '../error-handler';

const validateMethod = (request: APIRequest, response: NextApiResponse<APIResponse>): boolean => {
  if (request.method !== 'POST') {
    errorHandler(response, NOT_FOUND);
    return false;
  }

  return true;
};

export default validateMethod;
