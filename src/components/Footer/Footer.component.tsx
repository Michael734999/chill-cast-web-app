import { Box, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import GithubIcon from '@assets/github.svg?react';
import LinkedinIcon from '@assets/linkedin.svg?react';

export const Footer = (): JSX.Element => {
  return (
    <Box
      minHeight={'10vh'}
      color={'foreground.light'}
      p={8}
      backgroundColor={'background.accent'}
      as="footer"
    >
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={4}
        justify="space-between"
        align="center"
      >
        <Text fontSize="sm" fontWeight="bold" textAlign="center">
          &copy; {new Date().getFullYear()} ChillCast. All rights reserved.
        </Text>

        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          direction="row"
          spacing={4}
        >
          <IconButton
            as={Link}
            width={9}
            height={9}
            target="_blank"
            href="https://github.com/Michael734999/chill-cast-web-app"
            aria-label="Github"
            _hover={{
              bg: 'rgba(169, 179, 201, 0.53)',
            }}
            icon={<GithubIcon />}
            colorScheme="blue"
            variant="ghost"
          />
          <IconButton
            as={Link}
            target="_blank"
            href="https://www.linkedin.com/in/michael-moore-133a381b9/"
            width={9}
            _hover={{
              bg: 'rgba(169, 179, 201, 0.53)',
            }}
            height={9}
            aria-label="LinkedIn"
            icon={<LinkedinIcon />}
            colorScheme="blue"
            variant="ghost"
          />
        </Stack>
      </Stack>
    </Box>
  );
};
