export const HONEYPOT_FIELD = 'website';

// People can't see or reach the field, so any value (including a file, which a
// browser can't put in a text input) means a bot filled the form.
export const isHoneypotFilled = (formData: FormData) => {
  const value = formData.get(HONEYPOT_FIELD);
  if (value === null) {
    return false;
  }

  return typeof value !== 'string' || value.trim() !== '';
};
