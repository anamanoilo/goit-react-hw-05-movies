import s from './Reviews.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from 'services/ApiService';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (movieId) {
      (async () => {
        api.movieId = movieId;
        try {
          const { results } = await api.fetchMovieReviews();
          setReviews(results);
        } catch (err) {
          console.error(err.message);
        }
      })();
    }
  }, [movieId]);

  return (
    <ul>
      {reviews?.length ? (
        reviews.map(({ author, content, author_details, id }) => {
          return (
            <li key={id} className={s.reviewItem}>
              <h3 className={s.author}>{author || author_details.name}</h3>
              <p>
                {content || 'oops, there is no content from this author...'}
              </p>
            </li>
          );
        })
      ) : (
        <li>
          <p>We don't have any reviews for this movie</p>
        </li>
      )}
    </ul>
  );
};

export default Reviews;
