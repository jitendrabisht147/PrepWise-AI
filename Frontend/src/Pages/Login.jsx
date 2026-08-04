import React, { useState } from 'react'
import login from '../assets/login 2.png'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('')

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        loginData
      )
      localStorage.setItem('token', response.data.token);

      setSuccess(response.data.message);
      navigate('/dashboard');


    } catch (error) {
      setError(
        error.response?.data?.message || 'something went wrong'
      );
    }


  }
  return (
    <div>
      <div className=' bg-gradient-to-br from-white via-violet-50 to-purple-100'>
        <h1 className='text-4xl text-center  text-slate-900 font-bold'>PrepWise <span className='text-purple-600'>AI</span></h1>
        <p className="text-slate-500 text-center text-xl mt-2">
          Practice smarter. Get hired faster.
        </p>
        <div className="max-w-7xl mx-auto px-5 min-h-[calc(100vh-81px)] flex items-center justify-center">


          <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl'>
            {/* grid 1 */}
            <div className=" bg-white shadow-2xl border-l border-t border-b  border-slate-300  rounded-tl-2xl rounded-bl-2xl  hidden md:block h-[550px]">
              <img 
                src={login}
                className=" h-full object-cover rounded-l-2xl shadow-2xl"
                alt="Login"
              />
            </div>
            {/* grid 2 */}
            <div className="bg-white shadow-2xl border-r border-t border-b border-slate-300 rounded-2xl md:rounded-l-none md:rounded-r-2xl p-8 flex flex-col justify-center items-evenly min-h-[550px]">
              <div className='text-center '>
                <h1 className='text-3xl font-bold text-slate-900'>Welcome Back</h1>
                <p className='border-slate-200 py-2 text-slate-600'>Continue your AI interview preparation.</p>
              </div>

              <form onSubmit={handleSubmit} className='flex flex-col  w-full gap-y-2 '>

                <label className='text-slate-700'>Email</label>
                <input
                  type='text'
                  name='email'
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder='Email'
                  className='border border-slate-300 px-4 py-3 rounded-lg outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ' />

                <label className='text-slate-700'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder='Password'
                  className='border border-slate-300 px-4 py-3 rounded-lg outline-none placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ' />

                {
                  error && (
                    <p className="text-red-500 text-center">
                      {error}
                    </p>
                  )
                }
                {
                  success && (
                    <p className="text-green-500 text-center">
                      {success}
                    </p>
                  )
                }

                <button type='submit' className="mt-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition duration-300">
                  Login
                </button>
              </form>

              <p className="text-center mt-5">
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
                >
                  Forgot Password?
                </a>
              </p>
              <p className='text-slate-600 text-center mt-5'>Don't have an account? <Link to='/register' className='text-purple-600 hover:text-purple-700 font-medium cursor-pointer'>Register</Link></p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  )
}

export default Login
