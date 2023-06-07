import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="home-content">
        <h1 className="home-title">Bienvenue dans notre bibliothèque</h1>
        <p className="home-description">Découvrez notre vaste collection de livres</p>
        <div className="button-container">
          <Link to="/boo" className="home-button">Quran</Link>
          <Link to="/Surah" className="home-button">Surah</Link>
       
        </div>
      </div>
    </div>
  );
}

export default Home;
