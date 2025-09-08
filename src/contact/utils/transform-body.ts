import sanitize from 'sanitize-html';

import type { ContactRequestBody } from '../types';

export const transformBody = ({
  name,
  email,
  message,
}: ContactRequestBody): ContactRequestBody => ({
  email: sanitize(email, { allowedAttributes: {}, allowedTags: [] }),
  message: sanitize(message, { allowedAttributes: {}, allowedTags: [] }),
  name: sanitize(name, { allowedAttributes: {}, allowedTags: [] }),
});
