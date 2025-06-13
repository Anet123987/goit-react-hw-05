import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css'; // 👈 імпорт стилів

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }
    api
      .get(`search/movie?query=${query}&include_adult=false&language=uk&page=1`)
      .then(res => setMovies(res.data.results))
      .catch(console.error);
  }, [query]);

  const onSubmit = e => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearchParams({ query: trimmed });
    }
  };

  return (
    <main>
      <h1>Пошук фільмів</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Введіть назву фільму"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Пошук
        </button>
      </form>

      <MovieList movies={movies} />
    </main>
  );
};

export default MoviesPage;
