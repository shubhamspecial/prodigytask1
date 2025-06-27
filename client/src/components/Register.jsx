import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({ username, email, password, role });
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password, role });
            console.log(res.data);
            setSuccessMessage('Successfully registered! Redirecting to login...');
            setErrorMessage('');
            // Clear form
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('user');
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setSuccessMessage('');
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'An error occurred during registration');
            } else {
                setErrorMessage('An error occurred during registration');
            }
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold rounded-lg p-2 w-full hover:bg-blue-600 transition duration-300"
                >
                    Register
                </button>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
