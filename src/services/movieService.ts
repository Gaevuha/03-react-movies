import axios from 'axios';
import type { Movie } from '../types/movie';

axios.defaults.baseURL = "https://api.themoviedb.org/3"


interface FetchMoviesResp {
    results: Movie[];
    total_pages: number;
}

export const fetchMovies = async (query: string) => {
     const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTQ2ZjcyNGU1ZDgyYWRiNjliMWYwMDQ2NWE4ZjEyNCIsIm5iZiI6MTc1MTM1MjgxNS43NjE5OTk4LCJzdWIiOiI2ODYzODVlZjNkNDg5OTRhZmM0OTU1MDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FVquXGbNU6g9wkxtJtofsyyGV3UOKlh4PPY-dob1KBQ'; // або API_KEY
        const response = await axios.get<FetchMoviesResp>('/search/movie', {
          params: {
            query: query,          
          },
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        });
    return response.data.results;
}