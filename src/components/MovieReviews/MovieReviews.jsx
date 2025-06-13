import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=uk`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODAzM2FkMjU5YmUwNWZiMzdmMmMyZGJkZDgxYjJlNyIsIm5iZiI6MTc0OTcxMDM0My4wMDgsInN1YiI6IjY4NGE3NjA2NTQ3Nzk4MTFmNDMwMjgzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w7jPm3c7hY1FH6OAXj-fcxB6TO_pDpkgjYpJst_WjBU',
            },
          }
        );
        setReviews(response.data.results);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити відгуки.');
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>Відгуків поки що немає.</p>;

  return (
    <ul style={{ paddingLeft: 0 }}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} style={{ marginBottom: '20px', listStyle: 'none' }}>
          <h4>Автор: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
