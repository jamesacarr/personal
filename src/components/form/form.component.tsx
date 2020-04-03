/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Formik, Form, Field } from 'formik';
import { FC } from 'react';

import { buttonStyles, buttonStylesSubmitting, formStyles, inputStyles, inputStylesError } from './form.styles';
import useFormProps from './use-form-props';

const FormContainer: FC = () => {
  const props = useFormProps();

  return (
    <Formik validateOnMount {...props}>
      {({ errors, touched, isSubmitting, isValid }) => (
        <Form css={formStyles}>
          <Field
            required
            css={[inputStyles, Boolean(errors.name && touched.name) && inputStylesError]}
            aria-label="Your name"
            type="text"
            name="name"
            placeholder="Name"
          />
          <Field
            required
            css={[inputStyles, Boolean(errors.email && touched.email) && inputStylesError]}
            aria-label="Email address"
            name="email"
            placeholder="Email"
            type="email"
          />
          <Field
            required
            css={[inputStyles, Boolean(errors.message && touched.message) && inputStylesError]}
            aria-label="Message"
            component="textarea"
            name="message"
            placeholder="Your Message"
          />
          <input
            css={[buttonStyles, isSubmitting && buttonStylesSubmitting]}
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
