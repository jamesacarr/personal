import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../error-handler';

const EMAIL_REGEX = /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateBody = (req: NextApiRequest, res: NextApiResponse): boolean => {
  if (!req.body || typeof req.body !== 'object') {
    errorHandler(res, 400, 'Invalid format');
    return false;
  }

  if (!req.body.name) {
    errorHandler(res, 400, 'Missing field: name');
    return false;
  }

  if (!req.body.email) {
    errorHandler(res, 400, 'Missing field: email');
    return false;
  }

  if (!EMAIL_REGEX.test(req.body.email)) {
    errorHandler(res, 400, 'Invalid field: email');
    return false;
  }

  if (!req.body.message) {
    errorHandler(res, 400, 'Missing field: message');
    return false;
  }

  if (!req.body.token) {
    errorHandler(res, 400, 'Missing field: token');
    return false;
  }

  return true;
};

export default validateBody;
