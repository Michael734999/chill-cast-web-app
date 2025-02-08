import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import { WeatherInformationProps } from './WeatherInformation.types';
import { WeatherUnits } from '@features/weather/types';

export const WeatherInformation = ({
  newWeatherData,
  loading,
  weatherData,
  unit,
  currentDate,
}: WeatherInformationProps): JSX.Element => {
  const weatherUnit = unit === WeatherUnits.CELCIUS ? 'C' : 'F';
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 3 }}
      spacing={6}
      px={2}
      alignItems={'center'}
      textAlign={'center'}
    >
      <Box
        justifyContent={'center'}
        textAlign={'center'}
        alignContent={'center'}
        fontWeight={'bold'}
        fontSize={'large'}
      >
        <Container alignSelf="center" justifyContent={'center'} width={'60%'}>
          <Skeleton height="inherit" rounded={10} isLoaded={!loading}>
            <Image
              width={'100%'}
              rounded={18}
              src={newWeatherData.condition.icon}
              alt={`Weather Icon`}
            />
          </Skeleton>
        </Container>

        <Skeleton height="inherit" rounded={10} mt={1} isLoaded={!loading}>
          <Text>{newWeatherData.condition.text}</Text>
        </Skeleton>
      </Box>
      <Box>
        <Skeleton height="inherit" rounded={10} isLoaded={!loading}>
          <Text fontSize={'sm'}>{currentDate}</Text>
        </Skeleton>
        {weatherData.selected ? (
          <Skeleton height="inherit" mt={1} rounded={10} isLoaded={!loading}>
            <Text fontSize={'xx-large'}>
              {Math.round(
                unit === WeatherUnits.CELCIUS
                  ? weatherData?.selected.temp_low
                  : weatherData?.selected.temp_low_f
              )}
              &deg;{weatherUnit} -{' '}
              {Math.round(
                unit === WeatherUnits.CELCIUS
                  ? weatherData?.selected.temp_high
                  : weatherData?.selected.temp_high_f
              )}
              &deg;{weatherUnit}
            </Text>
          </Skeleton>
        ) : (
          <>
            <Skeleton height="inherit" rounded={10} isLoaded={!loading}>
              <Text my={1} fontSize={'md'}>
                Currently
              </Text>
            </Skeleton>

            <Skeleton height="inherit" rounded={10} isLoaded={!loading}>
              <Text fontSize={'xxx-large'}>
                {Math.round(
                  unit === WeatherUnits.CELCIUS
                    ? weatherData?.current.temp_c
                    : weatherData?.current.temp_f
                )}
                &deg;{weatherUnit}
              </Text>
            </Skeleton>
          </>
        )}
      </Box>
      <Skeleton height="inherit" rounded={10} isLoaded={!loading}>
        <Box
          fontSize={'sm'}
          bg="rgba(203, 215, 240, 0.30)"
          py="4"
          borderRadius={18}
        >
          {!weatherData.selected ? (
            <>
              <Text>
                Feels like:{' '}
                {Math.round(
                  unit === WeatherUnits.CELCIUS
                    ? weatherData?.current.feelslike_c
                    : weatherData?.current.feelslike_f
                )}
                &deg;{weatherUnit}
              </Text>
              <Text>Pressure: {weatherData.current.pressure_mb} mb</Text>
            </>
          ) : (
            <Text>
              Average Temprature:{' '}
              {Math.round(
                unit === WeatherUnits.CELCIUS
                  ? weatherData.selected.avg_temp
                  : weatherData.selected.avg_temp_f
              )}
              &deg;{weatherUnit}
            </Text>
          )}
          <Text>UV index: {newWeatherData.uv}</Text>
          <Text>Humidity: {newWeatherData.humidity}%</Text>
          <Text>Wind speed: {newWeatherData.wind_kph} km/h</Text>
        </Box>
      </Skeleton>
    </SimpleGrid>
  );
};
