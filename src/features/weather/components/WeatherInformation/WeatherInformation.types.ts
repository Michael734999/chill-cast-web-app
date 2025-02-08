import {
  CurrentWeatherData,
  SelectedWeatherData,
  WeatherApiDataProps,
  WeatherUnits,
} from '@features/weather/types';

export interface WeatherInformationProps {
  newWeatherData: SelectedWeatherData | CurrentWeatherData;
  weatherData: WeatherApiDataProps;
  loading: boolean;
  unit: WeatherUnits;
  currentDate?: string;
}
