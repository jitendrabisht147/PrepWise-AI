import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../Components/ThemeContext';
import { FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import { RiSparklingFill } from 'react-icons/ri';
import { IoMoon } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';

const SKILLS = ['React', 'JavaScript', 'HTML', 'CSS', 'Node js', 'Mongo DB'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const COUNTS = ['2', '5', '10'];

/* Single-select button group */
const Choice = ({ label, options, value, onChange, darkMode }) => (
  <div role="radiogroup" aria-label={label}>
    <p className="text-sm font-semibold mb-2.5">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
              darkMode ? 'focus-visible:ring-offset-slate-900' : 'focus-visible:ring-offset-white'
            } ${
              selected
                ? 'bg-purple-600 border-purple-600 text-white shadow-sm shadow-purple-600/30'
                : darkMode
                ? 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-500'
                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const PracticeQuestions = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    skill: 'React',
    difficulty: 'Easy',
    numberOfQuestions: '5',
  });

  const [questions, setQuestions] = useState([]);
  const [generatedFor, setGeneratedFor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const generateQuestions = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      const response = await axios.post(
        'https://prepwise-ai-backend-0ttv.onrender.com/generate-questions',
        {
          jobTitle: 'Practice Session',
          experience: 'Fresher',
          skill: formData.skill,
          difficulty: formData.difficulty,
          numberOfQuestions: formData.numberOfQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const raw = response.data.questions;
      const list = Array.isArray(raw) ? raw : String(raw || '').split('\n');
      const questionsArray = list
        .map((q) => String(q).replace(/^\d+[\.\)]\s*/, '').trim())
        .filter((q) => q !== '');

      if (questionsArray.length === 0) {
        throw new Error('No questions were generated. Please try again.');
      }

      setQuestions(questionsArray);
      setGeneratedFor({ ...formData });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to generate questions. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const surface = darkMode
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-slate-200 shadow-sm';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
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

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Practice questions
          </h1>
          <p className={`mt-2 max-w-xl ${muted}`}>
            Pick a skill and generate questions to think through at your own pace. Nothing is
            scored here.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
            {/* Settings */}
            <section
              className={`lg:col-span-2 rounded-2xl border p-6 sm:p-7 space-y-6 self-start lg:sticky lg:top-8 ${surface}`}
            >
              <Choice
                label="Skill"
                options={SKILLS}
                value={formData.skill}
                onChange={(v) => setField('skill', v)}
                darkMode={darkMode}
              />
              <Choice
                label="Difficulty"
                options={DIFFICULTIES}
                value={formData.difficulty}
                onChange={(v) => setField('difficulty', v)}
                darkMode={darkMode}
              />
              <Choice
                label="Number of questions"
                options={COUNTS}
                value={formData.numberOfQuestions}
                onChange={(v) => setField('numberOfQuestions', v)}
                darkMode={darkMode}
              />

              <button
                type="button"
                onClick={generateQuestions}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors shadow-md shadow-purple-600/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {loading ? (
                  <>
                    <CgSpinner className="animate-spin text-xl" />
                    <span>Generating questions...</span>
                  </>
                ) : (
                  <>
                    <RiSparklingFill className="text-base" />
                    <span>{questions.length > 0 ? 'Generate new questions' : 'Generate questions'}</span>
                  </>
                )}
              </button>
            </section>

            {/* Results */}
            <section className="lg:col-span-3" aria-live="polite">
              {error && (
                <div
                  role="alert"
                  className="mb-5 p-3.5 rounded-xl border text-sm font-medium flex items-start gap-2.5 bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                >
                  <FaExclamationCircle className="shrink-0 text-base mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {questions.length === 0 ? (
                <div
                  className={`rounded-2xl border border-dashed p-10 text-center ${
                    darkMode ? 'border-slate-700' : 'border-slate-300'
                  }`}
                >
                  <h2 className="text-lg font-bold">
                    {loading ? 'Writing your questions' : 'No questions yet'}
                  </h2>
                  <p className={`mt-1 ${muted}`}>
                    {loading
                      ? 'This can take a few moments.'
                      : 'Choose your settings and select Generate questions.'}
                  </p>
                </div>
              ) : (
                <div className={`rounded-2xl border p-6 sm:p-8 ${surface} ${loading ? 'opacity-60' : ''}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
                    <h2 className="text-xl font-bold">
                      {generatedFor?.skill} questions
                    </h2>
                    <p className={`text-sm ${muted}`}>
                      {generatedFor?.difficulty} difficulty, {questions.length}{' '}
                      {questions.length === 1 ? 'question' : 'questions'}
                    </p>
                  </div>

                  <ol className="space-y-4">
                    {questions.map((question, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-4 rounded-xl border p-4 ${
                          darkMode
                            ? 'border-slate-800 bg-slate-950/50'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <span className="w-9 h-9 shrink-0 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <p
                          className={`leading-7 pt-1 ${
                            darkMode ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          {question}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PracticeQuestions;