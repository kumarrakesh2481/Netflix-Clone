import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import toast from 'react-hot-toast';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const validate = (name, value) => {
        let error = '';
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Invalid email format';
        }
        if (name === 'password') {
            if (value.length < 8) error = 'Password must be at least 8 characters';
            else if (!/[A-Z]/.test(value)) error = 'Must contain an uppercase letter';
            else if (!/[a-z]/.test(value)) error = 'Must contain a lowercase letter';
            else if (!/[0-9]/.test(value)) error = 'Must contain a number';
        }
        if (name === 'confirmPassword' && value !== formData.password) {
            error = 'Passwords do not match';
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Final validation
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validate(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            await signup(formData.email, formData.password, formData.fullName);
            toast.success('Account created successfully! Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Sign Up">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-3 py-3 rounded bg-netflix-gray text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className={`w-full px-3 py-3 rounded bg-netflix-gray text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-netflix-red'}`}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`w-full px-3 py-3 rounded bg-netflix-gray text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-netflix-red'}`}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className={`w-full px-3 py-3 rounded bg-netflix-gray text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-netflix-red'}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading || Object.values(errors).some(e => e)}
                    className="w-full py-3 bg-netflix-red text-white font-bold rounded hover:bg-red-700 transition duration-200 disabled:opacity-50"
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <div className="text-gray-400 mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-white hover:underline">Sign in now</Link>.
                </div>
            </form>
        </AuthLayout>
    );
};

export default Signup;
