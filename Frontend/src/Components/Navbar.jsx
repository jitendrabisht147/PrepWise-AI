import React from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <section  className='h-20 z-10 bg-white shadow-xl flex items-center  fixed top-0 w-full '>
        <div className='flex justify-between w-full  max-w-[1400px] mx-auto px-5 '>
          <h1 className='text-2xl font-bold text-purple-600 cursor-pointer'>PrepWise-AI</h1>
          <ul className='flex gap-30 items-center text-lg font-bold '>
            <li className='text-slate-700 hover:text-purple-600 cursor-pointer '><a href='#home'>Home</a></li>
            <li className='text-slate-700 hover:text-purple-600 cursor-pointer '><a href='#features'>Features</a></li>
            <li className='text-slate-700 hover:text-purple-600 cursor-pointer'><a href='#howitworks'>How it works</a></li>
          </ul>
          <Link to='/login' className='text-lg font-bold border-purple-600 text-purple-600 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer px-10 py-1 rounded-md'>
            Login
          </Link>
          <RxHamburgerMenu className='lg:hidden' /> 
        </div>
        
    </section>
  )
}

export default Navbar
