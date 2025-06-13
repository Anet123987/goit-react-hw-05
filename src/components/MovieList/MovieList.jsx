import styles from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.movieItem}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            <img
              src={poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={title}
              width="300"
            />
            <p>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
