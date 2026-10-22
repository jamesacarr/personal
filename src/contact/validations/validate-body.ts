import { ValidationError } from 'yup';

import { schema } from '../schema';
import type { ContactFormFields, ContactRequestBody } from '../types';

type ValidateBodyResult =
  | { success: true; data: ContactRequestBody }
  | { success: false; errors: Partial<ContactFormFields> };

const toFieldErrors = (error: ValidationError) => {
  const errors: Partial<ContactFormFields> = {};

  for (const { path, message } of error.inner) {
    const field = path as keyof ContactFormFields;
    errors[field] ??= message;
  }

  return errors;
};

export const validateBody = async (
  body: ContactFormFields,
): Promise<ValidateBodyResult> => {
  try {
    const data = await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { data, success: true };
  } catch (error: unknown) {
    if (ValidationError.isError(error)) {
      return { errors: toFieldErrors(error), success: false };
    }

    throw error;
  }
};
