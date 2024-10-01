import { NavLink, useLocation } from "react-router-dom";

import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  if (!movies.length) {
    return null;
  }

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
            <h3>{movie.title}</h3>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
