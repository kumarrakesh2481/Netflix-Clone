import { motion } from 'framer-motion';

const MovieCard = ({ movie, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
            className="relative bg-netflix-gray rounded-lg overflow-hidden cursor-pointer shadow-lg group hover:shadow-2xl h-full flex flex-col"
            onClick={() => onClick(movie.imdbID)}
        >
            <div className="relative aspect-[2/3] w-full">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                    alt={movie.Title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="text-white text-lg font-bold line-clamp-2 mb-1">{movie.Title}</h3>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                        <span>{movie.Year}</span>
                        <span className="capitalize border border-gray-600 px-2 py-0.5 rounded text-xs">{movie.Type}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
