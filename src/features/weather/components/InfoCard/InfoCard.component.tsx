import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Spinner,
} from '@chakra-ui/react';
import { SearchBar } from '@features/forms/components/SearchBar';
import { WeatherForecastCard } from '@features/weather/components/WeatherForecastCard/WeatherForecastCard.component';
import { InfoCardProps } from './InfoCard.types';
import { useMemo } from 'react';
import { WeatherInformation } from '../WeatherInformation/WeatherInformation.component';
import errorIcon from '@assets/error.gif';
import { useAppContext } from '@providers/AppProvider';
import { WeatherSearchVariant, WeatherUnits } from '@features/weather/types';

export const InfoCard = ({
  weatherData,
  fetchWeatherData,
  loading: isLoading = false,
  error,
}: InfoCardProps): JSX.Element => {
  const { weatherUnit } = useAppContext();
  const location = `${weatherData?.location.name}, ${weatherData?.location.region}, ${weatherData?.location.country}`;
  const newWeatherData = weatherData?.selected ?? weatherData?.current;
  const currentDate = useMemo(() => {
    if (!weatherData) return;
    const newDate = new Date(
      weatherData.selected
        ? weatherData.selected.date
        : weatherData?.location.localtime
    );

    return newDate.toLocaleDateString('en', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, [weatherData]);

  if (error) {
    return (
      <Card
        align="center"
        bgGradient="linear(to-t, background.darkBlue, background.secondary)"
        width={'90%'}
        minHeight={{ sm: '120vh', md: '55vh' }}
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        color={'foreground.light'}
        margin={14}
      >
        <SearchBar
          onSearch={fetchWeatherData}
          loading={isLoading}
          placeholder="Enter a location..."
        />
        <Flex
          flexDirection="column"
          textAlign={'center'}
          justify="center"
          align="center"
          flexGrow={1}
        >
          <Heading p={8} size={{ sm: 'md', md: 'lg' }}>
            {error}
          </Heading>
          <Image
            src={errorIcon}
            boxSize="140px"
            borderRadius="20"
            fit="cover"
            mb={2}
            alt="Weather Logo"
          />
          <Button
            bg="rgba(188, 199, 224, 0.25)"
            mt={6}
            color="foreground.light"
            onClick={() => fetchWeatherData(WeatherSearchVariant.GEO)}
            isLoading={isLoading}
            _hover={{
              bg: 'rgba(188, 199, 224, 0.5)',
            }}
            size={'md'}
            width={'40%'}
          >
            Refresh
          </Button>
        </Flex>
      </Card>
    );
  }

  if (!weatherData || !newWeatherData) {
    return (
      <Card
        align="center"
        bgGradient="linear(to-t, background.darkBlue, background.secondary)"
        width={'90%'}
        minHeight={{ sm: '120vh', md: '55vh' }}
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        color={'foreground.light'}
        margin={14}
      >
        <SearchBar
          onSearch={fetchWeatherData}
          loading={isLoading}
          placeholder="Enter a location..."
        />
        <Flex justify="center" align="center" flexGrow={1}>
          <Spinner size="xl" color="foreground.light" />
        </Flex>
      </Card>
    );
  }

  return (
    <Card
      align="center"
      bgGradient="linear(to-t, background.darkBlue, background.secondary)"
      width={'90%'}
      minHeight="55vh"
      p={4}
      color={'foreground.light'}
      margin={14}
    >
      <SearchBar
        onSearch={fetchWeatherData}
        loading={isLoading}
        placeholder="Enter a location..."
      />
      <CardHeader>
        <Skeleton height="inherit" rounded={10} isLoaded={!isLoading}>
          <Heading textAlign="center" size="md">
            {location}
          </Heading>
        </Skeleton>
      </CardHeader>
      <CardBody
        fontWeight={'semibold'}
        width={'100%'}
        pt={0}
        justifyContent={'center'}
        alignContent={'center'}
        fontSize={'md'}
      >
        <WeatherInformation
          unit={weatherUnit}
          loading={isLoading}
          currentDate={currentDate}
          newWeatherData={newWeatherData}
          weatherData={weatherData}
        />
      </CardBody>
      <CardFooter
        fontWeight={'semibold'}
        width={'100%'}
        justifyContent={'center'}
        alignContent={'center'}
        fontSize={'md'}
      >
        <SimpleGrid
          columns={{ sm: 2, md: 4, lg: 7 }}
          spacing={6}
          px={2}
          alignItems={'center'}
          textAlign={'center'}
        >
          {weatherData.forecast.forecastday.map((data, index) => (
            <Skeleton
              height="inherit"
              key={index}
              rounded={10}
              isLoaded={!isLoading}
            >
              <WeatherForecastCard
                key={index}
                unit={weatherUnit}
                date={data.date}
                currentDate={weatherData?.location.localtime}
                data={data}
                icon={data.day.condition.icon}
                minTemp={
                  weatherUnit === WeatherUnits.CELCIUS
                    ? data.day.mintemp_c
                    : data.day.mintemp_f
                }
                maxTemp={
                  weatherUnit === WeatherUnits.CELCIUS
                    ? data.day.maxtemp_c
                    : data.day.maxtemp_f
                }
              />
            </Skeleton>
          ))}
        </SimpleGrid>
      </CardFooter>
    </Card>
  );
};
