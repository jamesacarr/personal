import { BAD_REQUEST } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../error-handler';

const EMAIL_REGEX = /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[(?:\d{1,3}\.){3}\d{1,3}])|(?:(?:[a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;

const validateBody = (request: NextApiRequest, response: NextApiResponse): boolean => {
  if (!request.body || typeof request.body !== 'object') {
    errorHandler(response, BAD_REQUEST, 'Invalid format');
    return false;
  }

  if (!request.body.name) {
    errorHandler(response, BAD_REQUEST, 'Missing field: name');
    return false;
  }

  if (!request.body.email) {
    errorHandler(response, BAD_REQUEST, 'Missing field: email');
    return false;
  }

  if (!EMAIL_REGEX.test(request.body.email)) {
    errorHandler(response, BAD_REQUEST, 'Invalid field: email');
    return false;
  }

  if (!request.body.message) {
    errorHandler(response, BAD_REQUEST, 'Missing field: message');
    return false;
  }

  if (!request.body.token) {
    errorHandler(response, BAD_REQUEST, 'Missing field: token');
    return false;
  }

  return true;
};

export default validateBody;
