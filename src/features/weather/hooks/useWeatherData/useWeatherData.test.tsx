import { renderHook } from '@testing-library/react-hooks';
import * as AppProviderHooks from '@providers/AppProvider';
import { CreateToastFnReturn, useToast } from '@chakra-ui/react';
import { vi } from 'vitest';
import { useWeatherData } from './useWeatherData.hooks';
import { WeatherApiDataProps, WeatherUnits } from '@features/weather/types';

vi.mock('@chakra-ui/react', () => ({
  useToast: vi.fn(),
}));

vi.mock('@providers/AppProvider', () => ({
  useAppContext: vi.fn(),
}));

describe('useWeatherData', () => {
  const mockToast = vi.fn();
  const mockSetWeatherData = vi.fn();
  const mockSetError = vi.fn();

  beforeAll(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi.fn(),
        watchPosition: vi.fn(),
        clearWatch: vi.fn(),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    mockToast.mockClear();
    mockSetWeatherData.mockClear();
    mockSetError.mockClear();
    vi.mocked(useToast).mockReturnValue(
      mockToast as unknown as CreateToastFnReturn
    );
  });

  it('should initialize with default values', () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: undefined,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });
    const { result } = renderHook(() => useWeatherData());

    expect(result.current.weatherData).toBeUndefined();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
  });

  it('should handle geolocation success and fetch weather data', async () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: { current: { feelslike_c: 12 } } as WeatherApiDataProps,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    };
    vi.mocked(
      global.navigator.geolocation.getCurrentPosition
    ).mockImplementationOnce(function (this: void, success) {
      success(mockPosition as GeolocationPosition);
    });

    const mockForecastResponse = {
      forecast: {
        forecastday: [{ date: '2025-02-08', day: { avgtemp_c: 20 } }],
      },
    };
    const mockHistoricalResponse = {
      forecast: {
        forecastday: [{ date: '2025-02-06', day: { avgtemp_c: 18 } }],
      },
    };
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockForecastResponse),
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockHistoricalResponse),
      });

    const { result, waitForNextUpdate } = renderHook(() => useWeatherData());

    await waitForNextUpdate();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result.current.loading).toBe(false);
    expect(result.current.weatherData).toBeDefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should handle geolocation failure and fallback to city weather data', async () => {
    vi.mocked(
      global.navigator.geolocation.getCurrentPosition
    ).mockImplementationOnce(
      (_success, error) =>
        void Promise.resolve(
          error!({
            message: 'nav error',
            code: 0,
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          })
        )
    );

    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: { current: { cloud: 3 } } as WeatherApiDataProps,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });

    const mockForecastResponse = {
      forecast: {
        forecastday: [{ date: '2025-02-08', day: { avgtemp_c: 20 } }],
      },
    };
    const mockHistoricalResponse = {
      forecast: {
        forecastday: [{ date: '2025-02-06', day: { avgtemp_c: 18 } }],
      },
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockForecastResponse),
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockHistoricalResponse),
      });

    const { result, waitForNextUpdate } = renderHook(() => useWeatherData());

    await waitForNextUpdate({ timeout: 3000 });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('q=Johannesburg')
    );
    expect(result.current.weatherData).toBeDefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should handle API errors gracefully', async () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: { error: { message: 'Testo' } } as WeatherApiDataProps,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });

    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    };
    vi.mocked(
      global.navigator.geolocation.getCurrentPosition
    ).mockImplementationOnce((success) =>
      success(mockPosition as GeolocationPosition)
    );

    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { result, waitForNextUpdate } = renderHook(() => useWeatherData());

    await waitForNextUpdate();

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Failed to get Geolocation weather data',
      description: 'Something went wrong, please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      'Something went wrong. Please try again.'
    );
  });

  it('should handle weather API error response', async () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: undefined,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });

    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    };
    vi.mocked(
      global.navigator.geolocation.getCurrentPosition
    ).mockImplementationOnce((success) =>
      success(mockPosition as GeolocationPosition)
    );

    const mockForecastResponse = {
      error: { message: 'API error' },
    };
    const mockHistoricalResponse = {
      error: { message: 'API error' },
    };
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockForecastResponse),
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockHistoricalResponse),
      });

    const { result, waitForNextUpdate } = renderHook(() => useWeatherData());

    await waitForNextUpdate();

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Failed to get Geolocation weather data',
      description: 'API error',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    expect(result.current.weatherData).toBeUndefined();
    expect(result.current.error).toBe('API error');
  });
});
