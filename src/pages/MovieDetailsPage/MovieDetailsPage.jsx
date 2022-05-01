import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
  NavLink,
  Route,
} from 'react-router-dom';
import s from './MovieDetailsPage.module.scss';
import notFoundImg from 'images/not_found_ver.jpg';
import api from 'services/ApiService';
import Loader from 'components/Loader/Loader';
const Cast = lazy(() =>
  import('components/Cast' /* webpackChunkName: "cast" */)
);
const Reviews = lazy(() =>
  import('components/Reviews' /* webpackChunkName: "reviews" */)
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (movieId) {
      (async () => {
        api.movieId = movieId;
        try {
          const data = await api.fetchMovieDetails();
          setMovie(data);
        } catch (err) {}
      })();
    }
  }, [movieId]);

  const onGoBackClick = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <section>
      <button type="button" onClick={onGoBackClick}>
        Go Back
      </button>
      {movie && (
        <>
          <div className={s.cardWrapper}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : notFoundImg
              }
              alt={movie.title || movie.name}
              width="300px"
            />
            <div className={s.contentWrapper}>
              <h2>
                {movie.title || movie.name}(
                {new Date(
                  movie.release_date || movie.first_air_date
                ).getFullYear()}
                )
              </h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{movie.overview || 'Data not found'}</p>
              <h2>Genres</h2>
              <p>
                {movie.genres.map(({ name }) => name).join(' ') ||
                  'Genres not found'}
              </p>
            </div>
          </div>
          <div className={s.wrapper}>
            <h2>Additional information</h2>
            <NavLink
              className={s.infoLink}
              activeClassName={s.activeInfoLink}
              to={{
                pathname: `${url}/cast`,
                state: { ...location.state },
              }}
            >
              Cast
            </NavLink>
            <NavLink
              className={s.infoLink}
              activeClassName={s.activeInfoLink}
              to={{
                pathname: `${url}/reviews`,
                state: { ...location.state },
              }}
            >
              Reviews
            </NavLink>
          </div>
          <div>
            <Suspense fallback={<Loader />}>
              <Route path={`/movies/:movieId/cast`}>
                <Cast />
              </Route>
              <Route path={`/movies/:movieId/reviews`}>
                <Reviews />
              </Route>
            </Suspense>
          </div>
        </>
      )}
    </section>
  );
};

export default MovieDetailsPage;
