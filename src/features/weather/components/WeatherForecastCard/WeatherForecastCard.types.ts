import { WeatherForecastData, WeatherUnits } from '@features/weather/types';

export interface WeatherForecastCardProps {
  date: string;
  icon: string;
  minTemp: number;
  currentDate: string;
  unit: WeatherUnits;
  data: WeatherForecastData;
  maxTemp: number;
}
