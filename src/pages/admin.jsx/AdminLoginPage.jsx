import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const navigate = useNavigate(); 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/admin/adminlogin', {
                email: username,
                password
            });
            const { data } = response.data; 
            localStorage.setItem('token', data.token);
            navigate('/admin'); 
        } catch (error) {
            console.error('Admin login error:', error.response.data.message);
            setError('Invalid email or password'); 
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-xs">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <div className="text-center">
                        <div className="text-5xl text-gradient bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                            <i className="fas fa-key"></i>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">ADMIN PANEL</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-xs font-bold text-gray-400">USERNAME</label>
                            <input
                                id="username"
                                type="text"
                                className="w-full bg-gray-700 border-b-2 border-blue-500 py-2 text-white focus:outline-none focus:border-blue-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-xs font-bold text-gray-400">PASSWORD</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full bg-gray-700 border-b-2 border-blue-500 py-2 text-white focus:outline-none focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="text-sm text-red-500 mb-4">{error}</div>}
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400"> {/* Placeholder for Error Message */} </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                LOGIN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
