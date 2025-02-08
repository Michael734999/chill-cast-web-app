import { WeatherApiDataProps, WeatherUnits } from '@features/weather/types';

export interface AppContextProviderProps {
  children: React.ReactNode;
}

export interface AppContextState {
  weatherData?: WeatherApiDataProps;
  setWeatherData: React.Dispatch<
    React.SetStateAction<WeatherApiDataProps | undefined>
  >;
  weatherUnit: WeatherUnits;
  setWeatherUnit: React.Dispatch<React.SetStateAction<WeatherUnits>>;
}
