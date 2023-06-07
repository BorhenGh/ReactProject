import React, { useState, useEffect } from 'react';
import'./surah.css';
const Surah = () => {
    const [surahs, setSurahs] = useState([]);

    useEffect(() => {
      const fetchSurahs = async () => {
        try {
          const response = await fetch('http://api.alquran.cloud/v1/meta');
          const jsonData = await response.json();
          setSurahs(Object.values(jsonData.data.surahs.references));
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchSurahs();
    }, []);
  
    return (
      <div>
        <h1>Quran Surahs</h1>
        {surahs.map((surah) => (
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
