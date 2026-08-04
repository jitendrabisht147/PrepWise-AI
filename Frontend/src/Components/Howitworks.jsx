import React from 'react'


const Howitworks = () => {
    return (
        <div id='howitworks' className='scroll-mt-15  pb-15'>
            <div className='max-w-[1400px] mx-auto px-5 flex flex-col gap-y-20'>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='mt-15 text-4xl font-bold text-slate-900 '>How PrepWise AI Works</h1>
                    <p className='text-lg text-slate-600'>Follow a simple flow to create personalized interview practice sessions in minutes.</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 '>
                    {steps.map((data, index) => {
                        return (
                            <div key={data.id} className=' flex flex-col gap-y-5 items-center p-5  '>
                                <div className='relative flex items-center'>
                                    <span className='w-fit text-4xl font-bold bg-purple-600 text-white shadow-md rounded-full p-2'>
                                        {data.number}
                                    </span>
                                    {index !== steps.length - 1 && (
                                        <div className="hidden lg:block absolute  left-17 w-68 h-[2px] bg-purple-200"></div>
                                    )}
                                </div>
                                <h1 className='text-slate-900 text-xl font-bold'>{data.title}</h1>
                                <p className=' text-slate-600  text-center'>{data.para}</p>
                            </div>

                        )
                    })}
                </div>

            </div>
        </div>
    )
}
const steps = [
    {
        id: 1,
        number: '01',
        title: 'Create Account',
        para: 'Sign up or log in to access your personal dashboard.'
    },
    {
        id: 2,
        number: '02',
        title: ' Add Interview Details',
        para: 'Enter your role, experience level, topics, difficulty, and number of questions.'
    },
    {
        id: 3,
        number: '03',
        title: 'Generate Questions',
        para: 'AI creates personalized interview questions based on your inputs.'
    },
    {
        id: 4,
        number: '04',
        title: 'Practice & Improve',
        para: 'Review questions, understand answers, save sessions, and prepare confidently.'
    },

]

export default Howitworks
