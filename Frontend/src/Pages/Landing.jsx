import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Features from '../Components/Features'
import Howitworks from '../Components/Howitworks'
import Footer from '../Components/Footer'

const Landing = () => {
  return (
    <div>
      {/* Navbar is fixed, so it floats over the gradient and looks like part of the Hero */}
      <Navbar />

      {/* No fixed height: the gradient grows with the content on mobile */}
      <div className='relative bg-gradient-to-br from-slate-300 via-white to-purple-300'>
        <Hero />

        {/* Soft fade so the gradient blends into Features instead of ending in a hard line */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white'
        />
      </div>

      <Features />
      <Howitworks />
      <Footer />
    </div>
  )
}

export default Landing