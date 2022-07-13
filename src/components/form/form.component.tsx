import { yupResolver } from '@hookform/resolvers/yup';
import ky from 'ky-universal';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { schema } from '../../contact';
import Tooltip from '../tooltip';

import { buttonStyles, buttonStylesSubmitting, fieldErrorStyles, fieldStyles, formStyles } from './form.styles';
import getErrorMessage from './get-error-message';

import type { ContactRequestBody } from '../../contact';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const Form: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<ContactRequestBody>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const showError = useCallback(
    (name: keyof ContactRequestBody) => Boolean(touchedFields[name] && errors[name]),
    [errors, touchedFields]
  );

  const onSubmit: SubmitHandler<ContactRequestBody> = useCallback(
    async data => {
      try {
        await ky.post('/api/contact', { json: data });
        toast.success('Message Sent');
        reset();
      } catch (error: unknown) {
        const message = await getErrorMessage(error);
        toast.error(message);
      }
    },
    [reset]
  );

  return (
    <form css={formStyles} onSubmit={handleSubmit(onSubmit)}>
      <Tooltip message={errors?.name?.message ?? ''} visible={showError('name')}>
        <input
          css={[fieldStyles, showError('name') && fieldErrorStyles]}
          defaultValue=""
          placeholder="Name"
          type="text"
          {...register('name')}
        />
      </Tooltip>
      <Tooltip message={errors?.email?.message ?? ''} visible={showError('email')}>
        <input
          css={[fieldStyles, showError('email') && fieldErrorStyles]}
          defaultValue=""
          placeholder="Email"
          type="email"
          {...register('email')}
        />
      </Tooltip>
      <Tooltip message={errors?.message?.message ?? ''} visible={showError('message')}>
        <textarea
          css={[fieldStyles, showError('message') && fieldErrorStyles]}
          defaultValue=""
          placeholder="Message"
          {...register('message')}
        />
      </Tooltip>

      <input
        css={[buttonStyles, isSubmitting && buttonStylesSubmitting]}
        type="submit"
        value={isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
        disabled={isSubmitting || !isValid}
      />
    </form>
  );
};

export default Form;
