import { Route, Redirect, Switch } from 'react-router-dom';
import api from 'services/ApiService';
import MoviesList from './MoviesList';
import Navigation from './Navigation';

export const App = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/">
          <MoviesList />
        </Route>
        <Route path="/movies"></Route>
        <Route path="/pagenotfound">{/* <PageNotFound /> */}</Route>
        <Redirect to="/pagenotfound" />
      </Switch>
    </div>
  );
};
