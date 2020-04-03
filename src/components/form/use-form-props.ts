import axios from 'axios';
import { FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import ReactGA from 'react-ga';

import { ContactRequestBody, ContactResponseBody } from '../../api/contact';
import { getRecaptchaToken } from '../../utils';
import validationSchema from './validation-schema';

type SubmitFunc = (values: ContactRequestBody, actions: FormikHelpers<ContactRequestBody>) => Promise<void>;

const initialValues = {
  name: '',
  email: '',
  message: '',
  token: '',
};

const useFormProps = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitFunc = async (values, { setSubmitting, resetForm }) => {
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

  return { initialValues, onSubmit, validationSchema };
};

export default useFormProps;
