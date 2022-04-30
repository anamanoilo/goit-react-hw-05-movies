import { lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import Navigation from 'components/Navigation';
const MoviesList = lazy(() =>
  import('pages/MoviesList' /* webpackChunkName: "movies-list" */)
);
const MovieDetailsPage = lazy(() =>
  import('pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */)
);
const MoviesSearchPage = lazy(() =>
  import('pages/MoviesSearchPage' /* webpackChunkName: "movie-search-page" */)
);

export const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <MoviesList />
          </Route>
          <Route path="/movies" exact>
            <MoviesSearchPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
};
