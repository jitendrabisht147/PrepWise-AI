import React from 'react'
import img3 from '../assets/img3.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div id='home' className='scroll-mt-20 bg-gradient-to-br from-slate-50 via-white to-purple-100 mt-20 min-h-[calc(100vh-81px)]'>

      <div className='max-w-[1400px] mx-auto  px-5 pt-35  grid grid-cols-1 md:grid-cols-2 gap-25'>
        <div className='flex flex-col gap-3'>
          <span className=" w-fit bg-purple-100 text-purple-700 px-8 py-1 rounded-md">
            AI-Powered Interview Preparation
          </span>

          <h1 className='text-4xl font-bold  text-slate-900 '>Ace your next interview With <br/>PrepWise-AI</h1>

          <p className='text-lg text-slate-600'>Generate role-based interview questions, practice smart answers, and build confidence with AI-powered preparation.</p>

          <Link to='/register' className=" w-fit bg-purple-600 text-white px-6 py-2 rounded-md font-bold hover:bg-purple-700 transition cursor-pointer ">Get Started</Link>

          <p className='text-slate-500'>Practice for frontend, backend, and full-stack interviews.</p>
        </div>

        <div className=''>
          <img className='rounded-lg h-110 object-contain' src={img3} />
        </div>
      </div>
    </div>
  )
}

export default Hero
