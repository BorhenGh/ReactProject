

import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import './BooksQ.css';

const initialState = {
  reference: '',
  keyword: '',
  data: null,
  loading: false,
  error: null,
  sortBy: 'number',
  lastSearches: [],
  currentPage: 1,
  itemsPerPage: 5,
};

const actions = {
  SET_REFERENCE: 'SET_REFERENCE',
  SET_KEYWORD: 'SET_KEYWORD',
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_REFERENCE:
      return { ...state, reference: action.payload };
    case actions.SET_KEYWORD:
      return { ...state, keyword: action.payload };
    case actions.FETCH_START:
      return { ...state, loading: true, error: null };
    case actions.FETCH_SUCCESS:
      const lastSearch = {
        keyword: state.keyword,
        reference: state.reference,
      };
      const uniqueSearches = Array.from(new Set([lastSearch, ...state.lastSearches]));
      return {
        ...state,
        data: action.payload,
        loading: false,
        lastSearches: uniqueSearches.slice(0, 9),
        reference: '',
        keyword: '',
      };
    case actions.FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
    case actions.SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    case actions.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const BooksQ = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (state.data) {
      const sorted = [...state.data].sort((a, b) => a[state.sortBy] - b[state.sortBy]);
      setSortedData(sorted);
    }
  }, [state.data, state.sortBy]);

  const handleSearch = async () => {
    dispatch({ type: actions.FETCH_START });

    try {
      let response;

      if (state.reference && !state.keyword) {
        response = await axios.get(`http://api.alquran.cloud/v1/ayah/${state.reference}/en-saheeh`);
      } else if (state.keyword) {
        response = await axios.get(`http://api.alquran.cloud/v1/search/${state.keyword}/all/en`);
      }

      dispatch({ type: actions.FETCH_SUCCESS, payload: response.data.data.matches || [response.data.data] });
    } catch (error) {
      dispatch({ type: actions.FETCH_ERROR, payload: 'Une erreur s\'est produite' });
      console.error(error);
    }
  };

  const handleSortChange = (sortBy) => {
    dispatch({ type: actions.SET_SORT_BY, payload: sortBy });
  };

  const handlePageChange = (page) => {
    dispatch({ type: actions.SET_CURRENT_PAGE, payload: page });
  };

  return (
    <div className="booksq-container">
      <div className="last-searches">
        <p>Last Searches:</p>
        <ul>
          {state.lastSearches.length > 0 && (
            <li>
              Last Reverse: {state.lastSearches
                .filter(search => search.reference)
                .map(search => search.reference)
                .filter(Boolean)
                .join(', ')}
            </li>
          )}
          {state.lastSearches.length > 0 && (
            <li>
              Last Keyword: {state.lastSearches
                .filter(search => search.keyword)
                .map(search => search.keyword)
                .filter(Boolean)
                .join(', ')}
            </li>
          )}
        </ul>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={state.reference}
          onChange={(e) => dispatch({ type: actions.SET_REFERENCE, payload: e.target.value })}
          placeholder="Enter verse reference"
        />
        <button className="button button-primary" onClick={handleSearch}>
          Search reverse
        </button>
      </div>
      <br />
      <br />
      <br />
      <div className="input-container">
        <input
          type="text"
          value={state.keyword}
          onChange={(e) => dispatch({ type: actions.SET_KEYWORD, payload: e.target.value })}
          placeholder="Enter keyword"
        />
        <button onClick={handleSearch}>Search Keyword</button>
      </div>
      <div className="sort-container">
        <label>Sort by:</label>
        <select value={state.sortBy} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="number">Number</option>
          {/* Add other sorting options as needed */}
        </select>
      </div>
      <div>
        {sortedData.length > 0 && (
          <div className="result-container">
            {sortedData
              .slice((state.currentPage - 1) * state.itemsPerPage, state.currentPage * state.itemsPerPage)
              .slice(0, 5)
              .map((item, index) => (
                <div key={index} className="result-item">
                  {state.reference ? (
                    <>
                      <p className="result-number">Reverse Number: {item?.number}</p>
                      <p className="result-text">Text: {item?.text}</p>
                    </>
                  ) : (
                    <>
                      <p className="result-keyword">Keyword: {state.keyword}</p>
                      <p className="result-text">Text: {item?.text}</p>
                    </>
                  )}
                  <p className="result-edition">Edition: {item?.edition?.name}</p>
                  <p className="result-surah-number">Surah Number: {item?.surah?.number}</p>
                  <p className="result-surah-name">Surah Name: {item?.surah?.name}</p>
                  <hr />
                </div>
              ))}
            <div className="pagination-container">
              <button onClick={() => handlePageChange(state.currentPage - 1)} disabled={state.currentPage === 1}>
                Previous Page
              </button>
              <button onClick={() => handlePageChange(state.currentPage + 1)}>
                Next Page
              </button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default BooksQ;
