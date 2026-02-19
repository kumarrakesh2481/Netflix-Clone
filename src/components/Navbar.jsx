import { Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = ({ onSearch, searchTerm }) => {
    const { logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        setShowLogoutConfirm(false);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-black bg-opacity-90 px-4 py-3 flex justify-between items-center shadow-md">
            {/* Left: Logo */}
            <div className="flex items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-netflix-red tracking-tighter cursor-pointer">NETFLIX</h1>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-xl mx-4 relative">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="w-full bg-netflix-gray text-white px-4 py-2 pl-10 rounded border border-transparent focus:border-neutral-500 focus:outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                </div>
            </div>

            {/* Right: Logout */}
            <div>
                <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Profile"
                        className="h-8 w-8 rounded"
                    />
                    <LogOut className="h-5 w-5" />
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60]">
                    <div className="bg-netflix-gray p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-xl font-bold text-white mb-4">Sign Out?</h3>
                        <p className="text-gray-300 mb-6">Are you sure you want to sign out?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="px-4 py-2 text-white hover:bg-gray-700 rounded transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="px-4 py-2 bg-netflix-red text-white font-bold rounded hover:bg-red-700 transition"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
