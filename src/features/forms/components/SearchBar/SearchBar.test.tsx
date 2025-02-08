import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { WeatherSearchVariant } from '@features/weather/types';
import { SearchBar } from './SearchBar.component';

describe('SearchBar Component', () => {
  it('should render the search input and buttons correctly', () => {
    render(
      <SearchBar
        placeholder="Search city..."
        onSearch={vi.fn()}
        loading={false}
      />
    );

    expect(screen.getByPlaceholderText('Search city...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /geolocation/i })
    ).toBeInTheDocument();
  });

  it('should call handleSearch with city search when form is submitted', async () => {
    const handleSearchMock = vi.fn();
    render(
      <SearchBar
        placeholder="Search city..."
        onSearch={handleSearchMock}
        loading={false}
      />
    );

    const input = screen.getByPlaceholderText('Search city...');
    fireEvent.change(input, { target: { value: 'New York' } });

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(handleSearchMock).toHaveBeenCalledWith(
        WeatherSearchVariant.CITY,
        'New York'
      )
    );
  });

  it('should call handleSearch with geolocation variant when geolocation button is clicked', () => {
    const handleSearchMock = vi.fn();
    render(
      <SearchBar
        placeholder="Search city..."
        onSearch={handleSearchMock}
        loading={false}
      />
    );

    const geoButton = screen.getByRole('button', { name: /geolocation/i });
    fireEvent.click(geoButton);

    expect(handleSearchMock).toHaveBeenCalledWith(WeatherSearchVariant.GEO);
  });

  it('should not submit the form if the input is invalid (less than 3 characters)', async () => {
    const handleSearchMock = vi.fn();
    render(
      <SearchBar
        placeholder="Search city..."
        onSearch={handleSearchMock}
        loading={false}
      />
    );

    const input = screen.getByPlaceholderText('Search city...');
    fireEvent.change(input, { target: { value: 'NY' } });

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(handleSearchMock).not.toHaveBeenCalled());
  });

  it('should call handleSearch with the correct search term when input is valid', async () => {
    const handleSearchMock = vi.fn();
    render(
      <SearchBar
        placeholder="Search city..."
        onSearch={handleSearchMock}
        loading={false}
      />
    );

    const input = screen.getByPlaceholderText('Search city...');
    fireEvent.change(input, { target: { value: 'Los Angeles' } });

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSearchMock).toHaveBeenCalledWith(
        WeatherSearchVariant.CITY,
        'Los Angeles'
      );
    });
  });
});
