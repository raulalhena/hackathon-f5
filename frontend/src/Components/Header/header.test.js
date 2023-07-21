import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  test('renders Logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Logo');
        expect(logo).toBeInTheDocument();
      });
    });
