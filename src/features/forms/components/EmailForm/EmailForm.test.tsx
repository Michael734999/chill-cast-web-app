import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as useEmailForm from '@features/forms/hooks/useEmailForm';
import { EmailForm } from './EmailForm.component';
import { FormProvider, useForm } from 'react-hook-form';
import { EmailFormFields } from '@features/forms/types';
import React from 'react';

vi.mock('@features/forms/hooks/useEmailForm', () => ({
  useEmailForm: vi.fn(),
}));

describe('EmailForm Component', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const formMethods = useForm<EmailFormFields>();

    return <FormProvider {...formMethods}>{children}</FormProvider>;
  };

  it('should render the email form with input fields and buttons', () => {
    const useEmailFormSpy = vi.spyOn(useEmailForm, 'useEmailForm');
    useEmailFormSpy.mockReturnValue({
      loading: false,
      sendEmail: vi.fn(),
    });
    render(
      <Wrapper>
        <EmailForm />
      </Wrapper>
    );

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Write me a message here')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('should disable the submit button when the form is invalid', () => {
    const useEmailFormSpy = vi.spyOn(useEmailForm, 'useEmailForm');
    useEmailFormSpy.mockReturnValue({
      loading: false,
      sendEmail: vi.fn(),
    });
    render(<EmailForm />);

    const submitButton = screen.getByRole('button', { name: /send/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button when the form is valid', async () => {
    const useEmailFormSpy = vi.spyOn(useEmailForm, 'useEmailForm');
    useEmailFormSpy.mockReturnValue({
      loading: false,
      sendEmail: vi.fn(),
    });
    render(<EmailForm />);

    const nameInput = screen.getByPlaceholderText('Name');
    const messageInput = screen.getByPlaceholderText('Write me a message here');
    const submitButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(messageInput, {
      target: { value: 'Hello, I would like to inquire about...' },
    });

    await waitFor(() => expect(submitButton).toBeEnabled());
  });
});
