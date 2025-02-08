import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as AppProviderHooks from '@providers/AppProvider';
import {
  WeatherApiDataProps,
  WeatherSearchVariant,
  WeatherUnits,
} from '@features/weather/types';
import { InfoCard } from './InfoCard.component';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@theme/theme';

vi.mock('@providers/AppProvider', () => ({
  useAppContext: vi.fn(),
}));

describe('InfoCard', () => {
  const mockFetchWeatherData = vi.fn();
  const mockWeatherData = {
    location: {
      name: 'New York',
      region: 'NY',
      country: 'USA',
      localtime: '2025-02-08T12:00:00',
    },
    current: {
      temp_c: 22,
      humidity: 60,
      condition: { text: 'Clear', icon: 'clear_icon' },
    },
    forecast: {
      forecastday: [
        {
          date: '2025-02-09',
          day: {
            condition: { text: 'Sunny', icon: 'sunny_icon' },
            mintemp_c: 16,
            maxtemp_c: 25,
            mintemp_f: 61,
            maxtemp_f: 25,
          },
        },
      ],
    },
    selected: null,
  } as unknown as WeatherApiDataProps;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error state when error is passed', () => {
    const errorMessage = 'Failed to fetch weather data';
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: { current: { feelslike_c: 12 } } as WeatherApiDataProps,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.FERINHEIGHT,
      setWeatherUnit: vi.fn(),
    });

    render(
      <ChakraProvider theme={theme}>
        <InfoCard
          weatherData={mockWeatherData}
          fetchWeatherData={mockFetchWeatherData}
          loading={false}
          error={errorMessage}
        />
      </ChakraProvider>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refresh/i })
    ).toBeInTheDocument();
  });

  it('renders weather information when weatherData is available', () => {
    render(
      <ChakraProvider theme={theme}>
        <InfoCard
          weatherData={mockWeatherData}
          fetchWeatherData={mockFetchWeatherData}
          loading={false}
          error={undefined}
        />
      </ChakraProvider>
    );

    expect(screen.getByText('New York, NY, USA')).toBeInTheDocument();
  });

  it('calls fetchWeatherData when the Refresh button is clicked in error state', async () => {
    const errorMessage = 'Error fetching weather data';
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: undefined,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.FERINHEIGHT,
      setWeatherUnit: vi.fn(),
    });

    render(
      <ChakraProvider theme={theme}>
        <InfoCard
          weatherData={undefined}
          fetchWeatherData={mockFetchWeatherData}
          loading={false}
          error={errorMessage}
        />
      </ChakraProvider>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    await waitFor(() =>
      expect(mockFetchWeatherData).toHaveBeenCalledWith(
        WeatherSearchVariant.GEO
      )
    );
  });
});
