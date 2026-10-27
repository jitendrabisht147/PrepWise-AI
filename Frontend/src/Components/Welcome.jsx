import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const Welcome = ({ user }) => {
  const firstName = user?.name?.trim().split(" ")[0] || "Candidate";

  return (
    <div className="mx-4 sm:mx-6 mt-28 rounded-3xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 p-8 sm:p-10 shadow-xl text-white relative overflow-hidden">
      {/* Background Decorative Blur Bubbles */}
      <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-60 h-60 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        {/* Left Welcome Content */}
        <div className="max-w-2xl">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-100 mb-4">
            <HiOutlineSparkles className="text-amber-300 text-sm" />
            <span>AI Powered Interview Prep</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {getGreeting()}, {firstName}
          </h1>

          <p className="text-purple-100 mt-3 text-sm sm:text-base leading-relaxed">
            Practice AI-powered mock interviews, improve your confidence, and
            prepare for your dream job with personalized interview questions and
            instant feedback.
          </p>

          <Link
            to="/startinterview"
            className="inline-flex items-center gap-2.5 mt-6 bg-white text-purple-700 hover:bg-purple-50 px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-purple-900/20 transition-all duration-200 group cursor-pointer"
          >
            <span>Start Interview</span>
            <FaArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right Glass Card Feature */}
        <div className="hidden lg:flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center w-64 shadow-lg">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl text-amber-300">
              ⚡
            </div>

            <h3 className="text-white font-bold text-lg">AI Mock Interview</h3>

            <p className="text-purple-100 mt-2 text-xs leading-relaxed">
              Generate interview questions, receive real-time feedback, and
              track your progress in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;