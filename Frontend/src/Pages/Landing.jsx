import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Features from '../Components/Features'
import Howitworks from '../Components/Howitworks'
import Footer from '../Components/Footer'

const Landing = () => {
  return (
    <div>
      <div className='bg-gradient-to-br from-slate-300 via-white to-purple-300 h-screen '>
        <Navbar/>
        <Hero/>
      </div>
      <Features/>
      <Howitworks/>
      <Footer/>
    </div>
  )
}

export default Landing
