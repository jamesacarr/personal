import axios from 'axios';
import { FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import ReactGA from 'react-ga';

import { ContactRequestBody, ContactResponseBody } from '../../api/contact';
import { FormValues } from '../../types';
import { getRecaptchaToken } from '../../utils';

type SubmitFunc = (values: FormValues, actions: FormikHelpers<FormValues>) => Promise<void>;

const useSubmitForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const submitForm: SubmitFunc = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = await getRecaptchaToken('contact');
      await axios.post<ContactRequestBody, ContactResponseBody>('/api/contact', { ...values, token });
      ReactGA.event({ category: 'Contact', action: 'Submit Form' });
      enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 2000 });
      resetForm();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const message = ['Unable to send message', error.response?.data?.error?.message].filter(Boolean).join(': ');
      ReactGA.exception({ description: 'Submit Form failed' });
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  return submitForm;
};

export default useSubmitForm;
