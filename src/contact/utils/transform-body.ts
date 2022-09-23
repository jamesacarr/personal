import sanitize from 'sanitize-html';

import type { ContactRequestBody } from '../types';

const transformBody = ({ name, email, message }: ContactRequestBody): ContactRequestBody => ({
  name: sanitize(name, { allowedTags: [], allowedAttributes: {} }),
  email: sanitize(email, { allowedTags: [], allowedAttributes: {} }),
  message: sanitize(message, { allowedTags: [], allowedAttributes: {} }),
});

export default transformBody;
