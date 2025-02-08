import { Flex } from '@chakra-ui/react';
import { EmailForm } from '@features/forms/components/EmailForm/EmailForm.component';

export const Contact = (): JSX.Element => {
  return (
    <Flex
      minHeight={'80vh'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <EmailForm />
    </Flex>
  );
};
