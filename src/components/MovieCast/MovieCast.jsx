import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=uk`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODAzM2FkMjU5YmUwNWZiMzdmMmMyZGJkZDgxYjJlNyIsIm5iZiI6MTc0OTcxMDM0My4wMDgsInN1YiI6IjY4NGE3NjA2NTQ3Nzk4MTFmNDMwMjgzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w7jPm3c7hY1FH6OAXj-fcxB6TO_pDpkgjYpJst_WjBU',
            },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити акторів.');
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>Інформація про акторів відсутня.</p>;

  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {cast.map(({ cast_id, profile_path, name, character }) => (
        <li key={cast_id} style={{ width: '150px' }}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/150x225?text=No+Image'
            }
            alt={name}
            width="150"
            height="225"
          />
          <p><strong>{name}</strong></p>
          <p>Роль: {character || '—'}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
