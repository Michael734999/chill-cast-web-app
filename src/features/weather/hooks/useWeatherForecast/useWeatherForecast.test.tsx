import { renderHook, act } from '@testing-library/react-hooks';
import { vi } from 'vitest';
import * as AppProviderHooks from '@providers/AppProvider';
import {
  WeatherApiDataProps,
  WeatherForecastData,
  WeatherUnits,
} from '@features/weather/types';
import { useWeatherForecast } from './useWeatherForecast.hooks';

vi.mock('@providers/AppProvider', () => ({
  useAppContext: vi.fn(),
}));

describe('useWeatherForecast', () => {
  const mockSetWeatherData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return handleWeatherCardClick function', () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: { current: { feelslike_c: 12 } } as WeatherApiDataProps,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });
    const { result } = renderHook(() => useWeatherForecast());

    expect(result.current.handleWeatherCardClick).toBeDefined();
  });

  it('should call setWeatherData with correct data when handleWeatherCardClick is invoked', () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: { current: { cloud: 3 } } as WeatherApiDataProps,
      setWeatherData: mockSetWeatherData,
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });
    const { result } = renderHook(() => useWeatherForecast());
    const forecastData = {
      date: '2025-02-08',
      day: {
        condition: {
          icon: 'icon_url',
          text: 'Sunny',
        },
        avgtemp_c: 20,
        avgtemp_f: 68,
        avghumidity: 50,
        uv: 5,
        daily_chance_of_rain: 10,
        maxwind_kph: 15,
        mintemp_c: 15,
        maxtemp_c: 25,
        mintemp_f: 59,
        maxtemp_f: 77,
      },
    } as WeatherForecastData;
    const isCurrentDate = false;

    act(() => {
      result.current.handleWeatherCardClick(forecastData, isCurrentDate);
    });

    const expectedSelectedDataResponse = {
      condition: {
        icon: forecastData.day.condition.icon,
        text: forecastData.day.condition.text,
      },
      avg_temp: forecastData.day.avgtemp_c,
      avg_temp_f: forecastData.day.avgtemp_f,
      humidity: forecastData.day.avghumidity,
      uv: forecastData.day.uv,
      daily_chance_of_rain: forecastData.day.daily_chance_of_rain,
      date: forecastData.date,
      wind_kph: forecastData.day.maxwind_kph,
      temp_low: forecastData.day.mintemp_c,
      temp_high: forecastData.day.maxtemp_c,
      temp_low_f: forecastData.day.mintemp_f,
      temp_high_f: forecastData.day.maxtemp_f,
    };

    expect(mockSetWeatherData).toHaveBeenCalledWith({
      current: { cloud: 3 },
      selected: expectedSelectedDataResponse,
    });
  });

  it('should not set selected weather data if isCurrentDate is true', () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: { current: { cloud: 3 } } as WeatherApiDataProps,
      setWeatherData: mockSetWeatherData,
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });
    const { result } = renderHook(() => useWeatherForecast());
    const forecastData = {
      date: '2025-02-08',
      day: {
        condition: {
          icon: 'icon_url',
          text: 'Sunny',
        },
        avgtemp_c: 20,
        avgtemp_f: 68,
        avghumidity: 50,
        uv: 5,
        daily_chance_of_rain: 10,
        maxwind_kph: 15,
        mintemp_c: 15,
        maxtemp_c: 25,
        mintemp_f: 59,
        maxtemp_f: 77,
      },
    } as WeatherForecastData;
    const isCurrentDate = true;

    act(() => {
      result.current.handleWeatherCardClick(forecastData, isCurrentDate);
    });

    expect(mockSetWeatherData).toHaveBeenCalledWith({
      current: { cloud: 3 },
      selected: undefined,
    });
  });

  it('should not call setWeatherData if weatherData is undefined', () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: undefined,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });

    const { result } = renderHook(() => useWeatherForecast());

    const forecastData: WeatherForecastData = {
      date: '2025-02-08',
      day: {
        condition: {
          icon: 'icon_url',
          text: 'Sunny',
        },
        avgtemp_c: 20,
        avgtemp_f: 68,
        avghumidity: 50,
        uv: 5,
        daily_chance_of_rain: 10,
        maxwind_kph: 15,
        mintemp_c: 15,
        maxtemp_c: 25,
        mintemp_f: 59,
        maxtemp_f: 77,
      },
    } as WeatherForecastData;
    const isCurrentDate = false;

    act(() => {
      result.current.handleWeatherCardClick(forecastData, isCurrentDate);
    });

    expect(mockSetWeatherData).not.toHaveBeenCalled();
  });
});
