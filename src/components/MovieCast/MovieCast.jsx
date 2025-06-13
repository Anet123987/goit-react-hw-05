import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=uk`, {
      headers: {
        Authorization: 'Bearer <твій_токен_тут>'
      }
    })
    .then(res => setCast(res.data.cast))
    .catch(err => console.error(err));
  }, [movieId]);

  if (cast.length === 0) return <p>Інформація про акторів відсутня</p>;

  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {cast.map(({ cast_id, profile_path, name, character }) => (
        <li key={cast_id} style={{ width: '150px' }}>
          <img
            src={
              profile_path && profile_path !== 'null'
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/150x225?text=No+Image'
            }
            alt={name}
            width="150"
            height="225"
          />
          <p><b>{name}</b></p>
          <p>Роль: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
