import React, { useState } from 'react';
import './Home.css';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [showQuranAlert, setShowQuranAlert] = useState(false);
  const [showSurahAlert, setShowSurahAlert] = useState(false);
  const navigate = useNavigate();

  const handleQuranButtonClick = async () => {
    setShowQuranAlert(true);
    try {
      // Add specific Quran logic here if needed
      // For example, make an API request using axios
      const response = await axios.get('https://api.example.com/quran');
      console.log(response.data); // Log the response data
    } catch (error) {
      console.error('Error fetching Quran data', error);
    } finally {
      setTimeout(() => {
        setShowQuranAlert(false);
        navigate('/boo');
      }, 3000);
    }
  };

  const handleSurahButtonClick = async () => {
    setShowSurahAlert(true);
    try {
      // Add specific Surah logic here if needed
      // For example, make an API request using axios
      const response = await axios.get('https://api.example.com/surah');
      console.log(response.data); // Log the response data
    } catch (error) {
      console.error('Error fetching Surah data', error);
    } finally {
      setTimeout(() => {
        setShowSurahAlert(false);
        navigate('/Surah');
      }, 3000);
    }
  };

  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="home-content">
        <h1 className="home-title">Bienvenue dans notre bibliothèque</h1>
        <p className="home-description">Découvrez notre vaste collection de livres</p>
        <div className="button-container">
          <button className="home-button" onClick={handleQuranButtonClick}>
            Quran
          </button>
          <button className="home-button" onClick={handleSurahButtonClick}>
            Surah
          </button>
        </div>
      </div>

      {/* Custom Alerts */}
      {showQuranAlert && (
        <div className="custom-alert">
          <p>Contenu de l'alerte pour Quran</p>
        </div>
      )}

      {showSurahAlert && (
        <div className="custom-alert">
          <p>Contenu de l'alerte pour Surah</p>
        </div>
      )}
    </div>
  );
}

export default Home;
