import { renderHook, act } from '@testing-library/react-hooks';
import { send } from '@emailjs/browser';
import { useToast } from '@chakra-ui/react';
import { useEmailForm } from './useEmailForm.hooks';
import { Mock, vi } from 'vitest';
import { EmailFormFields } from '@features/forms/types';

vi.mock('@chakra-ui/react', () => ({
  useToast: vi.fn(),
}));

vi.mock('@emailjs/browser', () => ({
  send: vi.fn(),
  init: vi.fn(),
}));

describe('useEmailForm', () => {
  const mockToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useToast as Mock).mockReturnValue(mockToast);
    (send as Mock).mockResolvedValue({});
  });

  it('should initialize with loading as false', () => {
    const { result } = renderHook(() => useEmailForm());
    expect(result.current.loading).toBe(false);
  });

  it('should set loading to true and send email successfully', async () => {
    const { result } = renderHook(() => useEmailForm());
    const mockEmailFields = {
      message: 'Hello, world!',
      userName: 'John Doe',
    } as EmailFormFields;
    await act(async () => {
      await result.current.sendEmail(mockEmailFields);
    });
    expect(result.current.loading).toBe(false);
    expect(send).toHaveBeenCalledWith(expect.any(String), expect.any(String), {
      message: mockEmailFields.message,
      userName: mockEmailFields.userName,
    });
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Successfully sent email',
      description: 'Thanks for your message!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  });

  it('should handle email send failure', async () => {
    (send as Mock).mockRejectedValueOnce(new Error('Error sending email'));
    const { result } = renderHook(() => useEmailForm());
    const mockEmailFields = {
      message: 'Hello, world!',
      userName: 'John Doe',
    } as EmailFormFields;
    await act(async () => {
      await result.current.sendEmail(mockEmailFields);
    });
    expect(result.current.loading).toBe(false);
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Failed to send email',
      description: 'Something went wrong, please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  });

  it('should call sendEmail with correct parameters', async () => {
    const { result } = renderHook(() => useEmailForm());
    const mockEmailFields = {
      message: 'Test message',
      userName: 'Jane Doe',
    } as EmailFormFields;
    await act(async () => {
      await result.current.sendEmail(mockEmailFields);
    });
    expect(send).toHaveBeenCalledWith(expect.any(String), expect.any(String), {
      userName: mockEmailFields.userName,
      message: mockEmailFields.message,
    });
  });
});
