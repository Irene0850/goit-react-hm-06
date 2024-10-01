import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODY5NTgyYzk2ZjdkZTkzMzczZTgwYzgyMzVmM2ViZSIsIm5iZiI6MTcyNzgwNDQyNC41MTA0NTIsInN1YiI6IjY2ZmFlZDdlM2EwZjVhMDhjOGYxYTEwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-euZr7l0keDQyljKsJg0Dxa8wA200gsOt0qtlQ8YqUE";
const BASE_URL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}trending/movie/day?language=en-US&`,
    options
  );
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
