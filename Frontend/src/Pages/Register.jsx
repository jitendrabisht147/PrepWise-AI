import React, { useState } from 'react';
import register from '../assets/Mobile login-amico.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {  
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');                                         
                        
    const handleChange = (e) => {   
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {         
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "https://prepwise-ai-backend-0ttv.onrender.com/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
            ); 
                
            setSuccess(response.data.message);

            if (response.data.success) {
                setTimeout(() => {
                    navigate('/verify-otp', {
                        state: {
                            email: formData.email
                        }
                    });
                }, 800);
            }

        } catch (error) {
            console.error("Register Error:", error);
            setError(
                error.response?.data?.message || 'Something went wrong'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-gradient-to-br from-slate-100 to-purple-100 pb-15 min-h-screen'>
            <div className='max-w-[1400px] mx-auto px-5 pt-10 flex flex-col items-center gap-10 '>
                <h1 className='text-4xl text-slate-900 font-bold'>PrepWise <span className='text-purple-600'>AI</span></h1>

                <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl '>
                    {/* Visual Graphic */}
                    <div className='bg-white shadow-2xl border-l border-t border-b border-slate-300 rounded-tl-2xl rounded-bl-2xl hidden md:block h-[580px]'>
                        <img src={register} alt="Register Graphic" className='rounded-tl-2xl h-full w-full object-cover shadow-2xl rounded-bl-2xl' />
                    </div>

                    {/* Registration Form */}
                    <div className='shadow-2xl border-r border-t border-b border-slate-300 rounded-tr-2xl rounded-br-2xl flex flex-col justify-center bg-white gap-y-4 px-8 py-8'>
                        <div className='text-center'>
                            <h1 className='text-3xl font-bold text-slate-900'>Create Your Account</h1>
                            <p className='border-slate-200 text-slate-600 mt-1'>Start your AI-powered interview preparation journey.</p>
                        </div>

                        <form onSubmit={handleSubmit} className='flex flex-col w-full gap-y-2.5'>
                            <label className='text-slate-700 text-sm font-medium'>Full Name</label>
                            <input
                                type='text'
                                name='name'
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Full Name'
                                className='border border-slate-300 py-2 px-3 outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-md text-sm'
                            />

                            <label className='text-slate-700 text-sm font-medium'>Email</label>
                            <input
                                type='email'
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email'
                                className='border border-slate-300 py-2 px-3 outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-md text-sm'
                            />

                            <label className='text-slate-700 text-sm font-medium'>Password</label>
                            <input
                                type='password'
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Password'
                                className='border border-slate-300 py-2 px-3 outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-md text-sm'
                            />

                            <label className='text-slate-700 text-sm font-medium'>Confirm Password</label>
                            <input
                                type='password'
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm Password'
                                className='border border-slate-300 py-2 px-3 outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-md text-sm'
                            />

                            {error && (
                                <p className='text-red-500 text-sm mt-1 bg-red-50 p-2 rounded border border-red-200'>
                                    {error}
                                </p>
                            )}
                            {success && (
                                <p className='text-emerald-600 text-sm mt-1 bg-emerald-50 p-2 rounded border border-emerald-200'>
                                    {success}
                                </p>
                            )}

                            <button 
                                type='submit' 
                                disabled={loading}
                                className='mt-3 py-2.5 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60 shadow-md rounded-lg font-semibold transition-colors'
                            >
                                {loading ? 'Sending Verification Code...' : 'Create Account'}
                            </button>
                        </form>

                        <p className='text-slate-600 text-sm text-center'>
                            Already have an account? <Link to='/login' className='text-purple-600 hover:text-purple-700 font-semibold cursor-pointer'>Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;