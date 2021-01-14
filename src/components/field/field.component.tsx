/** @jsxImportSource @emotion/react */
/* eslint-disable react/react-in-jsx-scope */

import { FC } from 'react';
import { useField } from 'formik';

import Tooltip from '../tooltip';
import { fieldWrapperStyles, fieldStyles, errorStyles } from './field.styles';

interface Props {
  name: string;
  multiline?: boolean;
  type?: string;
}

const Field: FC<Props> = ({ name, multiline = false, type = 'text' }) => {
  const [field, meta] = useField<string>(name);
  const Component = multiline ? 'textarea' : 'input';
  const placeholder = name.charAt(0).toUpperCase() + name.slice(1);
  const showError = Boolean(meta.touched && meta.error);

  return (
    <div css={fieldWrapperStyles}>
      <Tooltip message={meta.error ?? ''} visible={showError}>
        <Component
          required
          css={[fieldStyles, showError && errorStyles]}
          placeholder={placeholder}
          aria-label={placeholder}
          type={type}
          {...field}
        />
      </Tooltip>
    </div>
  );
};

export default Field;
