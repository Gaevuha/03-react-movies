import axios from 'axios';
import type { Movie } from '../types/movie';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

interface FetchMoviesResp {
  results: Movie[];
  total_pages: number;
}

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async (
  query: string,
): Promise<Movie[]> => {
  const response = await axios.get<FetchMoviesResp>('/search/movie', {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.results;
};
