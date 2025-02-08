import { Box } from '@chakra-ui/react';
import { Footer } from '@components/Footer';
import { NavBar } from '@components/NavBar/NavBar.component';
import { Outlet } from 'react-router-dom';

export const RootLayout = (): JSX.Element => {
  return (
    <Box
      bg="background.primary"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Box flex={1} as="main" width={'100%'}>
        <NavBar />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
