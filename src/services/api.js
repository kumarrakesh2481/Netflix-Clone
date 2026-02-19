import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_OMDB_BASE_URL,
});

export const searchMovies = async (query, page = 1) => {
    const response = await api.get('', {
        params: {
            apikey: import.meta.env.VITE_OMDB_API_KEY,
            s: query,
            page,
        },
    });
    if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'No movies found');
    }
    return response.data;
};

export const getMovieDetails = async (imdbID) => {
    const response = await api.get('', {
        params: {
            apikey: import.meta.env.VITE_OMDB_API_KEY,
            i: imdbID,
            plot: 'full',
        },
    });
    return response.data;
};
