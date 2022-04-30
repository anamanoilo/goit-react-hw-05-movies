import s from './MoviesList.module.scss';
import { useState, useEffect } from 'react';
import api from 'services/ApiService';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const { url } = useRouteMatch();

  async function loadTrendingMovies() {
    try {
      api.searchQuery = '';
      const { results } = await api.fetchTrendingMovies();
      setMovies(results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      <h1 className={s.title}>Trending movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              className={s.movieLink}
              to={{
                pathname: `${url}movies/${movie.id}`,
                state: { from: location },
              }}
            >
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesList;
