import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import { WeatherForecastCardProps } from './WeatherForecastCard.types';
import { useMemo } from 'react';
import { useAppContext } from '@providers/AppProvider';
import { motion } from 'framer-motion';
import { useWeatherForecast } from '@features/weather/hooks/useWeatherForecast';
import { WeatherUnits } from '@features/weather/types';

export const WeatherForecastCard = ({
  date,
  minTemp,
  maxTemp,
  unit,
  currentDate,
  data,
  icon,
}: WeatherForecastCardProps): JSX.Element => {
  const { weatherData } = useAppContext();
  const { handleWeatherCardClick } = useWeatherForecast();

  const day = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en', { weekday: 'short' });
  }, [date]);

  const formattedCurrentDate = useMemo(() => {
    const newDate = new Date(currentDate);
    return newDate.toISOString().split('T')[0];
  }, [currentDate]);
  const isCurrentDate = date === formattedCurrentDate;

  const active = weatherData?.selected
    ? data.date === weatherData?.selected?.date
    : isCurrentDate;

  const weatherUnit = unit === WeatherUnits.CELCIUS ? 'C' : 'F';

  return (
    <Card
      as={motion.div}
      maxW="sm"
      backgroundColor={
        active ? 'rgba(110, 118, 135, 0.53)' : 'rgba(188, 199, 224, 0.25)'
      }
      justifyContent={'center'}
      mx={1}
      onClick={() => handleWeatherCardClick(data, isCurrentDate)}
      cursor="pointer"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition="0.2s linear"
      _hover={{ backgroundColor: 'rgba(188, 199, 224, 0.5)' }}
      pt={2}
      alignItems={'center'}
      color={'foreground.light'}
    >
      <CardHeader p={0}>{day}</CardHeader>
      <CardBody
        alignItems={'center'}
        pt={0}
        pb={2}
        justifyContent={'center'}
        textAlign={'center'}
        width={'100%'}
      >
        <Image src={icon} alt="weather-icon" width={'100%'} borderRadius="lg" />
        <Stack mt="1" spacing="2">
          <Heading size="sm">
            {Math.round(minTemp)}&deg;{weatherUnit} - {Math.round(maxTemp)}&deg;
            {weatherUnit}
          </Heading>
        </Stack>
      </CardBody>
    </Card>
  );
};
