import { useState, useEffect } from "react";

import MovieList from "../../components/MovieList/MovieList";

import { fetchTrendingMovies } from "../../Api/Api";

import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      setMovies(trendingMovies);
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1 className={css.homeTitle}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
