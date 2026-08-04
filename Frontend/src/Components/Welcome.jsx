import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Welcome = ({ user }) => {
    return (
        <div className="mx-4 mt-24 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-10 shadow-lg">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-blue-100 text-lg">
                        Welcome Back 
                    </p>

                    <h1 className="text-4xl font-bold text-white mt-2">
                        {user?.name}
                    </h1>

                    <p className="text-blue-100 mt-4 text-lg max-w-2xl leading-8">
                        Practice AI-powered mock interviews, improve your
                        confidence, and prepare for your dream job with
                        personalized interview questions and instant feedback.
                    </p>

                    <Link
                        to="/startinterview"
                        className="inline-flex items-center gap-3 mt-8 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
                    >
                        Start Interview
                        <FaArrowRight />
                    </Link>

                </div>

                <div className="hidden lg:flex flex-col items-center">

                    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 text-center w-64">

                        <h2 className="text-white text-5xl font-bold">
                            
                        </h2>

                        <p className="text-white font-semibold mt-5">
                            AI Mock Interview
                        </p>

                        <p className="text-blue-100 mt-3 text-sm leading-6">
                            Generate interview questions, receive AI feedback,
                            and track your progress in one place.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Welcome;