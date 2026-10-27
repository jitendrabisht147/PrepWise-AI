import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../Components/ThemeContext';
import {
  FaArrowLeft,
  FaBriefcase,
  FaCode,
  FaExclamationCircle,
  FaMicrophone,
  FaClock,
} from 'react-icons/fa';
import { RiSparklingFill } from 'react-icons/ri';
import { IoMoon } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';

const EXPERIENCE = [
  { value: 'Fresher', label: 'Fresher', hint: '0-1 yrs' },
  { value: '1-3 Years', label: 'Junior', hint: '1-3 yrs' },
  { value: '3-5 Years', label: 'Mid-level', hint: '3-5 yrs' },
  { value: '5+ Years', label: 'Senior', hint: '5+ yrs' },
];

const DIFFICULTY = [
  { value: 'Easy', hint: 'Core concepts' },
  { value: 'Medium', hint: 'Real-world use' },
  { value: 'Hard', hint: 'Deep dives' },
];

const QUESTION_COUNTS = ['3', '5', '8', '10'];

const MINUTES_PER_QUESTION = 3;

/* Reusable segmented control (radio group) */
const Segmented = ({ label, options, value, onChange, darkMode, columns }) => (
  <div role="radiogroup" aria-label={label}>
    <p className="text-sm font-semibold mb-2.5">{label}</p>
    <div className={`grid gap-2 ${columns}`}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={`text-left rounded-xl border px-3.5 py-2.5 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
              darkMode ? 'focus-visible:ring-offset-slate-900' : 'focus-visible:ring-offset-white'
            } ${
              selected
                ? 'border-purple-600 bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                : darkMode
                ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
                : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
            }`}
          >
            <span className="block text-sm font-semibold leading-tight">
              {opt.label || opt.value}
            </span>
            {opt.hint && (
              <span
                className={`block text-xs mt-0.5 ${
                  selected ? 'text-purple-100' : darkMode ? 'text-slate-500' : 'text-slate-500'
                }`}
              >
                {opt.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

const StartInterview = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    jobTitle: '',
    experience: 'Fresher',
    skill: 'React, JavaScript, Tailwind CSS',
    difficulty: 'Medium',
    numberOfQuestions: '5',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleChange = (e) => setField(e.target.name, e.target.value);

  const handleStartInterview = async (e) => {
    e.preventDefault();
    if (!formData.jobTitle.trim()) {
      setError('Please specify a target Job Title.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      const response = await axios.post(
        'https://prepwise-ai-backend-0ttv.onrender.com/generate-questions',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let questionsArray = [];
      if (Array.isArray(response.data.questions)) {
        questionsArray = response.data.questions;
      } else if (typeof response.data.questions === 'string') {
        questionsArray = response.data.questions
          .split('\n')
          .map((q) => q.replace(/^\d+[\.\)]\s*/, '').trim())
          .filter((q) => q.length > 0);
      }

      if (!questionsArray || questionsArray.length === 0) {
        throw new Error('AI could not generate questions. Please try again.');
      }

      navigate('/mockinterview', {
        state: {
          questions: questionsArray,
          jobTitle: formData.jobTitle,
          difficulty: formData.difficulty,
          experience: formData.experience,
        },
      });
    } catch (err) {
      console.error('Error initiating interview:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to generate interview questions. Please verify your connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  const skills = formData.skill
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const experienceLabel =
    EXPERIENCE.find((o) => o.value === formData.experience)?.label || formData.experience;
  const totalMinutes = Number(formData.numberOfQuestions) * MINUTES_PER_QUESTION;

  const inputWrap = `flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
    darkMode
      ? 'bg-slate-950 border-slate-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30 text-white'
      : 'bg-white border-slate-300 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/20 text-slate-900'
  }`;

  return (
    <div
      className={`h-screen overflow-hidden flex flex-col font-sans transition-colors duration-200 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Header */}
      <header
        className={`h-16 shrink-0 border-b ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                P
              </div>
              <span className="text-xl font-bold tracking-tight">
                PrepWise <span className="text-purple-600 dark:text-purple-400">AI</span>
              </span>
            </Link>

            <span className={`h-5 w-px ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />

            <button
              onClick={() => navigate('/dashboard')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
                darkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FaArrowLeft className="text-xs" />
              <span>Dashboard</span>
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border text-base transition cursor-pointer ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-purple-600 hover:bg-slate-100'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <MdSunny /> : <IoMoon />}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left: live interview summary */}
          <aside className="lg:col-span-2 lg:sticky lg:top-8 self-start">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Set up your mock interview
            </h1>
            <p
              className={`mt-3 text-base leading-relaxed max-w-md ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Choose the role and level you are preparing for. The AI writes questions to match,
              and you answer them out loud.
            </p>

            {/* Live summary card */}
            <div
              className={`mt-7 rounded-2xl border overflow-hidden ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="bg-purple-600 text-white px-5 py-4">
                <p className="text-sm text-purple-200">Your interview</p>
                <p
                  className={`mt-0.5 text-xl font-bold leading-snug break-words ${
                    formData.jobTitle.trim() ? '' : 'text-purple-200/80'
                  }`}
                >
                  {formData.jobTitle.trim() || 'Target role not set yet'}
                </p>
              </div>

              <dl className="px-5 py-4 text-sm">
                {[
                  ['Level', experienceLabel],
                  ['Difficulty', formData.difficulty],
                  ['Questions', formData.numberOfQuestions],
                ].map(([term, desc]) => (
                  <div
                    key={term}
                    className={`flex items-center justify-between py-2.5 border-b last:border-b-0 ${
                      darkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}
                  >
                    <dt className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{term}</dt>
                    <dd className="font-semibold">{desc}</dd>
                  </div>
                ))}
              </dl>

              <div
                className={`px-5 py-4 border-t ${
                  darkMode ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <p className={`text-sm mb-2.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Topics covered
                </p>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                      <span
                        key={`${s}-${i}`}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          darkMode
                            ? 'bg-purple-500/15 text-purple-300'
                            : 'bg-purple-50 text-purple-700'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Add skills to focus the questions.
                  </p>
                )}
              </div>

              <div
                className={`px-5 py-3 flex items-center gap-2 text-sm ${
                  darkMode ? 'bg-slate-950/60 text-slate-400' : 'bg-slate-50 text-slate-600'
                }`}
              >
                <FaClock className="text-xs shrink-0" />
                <span>About {totalMinutes} minutes</span>
              </div>
            </div>
          </aside>

          {/* Right: form */}
          <form
            onSubmit={handleStartInterview}
            className={`lg:col-span-3 rounded-2xl border p-6 sm:p-8 space-y-7 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {error && (
              <div
                role="alert"
                className="p-3.5 rounded-xl border text-sm font-medium flex items-start gap-2.5 bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
              >
                <FaExclamationCircle className="shrink-0 text-base mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Role */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-semibold mb-2.5">
                Job title
              </label>
              <div className={inputWrap}>
                <FaBriefcase className="text-slate-400 text-sm shrink-0" />
                <input
                  id="jobTitle"
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Frontend React Developer"
                  className="bg-transparent border-none outline-none w-full text-base font-medium placeholder-slate-400"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Experience */}
            <Segmented
              label="Experience level"
              options={EXPERIENCE}
              value={formData.experience}
              onChange={(v) => setField('experience', v)}
              darkMode={darkMode}
              columns="grid-cols-2 sm:grid-cols-4"
            />

            {/* Difficulty */}
            <Segmented
              label="Difficulty"
              options={DIFFICULTY}
              value={formData.difficulty}
              onChange={(v) => setField('difficulty', v)}
              darkMode={darkMode}
              columns="grid-cols-1 sm:grid-cols-3"
            />

            {/* Skills */}
            <div>
              <label htmlFor="skill" className="block text-sm font-semibold mb-2.5">
                Skills and technologies
              </label>
              <div className={inputWrap}>
                <FaCode className="text-slate-400 text-sm shrink-0" />
                <input
                  id="skill"
                  type="text"
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  placeholder="React, JavaScript, Node.js"
                  className="bg-transparent border-none outline-none w-full text-base font-medium placeholder-slate-400"
                />
              </div>
              <p className={`mt-2 text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                Separate skills with commas.
              </p>
            </div>

            {/* Question count */}
            <Segmented
              label="Number of questions"
              options={QUESTION_COUNTS.map((n) => ({ value: n, label: n }))}
              value={formData.numberOfQuestions}
              onChange={(v) => setField('numberOfQuestions', v)}
              darkMode={darkMode}
              columns="grid-cols-4"
            />

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-base transition-colors shadow-md shadow-purple-600/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {loading ? (
                  <>
                    <CgSpinner className="animate-spin text-xl" />
                    <span>Generating questions...</span>
                  </>
                ) : (
                  <>
                    <RiSparklingFill className="text-base" />
                    <span>Start interview</span>
                  </>
                )}
              </button>

              <p
                className={`mt-3 flex items-center justify-center gap-2 text-xs ${
                  darkMode ? 'text-slate-500' : 'text-slate-500'
                }`}
              >
                <FaMicrophone className="shrink-0" />
                <span>Allow microphone access so your answers can be evaluated.</span>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StartInterview;