import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import type { FC } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { schema } from '../../contact/schema';
import type { ContactRequestBody } from '../../contact/types';
import { Tooltip } from '../tooltip';
import { sendMessage } from './send-message';
import styles from './styles.module.css';

export const ContactForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ContactRequestBody>({ resolver: yupResolver(schema) });

  const showError = useCallback(
    (name: keyof ContactRequestBody) =>
      Boolean(touchedFields[name] && errors[name]),
    [errors, touchedFields],
  );

  const onSubmit: SubmitHandler<ContactRequestBody> = useCallback(
    async data => {
      try {
        await sendMessage(data);
        toast.success('Message Sent');
        reset();
      } catch (error: unknown) {
        toast.error((error as Error).message);
      }
    },
    [reset],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Tooltip
        message={errors?.name?.message ?? ''}
        isVisible={showError('name')}
      >
        <input
          aria-invalid={errors?.name ? 'true' : 'false'}
          aria-label="Name"
          className={classNames(styles.field, {
            [styles.error]: showError('name'),
          })}
          defaultValue=""
          placeholder="Name"
          type="text"
          {...register('name')}
        />
      </Tooltip>
      <Tooltip
        message={errors?.email?.message ?? ''}
        isVisible={showError('email')}
      >
        <input
          aria-invalid={errors?.email ? 'true' : 'false'}
          aria-label="Email"
          className={classNames(styles.field, {
            [styles.error]: showError('email'),
          })}
          defaultValue=""
          placeholder="Email"
          type="email"
          {...register('email')}
        />
      </Tooltip>
      <Tooltip
        message={errors?.message?.message ?? ''}
        isVisible={showError('message')}
      >
        <textarea
          aria-invalid={errors?.message ? 'true' : 'false'}
          aria-label="Message"
          className={classNames(styles.field, {
            [styles.error]: showError('message'),
          })}
          defaultValue=""
          placeholder="Message"
          {...register('message')}
        />
      </Tooltip>

      <input
        className={classNames(styles.button, {
          [styles.submitting]: isSubmitting,
        })}
        type="submit"
        value={isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
        disabled={isSubmitting}
      />
    </form>
  );
};
