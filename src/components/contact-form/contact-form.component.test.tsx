// @vitest-environment happy-dom
import fetchMock from '@fetch-mock/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-hot-toast';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { axe } from 'vitest-axe';

import { ContactForm } from './contact-form.component';
import styles from './styles.module.css';

vi.mock('react-hot-toast');
const toastMock = vi.mocked(toast);

describe('ContactForm', () => {
  describe('behaviour', () => {
    beforeAll(() => {
      fetchMock.mockGlobal();
    });

    afterAll(() => {
      fetchMock.unmockGlobal();
    });

    beforeEach(() => {
      fetchMock.mockReset();
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
      expect(fetchMock).not.toHaveFetched();
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
      expect(fetchMock).not.toHaveFetched();
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
      expect(fetchMock).not.toHaveFetched();
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
      expect(fetchMock).not.toHaveFetched();
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
      expect(fetchMock).not.toHaveFetched();
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
      expect(fetchMock).not.toHaveFetched();
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
      expect(fetchMock).not.toHaveFetched();
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
      expect(fetchMock).not.toHaveFetched();
    });

    it('submits with valid data', async () => {
      fetchMock.route('/api/contact', 200);
      toastMock.error = vi.fn();
      toastMock.success = vi.fn();
      render(<ContactForm />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      await userEvent.type(name, 'John Doe');
      const email = screen.getByLabelText('Email');
      await userEvent.type(email, 'test@test.com');
      const message = screen.getByLabelText('Message');
      await userEvent.type(message, 'This is a test message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      expect(name).toBeValid();
      expect(email).toBeValid();
      expect(message).toBeValid();

      expect(fetchMock).toHaveFetched('/api/contact', {
        body: {
          email: 'test@test.com',
          message: 'This is a test message',
          name: 'John Doe',
        },
      });

      expect(toastMock.success).toHaveBeenCalledWith('Message Sent');
      expect(toastMock.error).not.toHaveBeenCalled();
    });

    it('handles errors from API', async () => {
      fetchMock.route('/api/contact', 500);
      toastMock.error = vi.fn();
      toastMock.success = vi.fn();
      render(<ContactForm />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      await userEvent.type(name, 'John Doe');
      const email = screen.getByLabelText('Email');
      await userEvent.type(email, 'test@test.com');
      const message = screen.getByLabelText('Message');
      await userEvent.type(message, 'This is a test message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      // Wait for submitting to finish
      expect(fetchMock).toHaveFetched('/api/contact', {
        body: {
          email: 'test@test.com',
          message: 'This is a test message',
          name: 'John Doe',
        },
      });

      expect(toastMock.success).not.toHaveBeenCalled();
      expect(toastMock.error).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('accessibility', () => {
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
