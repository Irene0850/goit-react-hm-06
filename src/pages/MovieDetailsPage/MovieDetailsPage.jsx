import React, { useState, useEffect, Suspense, useRef } from "react";
import {
  useParams,
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../../Api/Api";

import css from "./MovieDetailsPage.module.css";

const MovieCast = React.lazy(() =>
  import("../../components/MovieCast/MovieCast")
);
const MovieReviews = React.lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location.state);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieData = await fetchMovieDetails(movieId);
      setMovie(movieData);
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (locationRef.current && locationRef.current.from) {
      navigate(locationRef.current.from);
    } else {
      navigate("/movies");
    }
  };

  if (!movie) {
    return <p>Loading...</p>;
  }
  const userScore = (movie.vote_average * 10).toFixed(0);

  return (
    <div className={css.movieDetailsPage}>
      <button className={css.button} onClick={handleGoBack}>
        Go back
      </button>
      <div className={css.movieDetailsBox}>
        <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
        <div className={css.box}>
          <h1>{movie.title}</h1>
          <p>User Score: {userScore}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <h3>Additional information</h3>
      <ul className={css.listDetails}>
        <li>
          <Link
            to={{
              pathname: `/movies/${movieId}/cast`,
              state: {
                from: locationRef.current ? locationRef.current.from : "/",
              },
            }}
          >
            Cast
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: `/movies/${movieId}/reviews`,
              state: {
                from: locationRef.current ? locationRef.current.from : "/",
              },
            }}
          >
            Reviews
          </Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
