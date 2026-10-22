'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import type { FC } from 'react';
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { FieldErrors, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { FieldError } from '@/components/field-error';
import { sendMessage } from '@/contact/actions';
import { HONEYPOT_FIELD } from '@/contact/honeypot';
import { schema } from '@/contact/schema';
import type { ContactFormState, ContactRequestBody } from '@/contact/types';

import styles from './styles.module.css';

const INITIAL_STATE: ContactFormState = { status: 'idle' };

const toFieldErrors = (
  state: ContactFormState,
): FieldErrors<ContactRequestBody> | undefined => {
  if (state.status !== 'invalid') {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(state.errors).map(([name, message]) => [
      name,
      { message, type: 'server' },
    ]),
  );
};

export const ContactForm: FC = () => {
  const [state, formAction, pending] = useActionState(
    sendMessage,
    INITIAL_STATE,
  );
  const serverErrors = useMemo(() => toFieldErrors(state), [state]);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactRequestBody>({
    errors: serverErrors,
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

  useEffect(() => {
    if (state.status === 'success') {
      toast.success('Message Sent');
      reset();
    } else if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state, reset]);

  const onValid: SubmitHandler<ContactRequestBody> = useCallback(
    data => {
      const formData = new FormData();
      for (const [name, value] of Object.entries(data)) {
        formData.set(name, value);
      }
      // The honeypot isn't registered with RHF, so `data` doesn't include it
      formData.set(HONEYPOT_FIELD, honeypotRef.current?.value ?? '');
      startTransition(() => formAction(formData));
    },
    [formAction],
  );

  return (
    <form
      action={formAction}
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onValid)}
    >
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
      <div aria-hidden="true" className={styles.honeypot}>
        <input
          aria-label="Website"
          autoComplete="off"
          defaultValue=""
          name={HONEYPOT_FIELD}
          ref={honeypotRef}
          tabIndex={-1}
          type="text"
        />
      </div>

      <input
        className={classNames(styles.button, {
          [styles.submitting]: pending,
        })}
        disabled={pending}
        type="submit"
        value={pending ? 'SUBMITTING' : 'SUBMIT'}
      />
      <noscript>
        {state.status === 'success' && <p>Message sent.</p>}
        {state.status === 'error' && <p>{state.message}</p>}
      </noscript>
    </form>
  );
};
