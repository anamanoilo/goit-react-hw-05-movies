import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

const Navigation = () => {
  return (
    <header>
      <nav className={s.navBar}>
        <NavLink
          to="/"
          activeClassName={s.navActiveLink}
          className={s.navLink}
          exact
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          activeClassName={s.navActiveLink}
          className={s.navLink}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
