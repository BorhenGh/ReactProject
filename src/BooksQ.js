import React, { useState } from 'react';
import './BooksQ.css';
const BooksQ = () => {
  const [reference, setReference] = useState('');
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState(null);

  const fetchVerse = async () => {
    try {
      const response = await fetch(`http://api.alquran.cloud/v1/ayah/${reference}/en-saheeh`);
      const jsonData = await response.json();
      setData([jsonData.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`http://api.alquran.cloud/v1/search/${keyword}/all/en`);
      const jsonData = await response.json();
      setData(jsonData.data.matches);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (reference) {
      fetchVerse();
    } else if (keyword) {
      fetchSearchResults();
    }
  };

  return (
    <div className="booksq-container">
      <div>
        <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Enter verse reference" />
        <button className="button button-primary" onClick={handleSearch}>Search reverse</button>   </div> <br/><br/><br/>
       <di> <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword" />
        <button onClick={handleSearch}>Search Keyword</button></di>
      <div>
       
      </div>

      {data && (
        <div className="result-container">
          <p className="result-title">Search Results</p>
          {data.map((item, index) => (
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
  );
};

export default BooksQ;
