import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Surah from './Surah';

describe('Surah', () => {

  it('should render the initial state', () => {
    const { getByText } = render(<Surah />);

    expect(getByText('Quran Surahs')).toBeInTheDocument();
    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should fetch and display surahs successfully', async () => {
    render(<Surah />);

    // Mock axios response
    axios.get.mockResolvedValue({
      data: {
        data: {
          surahs: {
            references: {
              1: {
                number: 1,
                englishName: 'Al-Fatihah',
                name: 'الفاتحة',
                numberOfAyahs: 7,
                revelationType: 'Meccan',
              },
              // ... other surahs
            },
          },
        },
      },
    });

    await waitFor(() => {
      expect(axios.get).toBeCalledWith('http://api.alquran.cloud/v1/meta');

      const ticketElements = screen.getAllByRole('article');
      expect(ticketElements.length).toBe(114); // Assume 114 surahs

      const firstSurah = ticketElements[0];
      expect(firstSurah).toHaveTextContent(/Al-Fatihah/i);
      expect(firstSurah).toHaveTextContent(/الفاتحة/i);
      expect(firstSurah).toHaveTextContent(/7 verses/i);
      expect(firstSurah).toHaveTextContent(/Meccan/i);
    });
  });

  it('should display an error message when fetching fails', async () => {
    render(<Surah />);

    // Mock axios error
    axios.get.mockRejectedValue({ message: 'Network error' });

    await waitFor(() => {
      expect(axios.get).toBeCalledWith('http://api.alquran.cloud/v1/meta');
      expect(screen.getByText(/Une erreur s\'est produite/i)).toBeInTheDocument();
    });
  });

  it('should show loading indicator while fetching surahs', () => {
    render(<Surah />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Simulate data being received
    dispatch({ type: actions.FETCH_SUCCESS, payload: [] });

    expect(screen.queryByText(/Loading.../i)).toBeNull();
  });
});
