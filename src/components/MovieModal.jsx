import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getMovieDetails } from '../services/api';

const MovieModal = ({ imdbID, onClose }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = await getMovieDetails(imdbID);
                if (data.Response === 'False') {
                    setError(data.Error);
                } else {
                    setMovie(data);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch details');
            } finally {
                setLoading(false);
            }
        };

        if (imdbID) {
            fetchDetails();
        }
    }, [imdbID]);

    if (!imdbID) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-netflix-gray text-white rounded-lg overflow-hidden shadow-2xl animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black bg-opacity-50 rounded-full hover:bg-white hover:text-black transition-colors"
                >
                    <X size={20} />
                </button>

                {loading ? (
                    <div className="h-96 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
                    </div>
                ) : error ? (
                    <div className="h-96 flex items-center justify-center text-red-500">
                        {error}
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row h-full max-h-[80vh] overflow-y-auto">
                        <div className="md:w-1/3 h-full relative">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                                alt={movie.Title}
                                className="object-cover w-full h-full min-h-[400px]"
                            />
                        </div>
                        <div className="md:w-2/3 p-6 space-y-4">
                            <h2 className="text-3xl font-bold">{movie.Title} <span className="text-gray-400 font-normal">({movie.Year})</span></h2>

                            <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                                <span className="px-2 py-1 border border-gray-600 rounded">{movie.Rated}</span>
                                <span>{movie.Runtime}</span>
                                <span>{movie.Genre}</span>
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                {/* Rating */}
                                <div className="flex items-center gap-1 text-green-400 font-bold">
                                    <span>IMDb {movie.imdbRating}</span>
                                </div>
                            </div>

                            <p className="text-lg leading-relaxed text-gray-200">
                                {movie.Plot}
                            </p>

                            <div className="space-y-1 text-sm text-gray-400 border-t border-gray-700 pt-4">
                                <p><span className="text-gray-500">Director:</span> {movie.Director}</p>
                                <p><span className="text-gray-500">Cast:</span> {movie.Actors}</p>
                                <p><span className="text-gray-500">Writer:</span> {movie.Writer}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieModal;
