import { render, screen } from '@testing-library/react';
import { WeatherInformation } from './WeatherInformation.component';
import {
  CurrentWeatherData,
  SelectedWeatherData,
  WeatherApiDataProps,
  WeatherUnits,
} from '@features/weather/types';

describe('WeatherInformation', () => {
  const mockWeatherData = {
    current: {
      temp_c: 22,
      temp_f: 72,
      feelslike_c: 20,
      feelslike_f: 68,
      pressure_mb: 1012,
    },
    selected: null,
  } as unknown as WeatherApiDataProps;

  const mockNewWeatherData = {
    condition: { text: 'Clear', icon: 'clear_icon.png' },
    uv: 5,
    humidity: 60,
    wind_kph: 15,
  } as CurrentWeatherData;

  it('renders weather information correctly when loading is false', () => {
    render(
      <WeatherInformation
        newWeatherData={mockNewWeatherData}
        loading={false}
        weatherData={mockWeatherData}
        unit={WeatherUnits.CELCIUS}
        currentDate="2025-02-08"
      />
    );

    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('2025-02-08')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('Feels like: 20°C')).toBeInTheDocument();
    expect(screen.getByText('Pressure: 1012 mb')).toBeInTheDocument();
    expect(screen.getByText('UV index: 5')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 60%')).toBeInTheDocument();
    expect(screen.getByText('Wind speed: 15 km/h')).toBeInTheDocument();
  });

  it('renders temperature in Fahrenheit when unit is Fahrenheit', () => {
    render(
      <WeatherInformation
        newWeatherData={mockNewWeatherData}
        loading={false}
        weatherData={mockWeatherData}
        unit={WeatherUnits.FERINHEIGHT}
        currentDate="2025-02-08"
      />
    );

    expect(screen.getByText('72°F')).toBeInTheDocument();
    expect(screen.getByText('Feels like: 68°F')).toBeInTheDocument();
  });

  it('renders selected weather data if available', () => {
    const selectedWeatherData = {
      temp_low: 15,
      temp_high: 25,
      avg_temp: 20,
    } as SelectedWeatherData;

    render(
      <WeatherInformation
        newWeatherData={mockNewWeatherData}
        loading={false}
        weatherData={{ ...mockWeatherData, selected: selectedWeatherData }}
        unit={WeatherUnits.CELCIUS}
        currentDate="2025-02-08"
      />
    );

    expect(screen.getByText('15°C - 25°C')).toBeInTheDocument();
    expect(screen.getByText('Average Temprature: 20°C')).toBeInTheDocument();
  });

  it('renders weather data with correct units when unit is Celsius', () => {
    render(
      <WeatherInformation
        newWeatherData={mockNewWeatherData}
        loading={false}
        weatherData={mockWeatherData}
        unit={WeatherUnits.CELCIUS}
        currentDate="2025-02-08"
      />
    );

    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('Feels like: 20°C')).toBeInTheDocument();
    expect(screen.getByText('Pressure: 1012 mb')).toBeInTheDocument();
  });

  it('renders weather data with correct units when unit is Fahrenheit', () => {
    render(
      <WeatherInformation
        newWeatherData={mockNewWeatherData}
        loading={false}
        weatherData={mockWeatherData}
        unit={WeatherUnits.FERINHEIGHT}
        currentDate="2025-02-08"
      />
    );

    expect(screen.getByText('72°F')).toBeInTheDocument();
    expect(screen.getByText('Feels like: 68°F')).toBeInTheDocument();
  });
});
