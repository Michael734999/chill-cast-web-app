import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import * as AppProviderHooks from '@providers/AppProvider';
import { WeatherApiDataProps, WeatherUnits } from '@features/weather/types';
import { useWeatherForecast } from '@features/weather/hooks/useWeatherForecast';
import { WeatherForecastCard } from './WeatherForecastCard.component';
import { WeatherForecastCardProps } from './WeatherForecastCard.types';

vi.mock('@providers/AppProvider', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@features/weather/hooks/useWeatherForecast', () => ({
  useWeatherForecast: vi.fn(),
}));

describe('WeatherForecastCard', () => {
  const mockHandleWeatherCardClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useWeatherForecast).mockReturnValue({
      handleWeatherCardClick: mockHandleWeatherCardClick,
    });
  });

  it('renders the weather forecast card with correct temperatures and unit', () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: { current: { feelslike_c: 12 } } as WeatherApiDataProps,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.FERINHEIGHT,
      setWeatherUnit: vi.fn(),
    });
    const weatherProps = {
      date: '2025-02-09',
      minTemp: 16,
      maxTemp: 25,
      unit: WeatherUnits.CELCIUS,
      currentDate: '2025-02-08T12:00:00',
      data: {
        date: '2025-02-09',
      },
      icon: 'sunny_icon.png',
    } as WeatherForecastCardProps;

    render(<WeatherForecastCard {...weatherProps} />);

    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('16°C - 25°C')).toBeInTheDocument();
    expect(screen.getByAltText('weather-icon')).toHaveAttribute(
      'src',
      'sunny_icon.png'
    ); // icon image
  });

  it('renders weather forecast card with Fahrenheit unit when unit is Fahrenheit', () => {
    const weatherProps = {
      date: '2025-02-09',
      minTemp: 61,
      maxTemp: 77,
      unit: WeatherUnits.FERINHEIGHT,
      currentDate: '2025-02-08T12:00:00',
      data: {
        date: '2025-02-09',
      },
      icon: 'sunny_icon.png',
    } as WeatherForecastCardProps;

    render(<WeatherForecastCard {...weatherProps} />);

    expect(screen.getByText('61°F - 77°F')).toBeInTheDocument();
  });

  it('calls handleWeatherCardClick when clicked', () => {
    const weatherProps = {
      date: '2025-02-09',
      minTemp: 16,
      maxTemp: 25,
      unit: WeatherUnits.CELCIUS,
      currentDate: '2025-02-08T12:00:00',
      data: {
        date: '2025-02-09',
      },
      icon: 'sunny_icon.png',
    } as WeatherForecastCardProps;

    render(<WeatherForecastCard {...weatherProps} />);

    const card = screen.getByRole('img');
    fireEvent.click(card);

    expect(mockHandleWeatherCardClick).toHaveBeenCalledWith(
      weatherProps.data,
      false
    );
  });

  it('displays the correct day of the week', () => {
    const weatherProps = {
      date: '2025-02-09',
      minTemp: 16,
      maxTemp: 25,
      unit: WeatherUnits.CELCIUS,
      currentDate: '2025-02-08T12:00:00',
      data: {
        date: '2025-02-09',
      },
      icon: 'sunny_icon.png',
    } as WeatherForecastCardProps;

    render(<WeatherForecastCard {...weatherProps} />);

    expect(screen.getByText('Sun')).toBeInTheDocument();
  });
});
