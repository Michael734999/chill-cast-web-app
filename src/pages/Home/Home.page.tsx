import { Flex } from '@chakra-ui/react';
import { InfoCard } from '@features/weather/components/InfoCard';
import { useWeatherData } from '@features/weather/hooks/useWeatherData';

export const Home = (): JSX.Element => {
  const { weatherData, fetchWeatherData, loading, error } = useWeatherData();

  return (
    <Flex
      height={'100%'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <InfoCard
        weatherData={weatherData}
        fetchWeatherData={fetchWeatherData}
        loading={loading}
        error={error}
      />
    </Flex>
  );
};
