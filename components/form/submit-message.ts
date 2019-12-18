import axios from 'axios';
import { FormikHelpers } from 'formik';
import { OptionsObject } from 'notistack';

import { FormValues } from '../../types';

export type EnqueueSnackbar = (
  message: string | React.ReactNode,
  options?: OptionsObject
) => OptionsObject['key'] | null;

type SubmitFunc = (
  enqueueSnackbar: EnqueueSnackbar
) => (values: FormValues, actions: FormikHelpers<FormValues>) => Promise<void>;

const submitMessage: SubmitFunc = enqueueSnackbar => async (values, { setSubmitting, resetForm }) => {
  try {
    await axios.post('https://api.jamescarr.dev/contact', values);
    enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 2000 });
    resetForm();
  } catch {
    enqueueSnackbar('Unable to send message', { variant: 'error', autoHideDuration: 2000 });
  } finally {
    setSubmitting(false);
  }
};

export default submitMessage;
