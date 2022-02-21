import axios, { AxiosError, AxiosResponse } from 'axios';
import { FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';

import { ContactRequestBody, ContactResponseBody } from '../../api/contact';
import { ErrorResponseBody } from '../../api/middleware';

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
      const errorMessage = isAxiosError(error) ? error.response?.data.error.message : '';
      const message = ['Unable to send message', errorMessage].filter(Boolean).join(': ');
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    } finally {
      setSubmitting(false);
    }
  };
};

export default useOnSubmit;
