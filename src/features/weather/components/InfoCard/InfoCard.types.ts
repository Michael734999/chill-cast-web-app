import {
  WeatherApiDataProps,
  WeatherSearchVariant,
} from '@features/weather/types';

export interface InfoCardProps {
  weatherData?: WeatherApiDataProps;
  fetchWeatherData: (type: WeatherSearchVariant, cityName?: string) => void;
  loading?: boolean;
  error?: string;
}
