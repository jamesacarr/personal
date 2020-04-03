/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import ReactGA from 'react-ga';
import { object, string } from 'yup';

import { APIResponse, FormValues } from '../../types';
import { getRecaptchaToken } from '../../utils';
import { buttonStyles, formStyles, inputStyles } from './form.styles';

type SubmitFunc = (values: FormValues, actions: FormikHelpers<FormValues>) => Promise<void>;

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
});

const FormContainer: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const submitForm: SubmitFunc = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = await getRecaptchaToken('contact');
      await axios.post<FormValues, APIResponse>('/api/contact', { ...values, token });
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
