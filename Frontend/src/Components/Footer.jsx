import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div  className='bg-slate-950 p-10'>
            <div className='max-w-[1400px] mx-auto px-5 '>
                <div className='grid grid-cols-2 gap-25 '>
                    <div className='flex flex-col gap-2 items-left'>
                        <h1 className='text-white text-2xl font-bold'>PrepWise <span className='text-purple-400'>AI</span></h1>
                        <p className='text-slate-400 text-lg  leading-relaxed'>AI-powered interview preparation platform that helps you generate personalized questions, practice smarter, and prepare with confidence.</p>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1 className='text-white font-bold  text-2xl'>Quick Links</h1>
                        <ul className='text-slate-400 text-lg flex gap-5  '>
                            <li className='hover:text-purple-400 cursor-pointer transition'><a href='#home'>Home</a></li>
                            <li className='hover:text-purple-400 cursor-pointer transition'><a href='#features'>Features</a></li>
                            <li className='hover:text-purple-400 cursor-pointer transition'><a href='#howitworks'>How it works</a></li>
                            <li className='hover:text-purple-400 cursor-pointer transition'><Link to='/login'>Login</Link></li>
                            <li className='hover:text-purple-400 cursor-pointer transition'><Link to='/'>Get Started</Link></li>
                        </ul>

                    </div>
                </div>
                <div className=' flex flex-col gap-2  justify-center items-center  pt-10 border-t border-slate-800 mt-10'>
                    <h1 className=' text-slate-500'>Illustrations by Storyset</h1>
                    <p className=' text-slate-500'>© 2026 PrepWise AI. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
