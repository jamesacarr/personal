import { BadRequestError } from '../lib/errors';
import { ContactRequestBody } from './types';

const EMAIL_REGEX = /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[(?:\d{1,3}\.){3}\d{1,3}])|(?:(?:[a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;

const validateBody = (body: ContactRequestBody): void => {
  if (!body || typeof body !== 'object') {
    throw new BadRequestError('Invalid format');
  }

  if (!body.name) {
    throw new BadRequestError('Missing field: name');
  }

  if (!body.email) {
    throw new BadRequestError('Missing field: email');
  }

  if (!EMAIL_REGEX.test(body.email)) {
    throw new BadRequestError('Invalid field: email');
  }

  if (!body.message) {
    throw new BadRequestError('Missing field: message');
  }

  if (!body.token) {
    throw new BadRequestError('Missing field: token');
  }
};

export default validateBody;
