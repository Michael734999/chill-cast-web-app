import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useWeatherData } from '@features/weather/hooks/useWeatherData';
import { Home } from './Home.page';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@theme/theme';

vi.mock('@features/weather/hooks/useWeatherData');

describe('Home', () => {
  it('should render correctly', () => {
    (useWeatherData as Mock).mockReturnValue({
      weatherData: null,
      fetchWeatherData: vi.fn(),
      loading: false,
      error: 'something went wrong',
    });

    render(
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
