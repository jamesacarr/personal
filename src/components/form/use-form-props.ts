import axios from 'axios';
import { useSnackbar } from 'notistack';

import type { ContactRequestBody, ContactResponseBody } from '../../api/contact';
import type { ErrorResponseBody } from '../../api/middleware';
import type { AxiosError, AxiosResponse } from 'axios';
import type { FormikHelpers } from 'formik';

type OnSubmit = (values: ContactRequestBody, actions: FormikHelpers<ContactRequestBody>) => Promise<void>;

const isAxiosError = (error: any): error is AxiosError<ErrorResponseBody> => Boolean(error?.isAxiosError);

const useOnSubmit = (): OnSubmit => {
  const { enqueueSnackbar } = useSnackbar();

  return async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post<ContactResponseBody, AxiosResponse<ContactResponseBody>, ContactRequestBody>(
        '/api/contact',
        values
      );
      enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 2000 });
      resetForm();
    } catch (error: unknown) {
      const errorMessage = isAxiosError(error) ? error.response?.data.detail : '';
      const message = ['Unable to send message', errorMessage].filter(Boolean).join(': ');
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    } finally {
      setSubmitting(false);
    }
  };
};

export default useOnSubmit;
