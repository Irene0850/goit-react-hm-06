import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import MovieList from "../../components/MovieList/MovieList";

import { searchMovies } from "../../Api/Api";

import css from "./MoviePage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
      }
    };
    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ query: inputValue });
  };

  return (
    <div className={css.moviesPage}>
      <form className={css.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
