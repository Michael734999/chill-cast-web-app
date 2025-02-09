import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAppContext } from '@providers/AppProvider';
import {
  UseWeatherDataReturn,
  WeatherApiDataProps,
  WeatherSearchVariant,
} from '@features/weather/types';

export const useWeatherData = (): UseWeatherDataReturn => {
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [long, setLong] = useState<number | undefined>(undefined);
  const { weatherData, setWeatherData } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const toast = useToast();

  const daysAgo = (numDays: number) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.abs(numDays));
    return date.toISOString().split('T')[0];
  };

  const fetchWeatherData = useCallback(
    (type: WeatherSearchVariant, cityName?: string) => {
      setLoading(true);
      const historyStartDate = daysAgo(3);
      const historyEndDate = daysAgo(1);
      const queryType =
        type === WeatherSearchVariant.GEO ? `${lat},${long}` : cityName;
      const forecastWeatherUrl = `${import.meta.env.VITE_WEATHER_API_URL}/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${queryType}&days=4&aqi=no`;
      const historicalWeatherUrl = `${import.meta.env.VITE_WEATHER_API_URL}/history.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${queryType}&dt=${historyStartDate}&end_dt=${historyEndDate}`;
      Promise.all([fetch(forecastWeatherUrl), fetch(historicalWeatherUrl)])
        .then(async (res) => {
          const forecastWeatherResponse =
            (await res[0].json()) as WeatherApiDataProps;

          const historicalWeatherResponse =
            (await res[1].json()) as WeatherApiDataProps;

          if (
            forecastWeatherResponse?.error ||
            historicalWeatherResponse?.error
          ) {
            toast({
              title: 'Failed to get Geolocation weather data',
              description: `${forecastWeatherResponse?.error ? forecastWeatherResponse.error.message : historicalWeatherResponse.error?.message}`,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            setError(forecastWeatherResponse?.error?.message);
            setWeatherData(undefined);
          } else {
            const historicalForecastArray =
              historicalWeatherResponse.forecast.forecastday;

            const forecastArray = forecastWeatherResponse.forecast.forecastday;

            const mergedForecastArray = forecastArray.reduce(
              (accumulator, item2) => {
                if (!accumulator.some((item1) => item1.date === item2.date)) {
                  accumulator.push(item2);
                }
                return accumulator;
              },
              historicalForecastArray
            );

            const updatedForecastData = {
              ...forecastWeatherResponse,
              forecast: {
                forecastday: mergedForecastArray,
              },
            };
            setError(undefined);
            setWeatherData(updatedForecastData);
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: 'Failed to get Geolocation weather data',
            description: 'Something went wrong, please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setError('Something went wrong. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [lat, long, setWeatherData, toast]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      () => {
        fetchWeatherData(WeatherSearchVariant.CITY, 'Johannesburg');
      }
    );
    if (lat && long) {
      fetchWeatherData(WeatherSearchVariant.GEO);
    }
  }, [fetchWeatherData, lat, long]);

  return {
    weatherData,
    fetchWeatherData,
    loading,
    error,
  };
};
