import { BAD_REQUEST } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../error-handler';

const EMAIL_REGEX = /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateBody = (req: NextApiRequest, res: NextApiResponse): boolean => {
  if (!req.body || typeof req.body !== 'object') {
    errorHandler(res, BAD_REQUEST, 'Invalid format');
    return false;
  }

  if (!req.body.name) {
    errorHandler(res, BAD_REQUEST, 'Missing field: name');
    return false;
  }

  if (!req.body.email) {
    errorHandler(res, BAD_REQUEST, 'Missing field: email');
    return false;
  }

  if (!EMAIL_REGEX.test(req.body.email)) {
    errorHandler(res, BAD_REQUEST, 'Invalid field: email');
    return false;
  }

  if (!req.body.message) {
    errorHandler(res, BAD_REQUEST, 'Missing field: message');
    return false;
  }

  if (!req.body.token) {
    errorHandler(res, BAD_REQUEST, 'Missing field: token');
    return false;
  }

  return true;
};

export default validateBody;
