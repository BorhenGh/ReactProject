import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';

jest.mock('axios');

describe('Home', () => {

  it('should render the home page correctly', () => {
    render(<Home />);

    expect(screen.getByText('Bienvenue dans notre bibliothèque')).toBeInTheDocument();
    expect(screen.getByText('Découvrez notre vaste collection de livres')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Quran' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Surah' })).toBeInTheDocument();
  });

  describe('Quran Button', () => {
    it('should show Quran alert on button click', async () => {
      render(<Home />);

      fireEvent.click(screen.getByRole('button', { name: 'Quran' }));

      expect(screen.getByText('Contenu de l\'alerte pour Quran')).toBeInTheDocument();
    });

    it('should make an API call to the correct URL', async () => {
      render(<Home />);

      fireEvent.click(screen.getByRole('button', { name: 'Quran' }));

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('https://api.example.com/quran');
      });
    });

    it('should navigate to /boo after 3 seconds on button click', async () => {
      const navigate = jest.fn();
      render(<Home navigate={navigate} />);

      fireEvent.click(screen.getByRole('button', { name: 'Quran' }));

      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/boo');
      }, { timeout: 3100 });
    });
  });

  describe('Surah Button', () => {
    it('should show Surah alert on button click', async () => {
      render(<Home />);

      fireEvent.click(screen.getByRole('button', { name: 'Surah' }));

      expect(screen.getByText('Contenu de l\'alerte pour Surah')).toBeInTheDocument();
    });

    it('should make an API call to the correct URL', async () => {
      render(<Home />);

      fireEvent.click(screen.getByRole('button', { name: 'Surah' }));

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('https://api.example.com/surah');
      });
    });

    it('should navigate to /Surah after 3 seconds on button click', async () => {
      const navigate = jest.fn();
      render(<Home navigate={navigate} />);

      fireEvent.click(screen.getByRole('button', { name: 'Surah' }));

      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/Surah');
      }, { timeout: 3100 });
    });
  });
});
