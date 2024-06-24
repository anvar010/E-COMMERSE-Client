import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
  const { token } = useParams(); // Extract token from URL params
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/passwordreset/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
          passwordConfirm: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        navigate('/login'); 
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/3 bg-red-500 h-1"></div>
          <ul className="flex w-2/3 justify-between items-center">
            <li className="text-sm uppercase font-semibold text-gray-500">
              Reset password
            </li>
            <li className="text-sm uppercase font-semibold text-gray-500">
              Login
            </li>
            <li className="w-6 h-6 rounded-full bg-red-500"></li>
          </ul>
        </div>
        <div className="text-center mb-6">
          <img
            src="https://static.stayjapan.com/assets/top/icon/values-7dd5c8966d7a6bf57dc4bcd11b2156e82a4fd0da94a26aecb560b6949efad2be.svg"
            alt="Reset Password"
            className="h-16 mx-auto mb-4"
          />
          <p className="text-xl font-bold text-gray-700">
            Reset your password
          </p>
          <p className="text-sm text-gray-500">
            Your password needs to be at least 8 characters.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="o3-form-group">
            <label htmlFor="new_password" className="block text-gray-700">
              New password
            </label>
            <input
              type="password"
              id="new_password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="o3-form-group">
            <label htmlFor="confirm_password" className="block text-gray-700">
              Confirm new password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none"
          >
            Set new password
          </button>
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
