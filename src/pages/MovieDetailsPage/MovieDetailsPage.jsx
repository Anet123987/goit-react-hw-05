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

  return (
    <main>
      <button onClick={() => navigate(backLink)}>← Назад</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <hr />
      <h3>Додаткова інформація</h3>
      <ul>
        <li><Link to="cast" state={{ from: backLink }}>Акторський склад</Link></li>
        <li><Link to="reviews" state={{ from: backLink }}>Відгуки</Link></li>
      </ul>
      <hr />


      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
