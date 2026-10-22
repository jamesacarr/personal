// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { HONEYPOT_FIELD, isHoneypotFilled } from './honeypot';

const withHoneypot = (value: string | Blob) => {
  const formData = new FormData();
  formData.append(HONEYPOT_FIELD, value);
  return formData;
};

describe('isHoneypotFilled', () => {
  it('is false when the field is absent', () => {
    expect(isHoneypotFilled(new FormData())).toBe(false);
  });

  it('is false when the field is empty', () => {
    expect(isHoneypotFilled(withHoneypot(''))).toBe(false);
  });

  it('is false when the field is whitespace only', () => {
    expect(isHoneypotFilled(withHoneypot('  \n\t'))).toBe(false);
  });

  it('is true when the field has text', () => {
    expect(isHoneypotFilled(withHoneypot('https://spam.example.com'))).toBe(
      true,
    );
  });

  it('is true when the field is a file', () => {
    expect(isHoneypotFilled(withHoneypot(new File(['x'], 'x.txt')))).toBe(true);
  });
});
