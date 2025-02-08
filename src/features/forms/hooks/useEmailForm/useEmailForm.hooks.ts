import { useToast } from '@chakra-ui/react';
import { init, send } from '@emailjs/browser';
import { EmailFormFields, UseEmailFormReturn } from '@features/forms/types';
import { useState } from 'react';

export const useEmailForm = (): UseEmailFormReturn => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const sendEmail = async ({ message, userName }: EmailFormFields) => {
    try {
      setLoading(true);
      const variables = {
        userName: userName,
        message: message,
      };
      init(import.meta.env.VITE_EMAIL_API_KEY as string);
      await send(
        import.meta.env.VITE_EMAIL_SERVICE_ID as string,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID as string,
        variables
      );
      toast({
        title: 'Successfully sent email',
        description: 'Thanks for your message!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Failed to send email',
        description: 'Something went wrong, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    sendEmail,
  };
};
