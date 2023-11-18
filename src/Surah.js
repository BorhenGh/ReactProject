import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import './surah.css';

// État initial
const initialState = {
  surahs: [],
  loading: false,
  error: null,
};

// Actions pour le reducer
const actions = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
};

// Reducer pour gérer les transitions d'état
const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_START:
      return { ...state, loading: true, error: null };
    case actions.FETCH_SUCCESS:
      return { ...state, surahs: action.payload, loading: false };
    case actions.FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const Surah = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchSurahs = async () => {
      dispatch({ type: actions.FETCH_START });

      try {
        const response = await axios.get('http://api.alquran.cloud/v1/meta');
        const surahs = Object.values(response.data.data.surahs.references);
        dispatch({ type: actions.FETCH_SUCCESS, payload: surahs });
      } catch (error) {
        dispatch({ type: actions.FETCH_ERROR, payload: 'Une erreur s\'est produite' });
        console.error(error);
      }
    };

    fetchSurahs();
  }, []);

  return (
    <div>
      <h1>Quran Surahs</h1>
      {state.surahs.map((surah) => (
        <div key={surah.number} className="ticket">
          <h2>{surah.englishName}</h2>
          <p>{surah.name}</p>
          <p>Number of Verses: {surah.numberOfAyahs}</p>
          <p>Revelation Type: {surah.revelationType}</p>
        </div>
      ))}
    </div>
  );
};

export default Surah;
