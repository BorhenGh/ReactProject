import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Surah from './Surah';

import Home from './Home';

import BooksQ from './BooksQ';
function App() {
  return (
    <Router>
      <div className="App">
     
        <Routes>
          <Route path="/boo" element={<BooksQ/>} />
          <Route path="/Surah" element={<Surah />} />
       
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
