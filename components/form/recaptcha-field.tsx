import React, { FC, useCallback } from 'react';
import { useFormikContext } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCAPTCHAField: FC = () => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (token: string | null): void => {
    setFieldValue('token', token);
  };

  const ref = useCallback((node: ReCAPTCHA | null) => {
    if (node !== null) {
      node.execute();
    }
  }, []);

  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={process.env.RECAPTCHA_SITE_KEY ?? ''}
      size="invisible"
      theme="dark"
      onChange={handleChange}
    />
  );
};

export default ReCAPTCHAField;
