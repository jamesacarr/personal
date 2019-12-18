import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCAPTCHAField: FC = () => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (token: string | null): void => {
    setFieldValue('token', token);
  };

  return <ReCAPTCHA sitekey="6LcZTMgUAAAAADZI3-KQeCh1TAPOLQ702lIHzlcZ" onChange={handleChange} />;
};

export default ReCAPTCHAField;
