/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Formik, Form, Field } from 'formik';
import { FC } from 'react';

import { FormValues } from '../../types';
import { buttonStyles, formStyles, inputStyles } from './form.styles';
import useSubmitForm from './use-submit-form';
import validationSchema from './validation-schema';

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
  token: '',
};

const FormContainer: FC = () => {
  const submitForm = useSubmitForm();

  return (
    <Formik validateOnMount initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
      {({ errors, touched, isSubmitting, isValid }) => (
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
            disabled={isSubmitting || !isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormContainer;
