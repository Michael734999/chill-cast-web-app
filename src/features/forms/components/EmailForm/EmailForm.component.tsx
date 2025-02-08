import {
  Card,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useEmailForm } from '@features/forms/hooks/useEmailForm';
import { useForm } from 'react-hook-form';
import { EmailFormFields } from '@features/forms/types';

export const EmailForm = (): JSX.Element => {
  const { handleSubmit, register, reset, formState } =
    useForm<EmailFormFields>();
  const { sendEmail, loading } = useEmailForm();

  const onSubmit = async (formData: EmailFormFields) => {
    await sendEmail(formData);
    reset();
  };
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Card
        align="center"
        justify={'center'}
        bgColor="white"
        width={'65%'}
        boxShadow="xl"
        p={4}
        margin="0 auto"
      >
        <CardHeader width={'100%'} textAlign={'left'}>
          <Heading size="lg">Send me an Email</Heading>
        </CardHeader>
        <CardBody width={'100%'}>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Name"
                {...register('userName', { required: true, minLength: 3 })}
              />
            </InputGroup>
            <InputGroup>
              <Textarea
                placeholder="Write me a message here"
                {...register('message', { required: true, minLength: 2 })}
              />
            </InputGroup>
          </Stack>
        </CardBody>
        <CardFooter
          justifyContent={'center'}
          alignItems={'center'}
          width={'40%'}
        >
          <Button
            bg="background.darkBlue"
            color="foreground.light"
            disabled={!formState.isValid}
            isLoading={loading}
            _hover={{
              bg: 'rgba(11, 57, 114, 0.68)',
            }}
            type="submit"
            size={'lg'}
            width={'100%'}
          >
            Send
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
