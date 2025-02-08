import {
  UseWeatherForsecastReturn,
  WeatherApiDataProps,
  WeatherForecastData,
} from '@features/weather/types';
import { useAppContext } from '@providers/AppProvider';

export const useWeatherForecast = (): UseWeatherForsecastReturn => {
  const { weatherData, setWeatherData } = useAppContext();
  const handleWeatherCardClick = (
    forecastData: WeatherForecastData,
    isCurrentDate: boolean
  ) => {
    const selectedDataResponse = {
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
    const newWeatherData: WeatherApiDataProps = {
      ...weatherData!,
      selected: isCurrentDate ? undefined : selectedDataResponse,
    };
    setWeatherData(newWeatherData);
  };

  return {
    handleWeatherCardClick,
  };
};
