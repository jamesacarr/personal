// @vitest-environment happy-dom
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-hot-toast';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { sendMessage } from '@/contact/actions';
import type { ContactFormState } from '@/contact/types';

import { ContactForm } from './contact-form.component';
import styles from './styles.module.css';

vi.mock('react-hot-toast');
vi.mock('@/contact/actions');
const toastMock = vi.mocked(toast);
const sendMessageMock = vi.mocked(sendMessage);

const fillValidForm = async () => {
  await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
  await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
  await userEvent.type(
    screen.getByLabelText('Message'),
    'This is a test message',
  );
};

// A real server action deserialises a fresh state object per call, so each
// mocked call returns a new object too.
const actionReturns = (state: ContactFormState) => {
  sendMessageMock.mockImplementation(async () => ({ ...state }));
};

describe('ContactForm', () => {
  describe('behaviour', () => {
    beforeEach(() => {
      actionReturns({ status: 'success' });
    });

    it('does not submit when name missing', async () => {
      render(<ContactForm />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      const email = screen.getByLabelText('Email');
      await userEvent.type(email, 'test@test.com');
      const message = screen.getByLabelText('Message');
      await userEvent.type(message, 'This is a test message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      expect(name).toBeInvalid();
      expect(sendMessageMock).not.toHaveBeenCalled();
    });

    it('does not submit when email missing', async () => {
      render(<ContactForm />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      await userEvent.type(name, 'John Doe');
      const email = screen.getByLabelText('Email');
      const message = screen.getByLabelText('Message');
      await userEvent.type(message, 'This is a test message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      expect(email).toBeInvalid();
      expect(sendMessageMock).not.toHaveBeenCalled();
    });

    it('does not submit when email invalid', async () => {
      render(<ContactForm />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      await userEvent.type(name, 'John Doe');
      const email = screen.getByLabelText('Email');
      await userEvent.type(email, 'not-an-email');
      const message = screen.getByLabelText('Message');
      await userEvent.type(message, 'This is a test message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      expect(email).toBeInvalid();
      expect(sendMessageMock).not.toHaveBeenCalled();
    });

    it('does not submit when message missing', async () => {
      render(<ContactForm />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      await userEvent.type(name, 'John Doe');
      const email = screen.getByLabelText('Email');
      await userEvent.type(email, 'test@test.com');
      const message = screen.getByLabelText('Message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      expect(message).toBeInvalid();
      expect(sendMessageMock).not.toHaveBeenCalled();
    });

    it('does not submit when message too short', async () => {
      render(<ContactForm />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      await userEvent.type(name, 'John Doe');
      const email = screen.getByLabelText('Email');
      await userEvent.type(email, 'test@test.com');
      const message = screen.getByLabelText('Message');
      await userEvent.type(message, 'Short message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      expect(message).toBeInvalid();
      expect(sendMessageMock).not.toHaveBeenCalled();
    });

    it('shows every required error at once when submitting an empty form', async () => {
      render(<ContactForm />);

      await userEvent.click(screen.getByText('SUBMIT'));

      const fields = [
        [screen.getByLabelText('Name'), 'name-error'],
        [screen.getByLabelText('Email'), 'email-error'],
        [screen.getByLabelText('Message'), 'message-error'],
      ] as const;

      for (const [field, errorId] of fields) {
        expect(field).toHaveAttribute('aria-invalid', 'true');
        expect(field).toHaveClass(styles.error);
        expect(field).toHaveAttribute('aria-describedby', errorId);
        expect(document.getElementById(errorId)).toHaveTextContent('Required');
      }
      expect(screen.getAllByText('Required')).toHaveLength(3);
      expect(screen.getByLabelText('Name')).toHaveFocus();
      expect(sendMessageMock).not.toHaveBeenCalled();
    });

    it('disables native constraint validation', () => {
      const { container } = render(<ContactForm />);

      expect(container.querySelector('form')).toHaveAttribute('novalidate');
    });

    it('shows an inline error for an invalid email on submit', async () => {
      render(<ContactForm />);

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
      await userEvent.type(
        screen.getByLabelText('Message'),
        'This is a test message',
      );
      await userEvent.type(screen.getByLabelText('Email'), 'foo');
      await userEvent.click(screen.getByText('SUBMIT'));

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(sendMessageMock).not.toHaveBeenCalled();
    });

    it('shows an error on blur and clears it once corrected', async () => {
      render(<ContactForm />);

      const email = screen.getByLabelText('Email');
      await userEvent.click(email);
      await userEvent.tab();

      const emailError = document.getElementById('email-error');
      await waitFor(() => {
        expect(emailError).toHaveTextContent('Required');
      });
      expect(email).toHaveAttribute('aria-describedby', 'email-error');

      await userEvent.type(email, 'test@test.com');

      await waitFor(() => {
        expect(emailError).toBeEmptyDOMElement();
      });
      expect(email).not.toHaveAttribute('aria-describedby');
      expect(email).toHaveAttribute('aria-invalid', 'false');
    });

    it('shows the word count error for a short message', async () => {
      render(<ContactForm />);

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
      await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
      await userEvent.type(screen.getByLabelText('Message'), 'Short message');
      await userEvent.click(screen.getByText('SUBMIT'));

      expect(document.getElementById('message-error')).toHaveTextContent(
        'Must be at least 5 words',
      );
      expect(sendMessageMock).not.toHaveBeenCalled();
    });

    it('sends valid data to the action', async () => {
      let resolveAction: (state: ContactFormState) => void = () => undefined;
      sendMessageMock.mockImplementation(
        () =>
          new Promise<ContactFormState>(resolve => {
            resolveAction = resolve;
          }),
      );
      render(<ContactForm />);

      await fillValidForm();
      await userEvent.click(screen.getByText('SUBMIT'));

      const button = await screen.findByDisplayValue('SUBMITTING');
      expect(button).toBeDisabled();
      expect(sendMessageMock).toHaveBeenCalledOnce();

      const formData = sendMessageMock.mock.calls[0][1];
      expect(formData).toBeInstanceOf(FormData);
      expect(formData.get('name')).toBe('John Doe');
      expect(formData.get('email')).toBe('test@test.com');
      expect(formData.get('message')).toBe('This is a test message');

      resolveAction({ status: 'success' });
      expect(await screen.findByDisplayValue('SUBMIT')).toBeEnabled();
    });

    it('sends an empty honeypot with valid data', async () => {
      render(<ContactForm />);

      await fillValidForm();
      await userEvent.click(screen.getByText('SUBMIT'));

      await waitFor(() => {
        expect(sendMessageMock).toHaveBeenCalledOnce();
      });
      expect(sendMessageMock.mock.calls[0][1].get('website')).toBe('');
    });

    it('forwards a filled honeypot to the action', async () => {
      const { container } = render(<ContactForm />);

      await fillValidForm();
      const honeypot = container.querySelector('input[name="website"]');
      if (!honeypot) {
        throw new Error('Honeypot not rendered');
      }
      await userEvent.type(honeypot, 'https://spam.example.com');
      await userEvent.click(screen.getByText('SUBMIT'));

      await waitFor(() => {
        expect(sendMessageMock).toHaveBeenCalledOnce();
      });
      expect(sendMessageMock.mock.calls[0][1].get('website')).toBe(
        'https://spam.example.com',
      );
    });

    it('shows server field errors inline', async () => {
      actionReturns({
        errors: { message: 'Message rejected by server' },
        status: 'invalid',
      });
      render(<ContactForm />);

      await fillValidForm();
      await userEvent.click(screen.getByText('SUBMIT'));

      await waitFor(() => {
        expect(document.getElementById('message-error')).toHaveTextContent(
          'Message rejected by server',
        );
      });
      const message = screen.getByLabelText('Message');
      expect(message).toHaveAttribute('aria-invalid', 'true');
      expect(message).toHaveAttribute('aria-describedby', 'message-error');
      expect(toastMock.success).not.toHaveBeenCalled();
      expect(toastMock.error).not.toHaveBeenCalled();
    });

    it('shows a success toast and clears the form on success', async () => {
      actionReturns({ status: 'success' });
      render(<ContactForm />);

      await fillValidForm();
      await userEvent.click(screen.getByText('SUBMIT'));

      await waitFor(() => {
        expect(toastMock.success).toHaveBeenCalledWith('Message Sent');
      });
      expect(toastMock.error).not.toHaveBeenCalled();
      expect(screen.getByLabelText('Name')).toHaveValue('');
      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(screen.getByLabelText('Message')).toHaveValue('');
    });

    it('shows an error toast and keeps the values on error', async () => {
      actionReturns({ message: 'Something went wrong', status: 'error' });
      render(<ContactForm />);

      await fillValidForm();
      await userEvent.click(screen.getByText('SUBMIT'));

      await waitFor(() => {
        expect(toastMock.error).toHaveBeenCalledWith('Something went wrong');
      });
      expect(toastMock.success).not.toHaveBeenCalled();
      expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
      expect(screen.getByLabelText('Email')).toHaveValue('test@test.com');
      expect(screen.getByLabelText('Message')).toHaveValue(
        'This is a test message',
      );
    });

    it('shows an error toast for each consecutive error', async () => {
      actionReturns({ message: 'Something went wrong', status: 'error' });
      render(<ContactForm />);

      await fillValidForm();
      await userEvent.click(screen.getByText('SUBMIT'));
      await waitFor(() => {
        expect(toastMock.error).toHaveBeenCalledOnce();
      });

      await userEvent.click(await screen.findByDisplayValue('SUBMIT'));
      await waitFor(() => {
        expect(toastMock.error).toHaveBeenCalledTimes(2);
      });
      expect(sendMessageMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('accessibility', () => {
    it('hides the honeypot from people', () => {
      const { container } = render(<ContactForm />);

      const honeypot = container.querySelector('input[name="website"]');
      expect(honeypot).toHaveAttribute('tabindex', '-1');
      expect(honeypot).toHaveAttribute('autocomplete', 'off');
      const wrapper = honeypot?.closest('[aria-hidden="true"]');
      expect(wrapper).toHaveClass(styles.honeypot);
    });

    it('skips the honeypot when tabbing', async () => {
      render(<ContactForm />);

      await userEvent.click(screen.getByLabelText('Message'));
      await userEvent.tab();

      expect(screen.getByDisplayValue('SUBMIT')).toHaveFocus();
    });

    it('has no violations', async () => {
      const { container } = render(<ContactForm />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with every error visible', async () => {
      const { container } = render(<ContactForm />);

      await userEvent.click(screen.getByText('SUBMIT'));
      expect(await screen.findAllByText('Required')).toHaveLength(3);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
