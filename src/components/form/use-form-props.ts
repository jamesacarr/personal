import axios, { AxiosError, AxiosResponse } from 'axios';
import { FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import { event, exception } from 'react-ga';

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
      event({ category: 'contact', action: 'submit' });
      enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 2000 });
      resetForm();
    } catch (error: unknown) {
      const errorMessage = isAxiosError(error) ? error.response?.data.error.message : '';
      const message = ['Unable to send message', errorMessage].filter(Boolean).join(': ');
      exception({ description: 'Submit Form failed' });
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    } finally {
      setSubmitting(false);
    }
  };
};

export default useOnSubmit;
