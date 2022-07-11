import { yupResolver } from '@hookform/resolvers/yup';
import ky, { HTTPError as KyError, TimeoutError } from 'ky-universal';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { schema } from '../../api/contact';
import Tooltip from '../tooltip';

import { buttonStyles, buttonStylesSubmitting, fieldErrorStyles, fieldStyles, formStyles } from './form.styles';

import type { ContactRequestBody } from '../../api/contact';
import type { ErrorResponseBody } from '../../api/middleware';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const FormContainer: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<ContactRequestBody>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const showError = (name: keyof ContactRequestBody) => Boolean(touchedFields[name] && errors[name]);

  const onSubmit: SubmitHandler<ContactRequestBody> = useCallback(
    async data => {
      try {
        await ky.post('/api/contact', { json: data });
        enqueueSnackbar('Message sent', { variant: 'success', autoHideDuration: 2000 });
        reset();
      } catch (error: unknown) {
        const messages = ['Unable to send message'];

        if (error instanceof KyError) {
          const errorBody = (await error.response.json()) as ErrorResponseBody;
          messages.push(errorBody.detail);
        } else if (error instanceof TimeoutError) {
          messages.push('Request timed out');
        } else {
          messages.push((error as Error).message);
        }

        enqueueSnackbar(messages.join(': '), { variant: 'error', autoHideDuration: 2000 });
      }
    },
    [enqueueSnackbar, reset]
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

export default FormContainer;
