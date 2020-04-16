import { BadRequestError } from '../lib/errors';
import { ContactRequest } from './types';

const EMAIL_REGEX = /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[(?:\d{1,3}\.){3}\d{1,3}])|(?:(?:[a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;

const validateBody = (request: ContactRequest): void => {
  if (!request.body || typeof request.body !== 'object') {
    throw new BadRequestError('Invalid format');
  }

  if (!request.body.name) {
    throw new BadRequestError('Missing field: name');
  }

  if (!request.body.email) {
    throw new BadRequestError('Missing field: email');
  }

  if (!EMAIL_REGEX.test(request.body.email)) {
    throw new BadRequestError('Invalid field: email');
  }

  if (!request.body.message) {
    throw new BadRequestError('Missing field: message');
  }

  if (!request.body.token) {
    throw new BadRequestError('Missing field: token');
  }
};

export default validateBody;
