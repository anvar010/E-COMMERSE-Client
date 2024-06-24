import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for spinner

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner

        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/forgotpassword', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error:', error.response.data.message);
            setMessage(error.response.data.message);
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-24 w-auto" src={logo} alt="Logo" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Enter your registered email to reset your password.</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
                    <input
                        id="user_email"
                        name="user_email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2 h-4 w-4 text-white" /> // Show spinner icon
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                <h5 className="text-sm">
                        New here? <Link to={'/register'} className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up.</Link>
                    </h5>
                    <h5 className="text-sm mt-2">
                        Already have an account? <Link to={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">Sign In.</Link>
                    </h5>
                    {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
