import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-netflix-black text-white flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-6xl font-bold text-netflix-red mb-4">404</h1>
            <h2 className="text-2xl mb-8">Page Not Found</h2>
            <p className="text-gray-400 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/dashboard"
                className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
