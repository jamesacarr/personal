/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Formik, Form, Field, FormikActions } from 'formik';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { EnqueueSnackbar, FormValues } from '../../types';
import { buttonStyles, formStyles, inputStyles } from './form.styles';
import validator from './validator';

type SubmitFunc = (
  enqueueSnackbar: EnqueueSnackbar
) => (values: FormValues, actions: FormikActions<FormValues>) => void;

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
};

const submitMessage: SubmitFunc = enqueueSnackbar => (values, { setSubmitting, resetForm }): void => {
  setTimeout(() => {
    console.log(JSON.stringify(values, null, 2));
    setSubmitting(false);
    resetForm();
    enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 1000 });
  }, 3000);
};

const FormContainer = ({ enqueueSnackbar }: WithSnackbarProps): JSX.Element => (
  <Formik initialValues={initialValues} validate={validator} onSubmit={submitMessage(enqueueSnackbar)}>
    {({ errors, touched, isSubmitting }) => (
      <Form css={formStyles}>
        <Field css={inputStyles(Boolean(errors.name && touched.name))} type="text" name="name" placeholder="Name" />
        <Field
          css={inputStyles(Boolean(errors.email && touched.email))}
          type="email"
          name="email"
          placeholder="Email"
        />
        <Field
          css={inputStyles(Boolean(errors.message && touched.message))}
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
