import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import * as AppProviderHooks from '@providers/AppProvider';
import { WeatherUnits } from '@features/weather/types';
import { NavBar } from './NavBar.component';

vi.mock('@providers/AppProvider', () => ({
  useAppContext: vi.fn(),
}));

describe('NavBar Component', () => {
  it('should render the navbar with logo and links', () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: undefined,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Weather Logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should render weather unit buttons', () => {
    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: undefined,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: vi.fn(),
    });
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText('°C')).toBeInTheDocument();
    expect(screen.getByText('°F')).toBeInTheDocument();
  });

  it('should call setWeatherUnitData when the Celsius button is clicked', () => {
    const setWeatherUnitMock = vi.fn();

    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: undefined,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.FERINHEIGHT,
      setWeatherUnit: setWeatherUnitMock,
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const celsiusButton = screen.getByText('°C');
    fireEvent.click(celsiusButton);

    expect(setWeatherUnitMock).toHaveBeenCalledWith(WeatherUnits.CELCIUS);
  });

  it('should call setWeatherUnitData when the Fahrenheit button is clicked', () => {
    const setWeatherUnitMock = vi.fn();

    const useAppContextSpy = vi.spyOn(AppProviderHooks, 'useAppContext');
    useAppContextSpy.mockReturnValue({
      weatherData: undefined,
      setWeatherData: vi.fn(),
      weatherUnit: WeatherUnits.CELCIUS,
      setWeatherUnit: setWeatherUnitMock,
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const fahrenheitButton = screen.getByText('°F');
    fireEvent.click(fahrenheitButton);

    expect(setWeatherUnitMock).toHaveBeenCalledWith(WeatherUnits.FERINHEIGHT);
  });
});
