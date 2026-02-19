import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import useDebounce from '../hooks/useDebounce';
import { searchMovies } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchMovies = useCallback(async (query) => {
        setLoading(true);
        setError('');
        try {
            // Default to Avengers if query is empty
            const searchQuery = query.trim() || 'Avengers';
            const data = await searchMovies(searchQuery);

            if (data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
                if (data.Error) setError(data.Error);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch movies');
            setMovies([]);
            toast.error('Failed to update movie list');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm, fetchMovies]);

    const handleMovieClick = (imdbID) => {
        setSelectedMovieId(imdbID);
    };

    const closeModals = () => {
        setSelectedMovieId(null);
    };

    return (
        <div className="min-h-screen bg-netflix-black text-white font-sans">
            <Navbar onSearch={setSearchTerm} searchTerm={searchTerm} />

            <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
                <h2 className="text-2xl font-bold mb-6 text-white">
                    {searchTerm ? `Results for "${searchTerm}"` : 'Trending Now'}
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-gray-400 mt-10">
                        <p className="text-xl">{error}</p>
                    </div>
                ) : movies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} onClick={handleMovieClick} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 mt-10">
                        <p className="text-xl">No movies found.</p>
                    </div>
                )}
            </main>

            {selectedMovieId && (
                <MovieModal imdbID={selectedMovieId} onClose={closeModals} />
            )}
        </div>
    );
};

export default Dashboard;
