import React from 'react'
import { FaRobot } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

const Features = () => {
    return (
        <div id='features' className=' scroll-mt-15 max-w-[1400px] mx-auto px-5'>
            <div className='flex flex-col gap-y-20'>
                <div className='flex flex-col items-center gap-5 '>
                    <h1 className='text-4xl font-bold text-slate-900 mt-15 '>Everything You Need to Prepare Smarter</h1>
                    <p className='text-lg text-slate-600'>PrepWise AI helps you create personalized interview practice sessions based on your role, skills, and experience.</p>
                </div>

                
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
                        {features.map((item) =>{
                          return(
                            <div key={item.id} className='flex flex-col items-left border border-slate-200 hover:border-purple-300 shadow-md  hover:shadow-xl gap-y-5 p-5  rounded-xl'>
                                <span className='text-2xl w-fit text-purple-600 bg-purple-100 p-2 rounded-sm'>{item.icon}</span>
                                <h1 className='text-xl font-bold text-slate-900'>{item.title}</h1>
                                <p className='text-slate-600'>{item.description}</p>
                            </div>

                          )
                        })}
                    </div>
                
            </div>
        </div>
    )
}
const features = [
    {
        id: 1,
        icon: <FaRobot />,
        title: 'AI Question Generation',
        description: "Generate personalized interview questions instantly.",
    },
    {
        id: 2,
        icon: <FaSlidersH />,
        title: 'Custom Practice Sessions',
        description: "Choose role, difficulty, topics, and number of questions.",
    },
    {
        id: 3,
        icon: <FaBookmark />,
        title: 'Save Your Sessions',
        description: "Save generated interview sessions and revisit them anytime.",
    },
    {
        id: 4,
        icon: <FaLightbulb />,
        title: 'Smart Answer Guidance',
        description: "Get clear explanations and improve your interview responses.",
    }
]

export default Features
