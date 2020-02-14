import { NOT_FOUND } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../error-handler';

const validateMethod = (req: NextApiRequest, res: NextApiResponse): boolean => {
  if (req.method !== 'POST') {
    errorHandler(res, NOT_FOUND);
    return false;
  }

  return true;
};

export default validateMethod;
