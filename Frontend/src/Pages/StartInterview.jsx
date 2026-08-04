import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StartInterview = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: '',
    experience: 'Fresher',
    skill: 'React',
    difficulty: 'Easy',
    numberOfQuestions: '5'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  console.log(formData);

  const handleStartInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://prepwise-ai-backend-0ttv.onrender.com/generate-questions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      const questionsArray = response.data.questions
        .split('\n')
        .filter(q => q.trim() !== '');
      console.log("Form Data:", formData);
      console.log("Job Title Before Navigate:", formData.jobTitle);

      navigate('/mockinterview', {
        state: {
          questions: questionsArray,
          jobTitle: formData.jobTitle
        }
      });



    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bg-slate-100 min-h-screen py-10">

      <div className="max-w-4xl mx-auto">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-slate-900">
            Start Mock Interview
          </h1>

          <p className="text-slate-500 text-lg mt-3">
            Configure your interview and let AI generate personalized questions.
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200  p-10 m-10">

          <div className="space-y-7">

            {/* Job Title */}

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                 Job Title
              </label>

              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Experience */}

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
              Experience Level
              </label>

              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              >
                <option>Fresher</option>
                <option>1-3 Years</option>
                <option>3-5 Years</option>
                <option>Or More</option>
              </select>
            </div>

            {/* Skills */}

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                 Skills / Topics
              </label>

              <input
                type="text"
                name="skill"
                
                onChange={handleChange}
                placeholder="React, JavaScript, Node.js, MongoDB"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Difficulty */}

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
               Difficulty Level
              </label>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            {/* Questions */}

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                 Number of Questions
              </label>

              <select
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              >
                
                <option>2</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>8</option>

                <option>10</option>
              </select>
            </div>

            <button
              onClick={handleStartInterview}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
               Start Interview
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StartInterview
