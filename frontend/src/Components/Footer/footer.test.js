import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer', () => {
  test('renders footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoTwitter = screen.getByAltText('LogoTwitter');
    expect(logoTwitter).toBeInTheDocument();

    const logoFacebook = screen.getByAltText('LogoFacebook');
    expect(logoFacebook).toBeInTheDocument();
  });
});
