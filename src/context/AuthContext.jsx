import { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('currentUser');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signup = (email, password, fullName) => {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (existingUsers.find(u => u.email === email)) {
            throw new Error('User already exists');
        }

        const hashedPassword = CryptoJS.SHA256(password).toString();
        const newUser = { email, password: hashedPassword, fullName };

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        return true;
    };

    const login = (email, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = existingUsers.find(u => u.email === email);

        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = CryptoJS.SHA256(password).toString();
        if (user.password !== hashedPassword) {
            throw new Error('Invalid password');
        }

        // Mock JWT
        const token = btoa(JSON.stringify({ email: user.email, exp: Date.now() + 3600000 }));
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify({ email: user.email, fullName: user.fullName }));
        setUser({ email: user.email, fullName: user.fullName });

        return true;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        signup,
        login,
        logout,
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
