import React, { useState } from 'react'
import img7 from '../assets/img7.jpg'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MockInterview = () => {

  const location = useLocation();
  const jobTitle = location.state?.jobTitle || '';
  console.log("MockInterview Job Title:", jobTitle);
  const questions = location.state?.questions || [];
  const [question, setQuestion] = useState(1)
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const progress = (question / questions.length) * 100;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Mock Interview
          </h1>
          <p className="text-gray-500 mt-2">
            Answer the AI-generated interview questions carefully.
          </p>
        </div>

        {/* Progress */}

        <div className="bg-white rounded-2xl shadow border border-gray-200 px-5 py-3 w-full ">

          <div className="flex justify-between items-center mb-2">

            <div>

              <p className="text-sm text-gray-500">
                Question {question} of {questions.length}
              </p>
            </div>

            <span className="font-bold text-blue-600">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
            ></div>

          </div>

        </div>


      

        {/* Main Layout */}
        <div className="grid lg:grid-cols-5 mt-10 gap-8">

          {/* Left Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center">

            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">

              <img
                src={img7}
                alt="Interviewer"
                className="w-full h-full object-cover"
              />

            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              Harry
            </h2>

            <p className="text-blue-600 font-medium">
              AI Interviewer
            </p>

            <div className="mt-6 px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
              Question {question}
            </div>

            <div className="w-full bg-gray-200 rounded-xl p-6 mt-8">

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Interview Question
              </h3>

              <p className="text-gray-700 text-lg leading-8">
                {questions[question - 1]}
              </p>

            </div>

          </div>

          {/* Right Card */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Answer
            </h2>

            <textarea
              value={answers[question - 1]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[question - 1] = e.target.value;
                setAnswers(newAnswers);
              }}
              placeholder="Type your answer here..."
              className="w-full h-72 border border-gray-300 rounded-xl p-5 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setQuestion(question > 1 ? question - 1 : 1);
                }}
                className="flex-1 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer"
              >
                Previous
              </button>

              {question === questions.length ? (
                <button
                  onClick={() => {
                    navigate("/result", {
                      state: {
                        questions,
                        answers,
                        jobTitle,
                      },
                    });
                  }}
                  className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition cursor-pointer"
                >
                  Submit Interview
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuestion(
                      question < questions.length ? question + 1 : question
                    );
                  }}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition cursor-pointer"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default MockInterview
