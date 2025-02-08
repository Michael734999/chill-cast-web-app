import { useMemo, useState } from 'react';
import { AppContext } from './AppContext';
import { AppContextProviderProps } from './AppProviderTypes';
import { WeatherApiDataProps, WeatherUnits } from '@features/weather/types';

export const AppProvider = ({
  children,
}: AppContextProviderProps): JSX.Element => {
  const unit = localStorage.getItem('weatherUnit') as WeatherUnits;
  const defaultUnitValue = unit ?? WeatherUnits.CELCIUS;
  const [weatherData, setWeatherData] = useState<
    WeatherApiDataProps | undefined
  >(undefined);
  const [weatherUnit, setWeatherUnit] =
    useState<WeatherUnits>(defaultUnitValue);

  const state = useMemo(
    () => ({
      weatherData,
      setWeatherData,
      weatherUnit,
      setWeatherUnit,
    }),
    [weatherData, weatherUnit]
  );
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
