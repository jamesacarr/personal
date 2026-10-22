import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import type { FC } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { FieldError } from '@/components/field-error';
import { schema } from '@/contact/schema';
import type { ContactRequestBody } from '@/contact/types';

import { sendMessage } from './send-message';
import styles from './styles.module.css';

export const ContactForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestBody>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const errorProps = (name: keyof ContactRequestBody) => ({
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    'aria-invalid': errors[name] ? ('true' as const) : ('false' as const),
    className: classNames(styles.field, {
      [styles.error]: Boolean(errors[name]),
    }),
  });

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
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <input
        aria-label="Name"
        defaultValue=""
        placeholder="Name"
        type="text"
        {...errorProps('name')}
        {...register('name')}
      />
      <FieldError id="name-error" message={errors.name?.message} />
      <input
        aria-label="Email"
        defaultValue=""
        placeholder="Email"
        type="email"
        {...errorProps('email')}
        {...register('email')}
      />
      <FieldError id="email-error" message={errors.email?.message} />
      <textarea
        aria-label="Message"
        defaultValue=""
        placeholder="Message"
        {...errorProps('message')}
        {...register('message')}
      />
      <FieldError id="message-error" message={errors.message?.message} />

      <input
        className={classNames(styles.button, {
          [styles.submitting]: isSubmitting,
        })}
        disabled={isSubmitting}
        type="submit"
        value={isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
      />
    </form>
  );
};
