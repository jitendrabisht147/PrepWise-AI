import React from 'react'
import { useState } from 'react'
import register from '../assets/Mobile login-amico.png'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {  
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');
                       
    const handleChange = (e) => {   
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {         
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(
                "https://prepwise-ai-backend-0ttv.onrender.com/register",
                formData
            );

            setSuccess(response.data.message);

            if (response.data.success) {
                navigate('/verify-otp', {
                    state: {
                        email: formData.email
                    }
                });
            }


        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);

            setError(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    };

    return (
        <div className='bg-gradient-to-br from-slate-100 to-purple-100 pb-15 '>
            <div className='max-w-[1400px] mx-auto px-5 pt-10 flex flex-col items-center gap-10 '>
                <h1 className='text-4xl text-slate-900 font-bold'>PrepWise <span className='text-purple-600'>AI</span></h1>

                <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl '>
                    {/* grid 1 */}
                    <div className='bg-white shadow-2xl border-l border-t border-b  border-slate-300  rounded-tl-2xl rounded-bl-2xl  hidden md:block h-[550px]'>
                        <img src={register} className='rounded-tl-2xl h-full w-full object-cover  shadow-2xl rounded-bl-2xl' />
                    </div>
                    {/* grid 2 */}
                    <div className=' shadow-2xl border-r border-t border-b border-slate-300 rounded-tr-2xl rounded-br-2xl  flex flex-col  bg-white gap-y-4 px-8'>
                        <div className='text-center'>
                            <h1 className='text-3xl mt-5 font-bold text-slate-900'>Create Your Account</h1>
                            <p className='border-slate-200 text-slate-600'>Start your AI-powered interview preparation journey.</p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className='flex flex-col  w-full gap-y-2 '>
                            <label className='text-slate-700'>Fullname</label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Full Name'
                                className='border border-slate-300 py-2 px-2 outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-sm'
                            />
                            <label className='text-slate-700'>Email</label>
                            <input
                                type='text'
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email'
                                className='border border-slate-300 py-2 px-2 outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-sm'
                            />
                            <label className='text-slate-700'>Password</label>
                            <input
                                type='text'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Password'
                                className='border border-slate-300 py-2 px-2 outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-sm'
                            />
                            <label className='text-slate-700'>Confirm Password</label>
                            <input
                                type='text'
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm Password'
                                className='border border-slate-300 py-2 px-2 outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-sm'
                            />
                            {
                                error && (
                                    <p className='text-red-500 text-sm mt-2'>
                                        {error}
                                    </p>
                                )
                            }
                            {
                                success && (
                                    <p className='text-green-600 text-sm mt-2'>
                                        {success}
                                    </p>
                                )
                            }
                            <button type='submit' className='mt-5 py-2 bg-purple-600 text-white hover:bg-purple-700 shadow-md rounded-lg font-semibold'>
                                Create Account
                            </button>
                        </form>

                        <p className='text-slate-600 '>Already have an account? <Link to='/login' className='text-purple-600 hover:text-purple-700 font-medium cursor-pointer'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
