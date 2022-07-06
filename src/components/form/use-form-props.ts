import ky, { HTTPError as KyError, TimeoutError } from 'ky-universal';
import { useSnackbar } from 'notistack';

import type { ContactRequestBody } from '../../api/contact';
import type { ErrorResponseBody } from '../../api/middleware';
import type { FormikHelpers } from 'formik';

type OnSubmit = (values: ContactRequestBody, actions: FormikHelpers<ContactRequestBody>) => Promise<void>;

const useOnSubmit = (): OnSubmit => {
  const { enqueueSnackbar } = useSnackbar();

  return async (values, { setSubmitting, resetForm }) => {
    try {
      await ky.post('/api/contact', { json: values });
      enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 2000 });
      resetForm();
    } catch (error: unknown) {
      const messages = ['Unable to send message'];

      if (error instanceof KyError) {
        const errorBody = (await error.response.json()) as ErrorResponseBody;
        messages.push(errorBody.detail);
      } else if (error instanceof TimeoutError) {
        messages.push('Request timed out');
      } else {
        messages.push((error as Error).message);
      }

      enqueueSnackbar(messages.join(': '), { variant: 'error', autoHideDuration: 2000 });
    } finally {
      setSubmitting(false);
    }
  };
};

export default useOnSubmit;
