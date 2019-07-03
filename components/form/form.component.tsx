/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Formik, Form, Field, FormikActions } from 'formik';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import axios from 'axios';

import { EnqueueSnackbar, FormValues } from '../../types';
import { buttonStyles, formStyles, inputStyles } from './form.styles';
import validator from './validator';

type SubmitFunc = (
  enqueueSnackbar: EnqueueSnackbar
) => (values: FormValues, actions: FormikActions<FormValues>) => Promise<void>;

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
};

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

const FormContainer = ({ enqueueSnackbar }: WithSnackbarProps): JSX.Element => (
  <Formik initialValues={initialValues} validate={validator} onSubmit={submitMessage(enqueueSnackbar)}>
    {({ errors, touched, isSubmitting }) => (
      <Form css={formStyles}>
        <Field
          css={inputStyles(Boolean(errors.name && touched.name))}
          aria-label="Your name"
          type="text"
          name="name"
          placeholder="Name"
        />
        <Field
          css={inputStyles(Boolean(errors.email && touched.email))}
          aria-label="Email address"
          name="email"
          placeholder="Email"
          type="email"
        />
        <Field
          css={inputStyles(Boolean(errors.message && touched.message))}
          aria-label="Message"
          component="textarea"
          name="message"
          placeholder="Your Message"
        />
        <input
          css={buttonStyles(isSubmitting)}
          type="submit"
          value={isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
          disabled={isSubmitting}
        />
      </Form>
    )}
  </Formik>
);

export default withSnackbar(FormContainer);
