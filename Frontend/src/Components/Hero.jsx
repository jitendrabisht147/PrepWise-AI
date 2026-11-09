import React from 'react'
import img3 from '../assets/img3.png'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

const Hero = () => {
  return (
    <div id='home' className='scroll-mt-20 md:min-h-screen'>

      <div className='max-w-[1400px] mx-auto px-5 pt-[110px] pb-20 md:pt-[140px] md:pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-center'>
        <div className='flex flex-col gap-5'>
          <span className="w-fit bg-purple-100 text-purple-700 px-8 py-1 rounded-md">
            AI-Powered Interview Preparation
          </span>

          <h1 className='text-5xl/15 font-bold text-slate-800'>
            Ace your next interview <br className='hidden lg:block' />with{' '}
            <span className='bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent'>PrepWise-AI</span>
          </h1>

          <p className='text-lg text-slate-500 font-semibold'>
            Generic interview questions won't get you hired. PrepWise-AI dynamically adapts to your exact role—delivering realistic coding scenarios, system design challenges, and behavioral prompts tailored specifically to your tech stack and seniority level.
          </p>

          <div className='flex flex-wrap gap-4 sm:gap-10 mt-6 md:mt-10'>
            <Link
              to='/register'
              className="overflow-hidden group flex justify-center items-center w-38 bg-zinc-800 text-white py-3 rounded-md font-bold cursor-pointer"
            >
              <span className="flex items-center transition-transform duration-300">
                Get Started
                <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-6 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 flex items-center">
                  <FaLongArrowAltRight />
                </span>
              </span>
            </Link>

            <a
              href='https://play.google.com/store/apps'
              className='flex items-center gap-2 justify-center border-2 border-slate-600 w-fit px-6 py-2 rounded-md bg-white text-slate-700 hover:text-purple-700 hover:scale-102 hover:border-purple-700 transition-all duration-200 font-semibold cursor-pointer'
            >
              Download App <BiLogoPlayStore className='text-xl' />
            </a>
          </div>
        </div>

        {/* Hidden on mobile, shown from md (768px) up */}
        <div className='hidden md:flex md:ml-10 lg:ml-20 justify-center'>
          <img
            className='rounded-lg h-120 max-w-full object-contain'
            src={img3}
            alt='PrepWise-AI interview practice'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero