import React, { useReducer, useState } from 'react';
import axios from 'axios';
import './BooksQ.css';

// État initial
const initialState = {
  reference: '',
  keyword: '',
  data: null,
  loading: false,
  error: null,
};

// Actions pour le reducer
const actions = {
  SET_REFERENCE: 'SET_REFERENCE',
  SET_KEYWORD: 'SET_KEYWORD',
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
};

// Reducer pour gérer les transitions d'état
const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_REFERENCE:
      return { ...state, reference: action.payload };
    case actions.SET_KEYWORD:
      return { ...state, keyword: action.payload };
    case actions.FETCH_START:
      return { ...state, loading: true, error: null };
    case actions.FETCH_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case actions.FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const BooksQ = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch = async () => {
    dispatch({ type: actions.FETCH_START });

    try {
      let response;
      if (state.reference) {
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

  return (
    <div className="booksq-container">
      <div>
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
      <div>
        <input
          type="text"
          value={state.keyword}
          onChange={(e) => dispatch({ type: actions.SET_KEYWORD, payload: e.target.value })}
          placeholder="Enter keyword"
        />
        <button onClick={handleSearch}>Search Keyword</button>
      </div>
      <div>
        {state.data && (
          <div className="result-container">
            <p className="result-title">Search Results</p>
            {state.data.map((item, index) => (
              <div key={index}>
                <p className="result-number">Number: {item?.number}</p>
                <p className="result-text">Text: {item?.text}</p>
                <p className="result-edition">Edition: {item?.edition?.name}</p>
                <p className="result-surah-number">Surah Number: {item?.surah?.number}</p>
                <p className="result-surah-name">Surah Name: {item?.surah?.name}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksQ;
