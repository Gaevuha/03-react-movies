import { useState } from 'react';
import './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/Movie';
import { fetchMovies } from '../../services/movieService';
import toast from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal'

export default function App() {
    const [movie, setMovie] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSearch = async (searchQuery: string) => {
        try {
            setError(false);
            setIsLoading(true);
            const newMovie = await fetchMovies(searchQuery);
            
            if (newMovie.length === 0) {
                toast.error('No movies found for your request.');
                setMovie([]);
                return;
                
            }
            setMovie(newMovie);
        } catch (error) {
            setError(true);
            console.error(error);
        }finally {
            setIsLoading(false);
          }

    };
    
    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
    }
    
   return (
    <>
           <SearchBar onSubmit={handleSearch} />
           {isLoading && <Loader />}
           {error ?
               (<ErrorMessage />) :
               (<MovieGrid movies={movie} onSelect={handleMovieClick} />
               )}
           {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
)}
           
    </>
   );
}
