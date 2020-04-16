import axios, { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import ReactGA from 'react-ga';

import { ContactRequestBody, ContactResponseBody, ErrorResponseBody } from '../../api/types';
import validationSchema from './validation-schema';

type OnSubmit = (values: ContactRequestBody, actions: FormikHelpers<ContactRequestBody>) => Promise<void>;

type UseFormProps = () => {
  onSubmit: OnSubmit;
  validationSchema: typeof validationSchema;
};

const isAxiosError = (error: Error | AxiosError<ErrorResponseBody>): error is AxiosError<ErrorResponseBody> => {
  return (error as AxiosError<ErrorResponseBody>).isAxiosError;
};

const useFormProps: UseFormProps = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: OnSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post<ContactRequestBody, ContactResponseBody>('/api/contact', values);
      ReactGA.event({ category: 'Contact', action: 'Submit Form' });
      enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 2000 });
      resetForm();
    } catch (error) {
      const errorMessage = isAxiosError(error) ? error.response?.data.error.message : '';
      const message = ['Unable to send message', errorMessage].filter(Boolean).join(': ');
      ReactGA.exception({ description: 'Submit Form failed' });
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  return { onSubmit, validationSchema };
};

export default useFormProps;
