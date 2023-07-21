import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';

test('renders FavoriteButton', () => {
  render(<FavoriteButton />);

  const heartImage = screen.getByAltText('Corazón vacío');
  expect(heartImage).toBeInTheDocument();
});

test('toggles FavoriteButton on click', () => {
  render(<FavoriteButton />);

  const heartImage = screen.getByAltText('Corazón vacío');
  fireEvent.click(heartImage);

  const filledHeartImage = screen.getByAltText('Corazón lleno');
  expect(filledHeartImage).toBeInTheDocument();
});
