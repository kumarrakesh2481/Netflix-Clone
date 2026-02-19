import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Sign In">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-3 rounded bg-netflix-gray text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        placeholder="Email or phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-3 rounded bg-netflix-gray text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-netflix-red text-white font-bold rounded hover:bg-red-700 transition duration-200 disabled:opacity-50"
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                        <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-netflix-red focus:ring-netflix-red bg-netflix-gray" />
                        <label htmlFor="remember-me" className="ml-2 block">Remember me</label>
                    </div>
                    <a href="#" className="hover:underline">Need help?</a>
                </div>

                <div className="text-gray-400 mt-4">
                    New to Netflix? <Link to="/signup" className="text-white hover:underline">Sign up now</Link>.
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
