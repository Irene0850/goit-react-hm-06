import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navLink}>
      <NavLink className={css.accent} to="/" end>
        Home
      </NavLink>

      <NavLink to="/movies">Movies</NavLink>
    </nav>
  );
};
export default Navigation;
