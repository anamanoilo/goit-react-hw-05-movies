import s from './MoviesSearchPage.module.scss';
import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import api from 'services/ApiService';

const MoviesSearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  const onInputChange = e => {
    setQuery(e.target.value);
  };

  const urlQuery = new URLSearchParams(location.search).get('query') || '';

  const onFormSubmit = e => {
    e.preventDefault();
    if (query.trim()) {
      api.searchQuery = query.trim();

      api
        .fetchMovieByKeyword()
        .then(({ results }) => {
          setMovies(results);
          history.push({ ...location, search: `query=${query}` });
        })
        .then(setQuery(''));
    }
  };

  useEffect(() => {
    if (!urlQuery) {
      return;
    }

    api.searchQuery = urlQuery;
    api.fetchMovieByKeyword().then(({ results }) => {
      setMovies(results);
    });
  }, [urlQuery]);

  return (
    <div>
      <div className={s.formWrapper}>
        <form onSubmit={onFormSubmit} className={s.form}>
          <input
            className={s.input}
            type="text"
            value={query}
            onChange={onInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                className={s.movieLink}
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesSearchPage;
