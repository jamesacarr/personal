import axios from 'axios';
import { FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import ReactGA from 'react-ga';

import { ContactRequestBody, ContactResponseBody } from '../../api/contact';
import { getRecaptchaToken } from '../../utils';
import validationSchema from './validation-schema';

type OnSubmit = (values: ContactRequestBody, actions: FormikHelpers<ContactRequestBody>) => Promise<void>;

type UseFormProps = () => {
  onSubmit: OnSubmit;
  validationSchema: typeof validationSchema;
};

const useFormProps: UseFormProps = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: OnSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = await getRecaptchaToken('contact');
      await axios.post<ContactRequestBody, ContactResponseBody>('/api/contact', { ...values, token });
      ReactGA.event({ category: 'Contact', action: 'Submit Form' });
      enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 2000 });
      resetForm();
    } catch (error) {
      const message = ['Unable to send message', error.response?.data?.error?.message].filter(Boolean).join(': ');
      ReactGA.exception({ description: 'Submit Form failed' });
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  return { onSubmit, validationSchema };
};

export default useFormProps;
