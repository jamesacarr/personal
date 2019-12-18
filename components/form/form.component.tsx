/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Formik, Form, Field } from 'formik';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { FC } from 'react';
import { object, string } from 'yup';

import { FormValues } from '../../types';
import { buttonStyles, formStyles, inputStyles } from './form.styles';
import ReCAPTCHAField from './recaptcha-field';
import submitMessage from './submit-message';

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
  token: '',
};

const validationSchema = object().shape({
  name: string().required('Required'),
  email: string()
    .email('Invalid email')
    .required('Required'),
  message: string().required('Required'),
  token: string().required('Required'),
});

const FormContainer: FC<WithSnackbarProps> = ({ enqueueSnackbar }) => (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitMessage(enqueueSnackbar)}>
    {({ errors, touched, isSubmitting }) => (
      <Form css={formStyles}>
        <Field
          required
          css={inputStyles(Boolean(errors.name && touched.name))}
          aria-label="Your name"
          type="text"
          name="name"
          placeholder="Name"
        />
        <Field
          required
          css={inputStyles(Boolean(errors.email && touched.email))}
          aria-label="Email address"
          name="email"
          placeholder="Email"
          type="email"
        />
        <Field
          required
          css={inputStyles(Boolean(errors.message && touched.message))}
          aria-label="Message"
          component="textarea"
          name="message"
          placeholder="Your Message"
        />
        <ReCAPTCHAField />
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
