import type { ContactRequestBody } from '@/contact/types';

export const sendMessage = async (data: ContactRequestBody) => {
  const response = await fetch('/api/contact', {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
