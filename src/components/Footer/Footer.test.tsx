import { render, screen } from '@testing-library/react';
import { Footer } from './Footer.component';

describe('Footer Component', () => {
  it('should render the copyright text with the current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} ChillCast. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('should render Github and LinkedIn icon buttons with correct links', () => {
    render(<Footer />);

    const githubButton = screen.getByRole('link', { name: /github/i });
    const linkedinButton = screen.getByRole('link', { name: /linkedin/i });

    expect(githubButton).toHaveAttribute(
      'href',
      'https://github.com/Michael734999/chill-cast-web-app'
    );
    expect(linkedinButton).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/michael-moore-133a381b9/'
    );
  });

  it('should render the Github icon', () => {
    render(<Footer />);

    const githubIcon = screen.getByLabelText('Github');
    expect(githubIcon).toBeInTheDocument();
  });

  it('should render the LinkedIn icon', () => {
    render(<Footer />);

    const linkedinIcon = screen.getByLabelText('LinkedIn');
    expect(linkedinIcon).toBeInTheDocument();
  });
});
