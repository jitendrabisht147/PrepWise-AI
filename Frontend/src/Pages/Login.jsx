import React, { useState } from 'react';
import loginImg from '../assets/login 2.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://prepwise-ai-backend-0ttv.onrender.com/login',
        loginData
      );
      localStorage.setItem('token', response.data.token);

      setSuccess(response.data.message || 'Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-slate-50 to-indigo-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Branding */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          PrepWise <span className="text-purple-600">AI</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
          Practice smarter. Get hired faster.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-100">
        
        {/* Left Side: Illustration / Image */}
        <div className="hidden md:relative md:flex flex-col justify-between bg-purple-900 p-8 text-white">
          <img
            src={loginImg}
            alt="PrepWise AI Login"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
          <div className="relative z-10 my-auto text-center px-4">
            <h2 className="text-2xl font-bold text-white mb-2">
              Accelerate Your Career
            </h2>
            <p className="text-purple-200 text-sm">
              Prepare with AI-driven interview feedback tailored just for you.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={loginData.email}
                onChange={handleChange}
                placeholder="yourname@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                required
                value={loginData.password}
                onChange={handleChange}
                placeholder="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
              />
            </div>

            {/* Status Messages */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm text-center">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-xl shadow-lg shadow-purple-200 transition duration-200 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Registration Redirect */}
          <p className="text-center text-sm text-slate-600 mt-8">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;