import { Formik, Form } from 'formik';
import { FC } from 'react';

import { schema } from '../../api/contact';
import Field from '../field';

import { buttonStyles, buttonStylesSubmitting, formStyles } from './form.styles';
import useFormProps from './use-form-props';

const INITIAL_VALUES = {
  name: '',
  email: '',
  message: '',
};

const FormContainer: FC = () => {
  const onSubmit = useFormProps();

  return (
    <Formik validateOnMount initialValues={INITIAL_VALUES} validationSchema={schema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }) => (
        <Form css={formStyles}>
          <Field name="name" />
          <Field name="email" type="email" />
          <Field multiline name="message" />
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
