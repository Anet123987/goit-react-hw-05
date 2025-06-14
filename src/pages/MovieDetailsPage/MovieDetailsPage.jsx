import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import api from '../../api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const backLink = location.state?.from || '/movies';

  useEffect(() => {
    api.get(`movie/${movieId}?language=uk`)
      .then(res => setMovie(res.data))
      .catch(console.error);
  }, [movieId]);

  if (!movie) return <p>Завантаження фільму...</p>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <main>
      <button onClick={() => navigate(backLink)}>← Назад</button>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <img src={posterUrl} alt={movie.title} width="300" height="450" />
        <div>
          <h1>{movie.title}</h1>
          <p><strong>Опис:</strong> {movie.overview}</p>
          <p><strong>Дата релізу:</strong> {movie.release_date}</p>
          <p><strong>Рейтинг:</strong> {movie.vote_average}</p>
        </div>
      </div>

      <hr />
      <h3>Додаткова інформація</h3>
      <ul>
        <li><Link to="cast" state={{ from: backLink }}> Cast</Link></li>
        <li><Link to="reviews" state={{ from: backLink }}>Reviews</Link></li>
      </ul>
      <hr />

      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
