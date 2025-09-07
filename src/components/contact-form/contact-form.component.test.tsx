// @vitest-environment happy-dom
import fetchMock from '@fetch-mock/vitest';
import { render, screen } from '@testing-library/react';
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
          name: 'John Doe',
          email: 'test@test.com',
          message: 'This is a test message',
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
          name: 'John Doe',
          email: 'test@test.com',
          message: 'This is a test message',
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
  });
});
