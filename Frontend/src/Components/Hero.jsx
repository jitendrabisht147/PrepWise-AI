import React, { useState, useEffect } from 'react'
import img3 from '../assets/img3.png'
import { Link } from 'react-router-dom'
import {
  FaLongArrowAltRight,
  FaTimes,
  FaRobot,
  FaBookOpen,
  FaChartLine,
  FaHistory,
  FaTrophy,
  FaAdjust,
} from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

const steps = [
  {
    title: 'Create your account',
    desc: 'Register and log in to get your own personal dashboard.',
  },
  {
    title: 'Set up your mock interview',
    desc: 'Enter the job role you are preparing for, choose your experience level, difficulty, skills and technologies, and how many questions you want.',
  },
  {
    title: 'Answer the AI interviewer',
    desc: 'Questions are generated for your exact role and asked one by one. Move between questions and answer in your own words.',
  },
  {
    title: 'Get your result and feedback',
    desc: 'Your answers are evaluated by AI. You get a score out of 100, detailed feedback, your strengths and the areas to improve.',
  },
  {
    title: 'Track your progress',
    desc: 'Every interview is saved in your history so you can revisit it and see how you improve over time.',
  },
]

const features = [
  {
    icon: <FaRobot />,
    title: 'AI Mock Interviews',
    desc: 'Full mock interviews with an AI interviewer, built around your role, level and tech stack.',
  },
  {
    icon: <FaBookOpen />,
    title: 'Practice Questions',
    desc: 'Pick a skill (React, JavaScript, HTML, CSS, Node.js, MongoDB), a difficulty and a count, and practice at your own pace. Nothing is scored.',
  },
  {
    icon: <FaChartLine />,
    title: 'Instant AI Feedback',
    desc: 'Overall score, strengths, areas to improve and a review of each of your answers.',
  },
  {
    icon: <FaHistory />,
    title: 'Interview History',
    desc: 'Search past interviews by job role and reopen the full details any time.',
  },
  {
    icon: <FaTrophy />,
    title: 'Results Dashboard',
    desc: 'See your total interviews, average score, questions practiced and highest score in one place.',
  },
  {
    icon: <FaAdjust />,
    title: 'Light & Dark Mode',
    desc: 'Switch themes anytime so practice stays comfortable on your eyes.',
  },
]

const interviewTypes = ['Coding scenarios', 'System design', 'Behavioral', 'Technical concepts']
const levels = ['Fresher (0-1 yrs)', 'Junior (1-3 yrs)', 'Mid-level (3-5 yrs)', 'Senior (5+ yrs)']

const Hero = () => {
  const [showAbout, setShowAbout] = useState(false)

  // Close on Esc + lock background scroll while popup is open
  useEffect(() => {
    if (!showAbout) return
    const onKey = (e) => e.key === 'Escape' && setShowAbout(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [showAbout])

  return (
    <>
      <div id='home' className='scroll-mt-20 md:min-h-screen'>

        <div className='max-w-[1400px] mx-auto px-5 pt-[110px] pb-20 md:pt-[140px] md:pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-center'>
          <div className='flex flex-col text-center md:text-left gap-5'>
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

            <div className='flex justify-center md:justify-start flex-wrap gap-4 sm:gap-10 mt-6 md:mt-10'>
              <Link
                to='/register'
                className="overflow-hidden group flex justify-center items-center w-38 bg-slate-800 text-white py-3 rounded-md font-bold cursor-pointer"
              >
                <span className="flex items-center transition-transform duration-300">
                  Get Started
                  <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-6 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 flex items-center">
                    <FaLongArrowAltRight />
                  </span>
                </span>
              </Link>

             

              {/* NEW: Learn More button (same style as Download App) */}
              <button
                onClick={() => setShowAbout(true)}
                className='flex items-center gap-2 justify-center border-2 border-slate-600 w-fit px-6 py-2 rounded-md bg-white text-slate-700 hover:text-purple-700 hover:scale-102 hover:border-purple-700 transition-all duration-200 font-semibold cursor-pointer'
              >
                Learn More
              </button>
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

      {/* NEW: About popup */}
      {showAbout && (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm'
          onClick={() => setShowAbout(false)}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='about-title'
            className='relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAbout(false)}
              aria-label='Close'
              className='absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:text-purple-700 hover:bg-purple-100 transition cursor-pointer'
            >
              <FaTimes />
            </button>

            <span className='w-fit bg-purple-100 text-purple-700 px-6 py-1 rounded-md text-sm'>
              About the platform
            </span>

            <h2 id='about-title' className='mt-4 text-3xl font-bold text-slate-800'>
              What is{' '}
              <span className='bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent'>
                PrepWise-AI
              </span>
              ?
            </h2>

            <p className='mt-3 text-slate-500 font-semibold'>
              PrepWise-AI is an AI-powered interview preparation platform. Instead of giving everyone the same generic question list, it generates questions for the exact role you are preparing for, evaluates your answers, and tells you how to improve. It is completely free to use, and built for candidates of every level.
            </p>

            {/* How it works */}
            <h3 className='mt-8 text-xl font-bold text-slate-800'>How it works</h3>
            <div className='mt-4 flex flex-col gap-3'>
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className='flex gap-4 p-4 rounded-xl border border-purple-100 bg-purple-50/50'
                >
                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold'>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className='font-bold text-slate-800'>{s.title}</h4>
                    <p className='mt-1 text-sm text-slate-500 font-semibold'>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <h3 className='mt-8 text-xl font-bold text-slate-800'>What you get</h3>
            <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {features.map((f) => (
                <div
                  key={f.title}
                  className='p-4 rounded-xl border border-purple-100 bg-white shadow-sm'
                >
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-700'>
                    {f.icon}
                  </div>
                  <h4 className='mt-3 font-bold text-slate-800'>{f.title}</h4>
                  <p className='mt-1 text-sm text-slate-500 font-semibold'>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Interview types + levels */}
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <h3 className='text-xl font-bold text-slate-800'>Interview types</h3>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {interviewTypes.map((t) => (
                    <span key={t} className='bg-purple-100 text-purple-700 px-4 py-1 rounded-md text-sm'>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className='text-xl font-bold text-slate-800'>Made for every level</h3>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {levels.map((l) => (
                    <span key={l} className='bg-purple-100 text-purple-700 px-4 py-1 rounded-md text-sm'>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Powered by + free */}
            <div className='mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white'>
              <p className='font-bold'>Powered by Groq AI</p>
              <p className='mt-1 text-sm'>
                Groq AI generates your questions, evaluates your answers, and writes your feedback and improvement tips. PrepWise-AI is free to use.
              </p>
            </div>

            <div className='mt-8 flex flex-wrap gap-4'>
              <Link
                to='/register'
                className='flex justify-center items-center w-38 bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-3 rounded-md font-bold cursor-pointer'
              >
                Get Started
              </Link>
              <button
                onClick={() => setShowAbout(false)}
                className='border-2 border-slate-600 px-6 py-2 rounded-md bg-white text-slate-700 hover:text-purple-700 hover:border-purple-700 transition-all duration-200 font-semibold cursor-pointer'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Hero