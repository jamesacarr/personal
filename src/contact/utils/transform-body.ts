import sanitize from 'sanitize-html';

import type { ContactRequestBody } from '../types';

export const transformBody = ({
  name,
  email,
  message,
}: ContactRequestBody): ContactRequestBody => ({
  name: sanitize(name, { allowedTags: [], allowedAttributes: {} }),
  email: sanitize(email, { allowedTags: [], allowedAttributes: {} }),
  message: sanitize(message, { allowedTags: [], allowedAttributes: {} }),
});
