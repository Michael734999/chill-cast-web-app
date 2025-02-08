import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavigationLink } from './NavLink.component';

describe('NavigationLink Component', () => {
  it('should render children correctly', () => {
    render(
      <MemoryRouter>
        <NavigationLink linkTo="/home">Home</NavigationLink>
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should have the correct link destination', () => {
    render(
      <MemoryRouter>
        <NavigationLink linkTo="/about">About</NavigationLink>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
  });
});
