/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Formik, Form, Field } from 'formik';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { FC } from 'react';

import { FormValues } from '../../types';
import { buttonStyles, formStyles, inputStyles } from './form.styles';
import submitMessage from './submit-message';
import validator from './validator';

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
};

const FormContainer: FC<WithSnackbarProps> = ({ enqueueSnackbar }) => (
  <Formik initialValues={initialValues} validate={validator} onSubmit={submitMessage(enqueueSnackbar)}>
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
