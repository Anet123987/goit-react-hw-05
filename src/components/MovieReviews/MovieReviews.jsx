import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get(`movie/${movieId}/reviews?language=uk`)
      .then(res => setReviews(res.data.results))
      .catch(console.error);
  }, [movieId]);

  if (reviews.length === 0) return <p>Відгуків немає</p>;

  return (
    <ul className={styles.reviewList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.reviewItem}>
          <h4>{author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
