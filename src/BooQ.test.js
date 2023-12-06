// src/BooQ.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BooksQ from './BooksQ';

describe('BooksQ', () => {

  it('renders the search input fields and buttons', () => {
    render(<BooksQ />);

    const referenceInput = screen.getByLabelText('Enter verse reference');
    const keywordInput = screen.getByLabelText('Enter keyword');
    const searchReverseButton = screen.getByRole('button', { name: 'Search reverse' });
    const searchKeywordButton = screen.getByRole('button', { name: 'Search Keyword' });

    expect(referenceInput).toBeInTheDocument();
    expect(keywordInput).toBeInTheDocument();
    expect(searchReverseButton).toBeInTheDocument();
    expect(searchKeywordButton).toBeInTheDocument();
  });

  it('searches by verse reference and displays results', async () => {
    render(<BooksQ />);

    const referenceInput = screen.getByLabelText('Enter verse reference');

    fireEvent.change(referenceInput, { target: { value: '2:255' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search reverse' }));

    await waitFor(() => {
      const results = screen.getAllByRole('result');
      expect(results.length).toBe(1);
      expect(results[0].textContent).toContain('2:255');
    });
  });

  it('searches by keyword and displays results', async () => {
    render(<BooksQ />);

    const keywordInput = screen.getByLabelText('Enter keyword');

    fireEvent.change(keywordInput, { target: { value: 'الرحمن' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search Keyword' }));

    await waitFor(() => {
      const results = screen.getAllByRole('result');
      expect(results.length).toBe(1);
      expect(results[0].textContent).toContain('1:1');
    });
  });

  it('displays an error message if the search fails', async () => {
    render(<BooksQ />);

    const keywordInput = screen.getByLabelText('Enter keyword');

    fireEvent.change(keywordInput, { target: { value: 'nonexistentkeyword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search Keyword' }));

    await waitFor(() => {
      const errorMessage = screen.getByText('Une erreur s\'est produite');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
