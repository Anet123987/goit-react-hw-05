import { useEffect, useState } from 'react';
import api from '../../api.js';
import MovieList from '../../components/MovieList/MovieList';


const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get('trending/movie/day?language=uk')
      .then(res => setMovies(res.data.results))
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>Популярні фільми</h1>
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;
