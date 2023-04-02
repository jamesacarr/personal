/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { toast } from 'react-hot-toast';

import Form from './form.component';

jest.mock('react-hot-toast');
const toastMock = jest.mocked(toast);

describe('Form', () => {
  describe('behaviour', () => {
    describe('name', () => {
      it('does not submit when missing', async () => {
        const onSubmit = jest.fn(async () => {}); // eslint-disable-line @typescript-eslint/no-empty-function
        render(<Form onSubmit={onSubmit} />);

        // Fill in the form
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, 'james@jamescarr.dev');
        const message = screen.getByLabelText('Message');
        await userEvent.type(message, 'This is a test message');

        // Submit the data
        const button = screen.getByText('SUBMIT');
        await userEvent.click(button);

        // Wait for submitting to finish
        await waitFor(() => {
          expect(button).not.toHaveValue('SUBMITTING');
        });

        expect(onSubmit).not.toHaveBeenCalled();
      });
    });

    describe('email', () => {
      it('does not submit when missing', async () => {
        const onSubmit = jest.fn(async () => {}); // eslint-disable-line @typescript-eslint/no-empty-function
        render(<Form onSubmit={onSubmit} />);

        // Fill in the form
        const name = screen.getByLabelText('Name');
        await userEvent.type(name, 'James Carr');
        const message = screen.getByLabelText('Message');
        await userEvent.type(message, 'This is a test message');

        // Submit the data
        const button = screen.getByText('SUBMIT');
        await userEvent.click(button);

        // Wait for submitting to finish
        await waitFor(() => {
          expect(button).not.toHaveValue('SUBMITTING');
        });

        expect(onSubmit).not.toHaveBeenCalled();
      });

      it('does not submit when invalid', async () => {
        const onSubmit = jest.fn(async () => {}); // eslint-disable-line @typescript-eslint/no-empty-function
        render(<Form onSubmit={onSubmit} />);

        // Fill in the form
        const name = screen.getByLabelText('Name');
        await userEvent.type(name, 'James Carr');
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, 'not-an-email');
        const message = screen.getByLabelText('Message');
        await userEvent.type(message, 'This is a test message');

        // Submit the data
        const button = screen.getByText('SUBMIT');
        await userEvent.click(button);

        // Wait for submitting to finish
        await waitFor(() => {
          expect(button).not.toHaveValue('SUBMITTING');
        });

        expect(onSubmit).not.toHaveBeenCalled();
      });
    });

    describe('message', () => {
      it('does not submit when missing', async () => {
        const onSubmit = jest.fn(async () => {}); // eslint-disable-line @typescript-eslint/no-empty-function
        render(<Form onSubmit={onSubmit} />);

        // Fill in the form
        const name = screen.getByLabelText('Name');
        await userEvent.type(name, 'James Carr');
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, 'james@jamescarr.dev');

        // Submit the data
        const button = screen.getByText('SUBMIT');
        await userEvent.click(button);

        // Wait for submitting to finish
        await waitFor(() => {
          expect(button).not.toHaveValue('SUBMITTING');
        });

        expect(onSubmit).not.toHaveBeenCalled();
      });

      it('does not submit when too short', async () => {
        const onSubmit = jest.fn(async () => {}); // eslint-disable-line @typescript-eslint/no-empty-function
        render(<Form onSubmit={onSubmit} />);

        // Fill in the form
        const name = screen.getByLabelText('Name');
        await userEvent.type(name, 'James Carr');
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, 'james@jamescarr.dev');
        const message = screen.getByLabelText('Message');
        await userEvent.type(message, 'Short message');

        // Submit the data
        const button = screen.getByText('SUBMIT');
        await userEvent.click(button);

        // Wait for submitting to finish
        await waitFor(() => {
          expect(button).not.toHaveValue('SUBMITTING');
        });

        expect(onSubmit).not.toHaveBeenCalled();
      });
    });

    it('submits with valid data', async () => {
      toastMock.error = jest.fn();
      toastMock.success = jest.fn();
      const onSubmit = jest.fn(async () => {}); // eslint-disable-line @typescript-eslint/no-empty-function
      render(<Form onSubmit={onSubmit} />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      await userEvent.type(name, 'James Carr');
      const email = screen.getByLabelText('Email');
      await userEvent.type(email, 'james@jamescarr.dev');
      const message = screen.getByLabelText('Message');
      await userEvent.type(message, 'This is a test message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: 'James Carr',
          email: 'james@jamescarr.dev',
          message: 'This is a test message',
        });
      });

      expect(toastMock.success).toHaveBeenCalledWith('Message Sent');
      expect(toastMock.error).not.toHaveBeenCalled();
    });

    it('handles errors from API', async () => {
      toastMock.error = jest.fn();
      toastMock.success = jest.fn();
      const onSubmit = jest.fn(async () => {
        throw new Error('Testing Error');
      });
      render(<Form onSubmit={onSubmit} />);

      // Fill in the form
      const name = screen.getByLabelText('Name');
      await userEvent.type(name, 'James Carr');
      const email = screen.getByLabelText('Email');
      await userEvent.type(email, 'james@jamescarr.dev');
      const message = screen.getByLabelText('Message');
      await userEvent.type(message, 'This is a test message');

      // Submit the data
      const button = screen.getByText('SUBMIT');
      await userEvent.click(button);

      // Wait for submitting to finish
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: 'James Carr',
          email: 'james@jamescarr.dev',
          message: 'This is a test message',
        });
      });

      expect(toastMock.success).not.toHaveBeenCalled();
      expect(toastMock.error).toHaveBeenCalledWith('Testing Error');
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const onSubmit = jest.fn(async () => {}); // eslint-disable-line @typescript-eslint/no-empty-function
      const { container } = render(<Form onSubmit={onSubmit} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
