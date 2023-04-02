import type { ContactRequestBody } from '../../contact/types';

export const sendMessage = async (data: ContactRequestBody) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
