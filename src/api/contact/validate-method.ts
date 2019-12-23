import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../error-handler';

const validateMethod = (req: NextApiRequest, res: NextApiResponse): boolean => {
  if (req.method !== 'POST') {
    errorHandler(res, 404, 'Not Found');
    return false;
  }

  return true;
};

export default validateMethod;
