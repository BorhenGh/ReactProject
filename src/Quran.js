import { Link } from 'react-router-dom';
const Quran = () => {
    const message = 'Bonjour, monde!';
    
    return (
      <div>
        <div>
      <h1>Welcome to Quran App</h1>
      <p>Choose an option:</p>

      {/* Lien vers le composant BooksQ */}
      <a href="/booksq">Quran Ayat</a>

      {/* Lien vers le composant Surah */}
      <a href="/surah">Quran Surah</a>
    </div>
      </div>
    );
  };
  export default Quran;