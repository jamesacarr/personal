/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { toast } from 'react-hot-toast';

import { ContactForm } from './contact-form.component';

jest.mock('react-hot-toast');
const toastMock = jest.mocked(toast);

describe('ContactForm', () => {
  describe('behaviour', () => {
    beforeEach(() => {
      fetchMock.enableMocks();
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
      expect(fetch).not.toHaveBeenCalled();
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
      expect(fetch).not.toHaveBeenCalled();
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
      expect(fetch).not.toHaveBeenCalled();
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
      expect(fetch).not.toHaveBeenCalled();
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
      expect(fetch).not.toHaveBeenCalled();
    });

    it('submits with valid data', async () => {
      toastMock.error = jest.fn();
      toastMock.success = jest.fn();
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

      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'test@test.com',
          message: 'This is a test message',
        }),
      });

      expect(toastMock.success).toHaveBeenCalledWith('Message Sent');
      expect(toastMock.error).not.toHaveBeenCalled();
    });

    it('handles errors from API', async () => {
      toastMock.error = jest.fn();
      toastMock.success = jest.fn();
      fetchMock.mockReject(new Error('Testing Error'));
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
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'test@test.com',
          message: 'This is a test message',
        }),
      });

      expect(toastMock.success).not.toHaveBeenCalled();
      expect(toastMock.error).toHaveBeenCalledWith('Testing Error');
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
