import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@theme/theme';
import { Contact } from './Contact.page';
import { render, screen } from '@testing-library/react';

describe('Contact', () => {
  it('should render correctly', () => {
    render(
      <ChakraProvider theme={theme}>
        <Contact />
      </ChakraProvider>
    );

    expect(screen.getByText(/Send me an Email/i)).toBeInTheDocument();
  });
});
