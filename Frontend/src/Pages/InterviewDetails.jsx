import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../Components/ThemeContext';
import { TiTick } from 'react-icons/ti';
import { IoIosWarning } from 'react-icons/io';
import { FaRegLightbulb } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const getPerformance = (score) => {
  if (score >= 80)
    return { text: 'Excellent performance', stroke: '#16a34a', textClass: 'text-green-600 dark:text-green-400' };
  if (score >= 50)
    return { text: 'Good performance', stroke: '#d97706', textClass: 'text-amber-600 dark:text-amber-400' };
  return { text: 'Needs improvement', stroke: '#dc2626', textClass: 'text-red-600 dark:text-red-400' };
};

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInterview = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `https://prepwise-ai-backend-0ttv.onrender.com/interviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterview(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          'We could not load this interview. Check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const surface = darkMode
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-slate-200 shadow-sm';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-600';

  const header = (
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
            onClick={() => navigate(-1)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
              darkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to history</span>
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
  );

  const shell = (children) => (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {header}
      {children}
    </div>
  );

  if (loading) {
    return shell(
      <main className="flex-1 flex items-center justify-center px-6 py-10" aria-live="polite">
        <div className="text-center">
          <CgSpinner className="animate-spin text-4xl text-purple-600 mx-auto" />
          <p className={`mt-3 ${muted}`}>Loading interview</p>
        </div>
      </main>
    );
  }

  if (error || !interview) {
    return shell(
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className={`max-w-md w-full rounded-2xl border p-8 text-center ${surface}`}>
          <h1 className="text-2xl font-bold">Could not load interview</h1>
          <p className={`mt-2 ${muted}`}>{error || 'This interview was not found.'}</p>
          <button
            onClick={fetchInterview}
            className="mt-6 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const questions = interview.questions || [];
  const answers = interview.answers || [];
  const strengths = interview.strengths || [];
  const improvements = interview.improvements || [];

  const score = Math.max(0, Math.min(100, Number(interview.score) || 0));
  const performance = getPerformance(score);
  const answeredCount = answers.filter((a) => (a || '').trim() !== '').length;

  const dateText = new Date(interview.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return shell(
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {interview.jobTitle || 'Interview details'}
          </h1>
          <p className={`mt-1.5 ${muted}`}>Taken on {dateText}</p>
        </div>

        {/* Score + feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <section className={`lg:col-span-2 rounded-2xl border p-8 ${surface}`}>
            <div className="flex items-center gap-6">
              <div className="relative w-36 h-36 shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden="true">
                  <circle
                    cx="60"
                    cy="60"
                    r={RING_RADIUS}
                    fill="none"
                    strokeWidth="10"
                    stroke={darkMode ? '#1e293b' : '#e2e8f0'}
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={RING_RADIUS}
                    fill="none"
                    strokeWidth="10"
                    strokeLinecap="round"
                    stroke={performance.stroke}
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE * (1 - score / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold leading-none">{score}</span>
                  <span className={`text-sm ${muted}`}>out of 100</span>
                </div>
              </div>

              <div>
                <p className={`text-lg font-bold ${performance.textClass}`}>{performance.text}</p>
                <p className={`mt-1 text-sm ${muted}`}>Overall score</p>
              </div>
            </div>

            <dl
              className={`mt-7 pt-5 border-t grid grid-cols-3 gap-4 text-center ${
                darkMode ? 'border-slate-800' : 'border-slate-100'
              }`}
            >
              {[
                ['Questions', questions.length],
                ['Answered', answeredCount],
                ['To improve', improvements.length],
              ].map(([term, value]) => (
                <div key={term}>
                  <dd className="text-2xl font-bold">{value}</dd>
                  <dt className={`text-sm ${muted}`}>{term}</dt>
                </div>
              ))}
            </dl>
          </section>

          <section className={`lg:col-span-3 rounded-2xl border p-8 ${surface}`}>
            <h2 className="text-xl font-bold flex items-center gap-2.5">
              <FaRegLightbulb className="text-amber-500" />
              AI feedback
            </h2>
            <p className={`mt-4 leading-8 text-base ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {interview.feedback || 'No feedback was saved for this interview.'}
            </p>
          </section>
        </div>

        {/* Strengths and improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <section className={`rounded-2xl border p-7 ${surface}`}>
            <h2 className="text-xl font-bold flex items-center gap-2.5 mb-5">
              <TiTick className="text-green-600 text-2xl" />
              Strengths
            </h2>
            {strengths.length > 0 ? (
              <ul className="space-y-3">
                {strengths.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-3 rounded-xl p-3.5 ${
                      darkMode ? 'bg-green-500/10' : 'bg-green-50'
                    }`}
                  >
                    <TiTick className="text-green-600 text-xl shrink-0 mt-0.5" />
                    <p className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={muted}>No strengths were identified in this interview.</p>
            )}
          </section>

          <section className={`rounded-2xl border p-7 ${surface}`}>
            <h2 className="text-xl font-bold flex items-center gap-2.5 mb-5">
              <IoIosWarning className="text-amber-500 text-2xl" />
              Areas to improve
            </h2>
            {improvements.length > 0 ? (
              <ul className="space-y-3">
                {improvements.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-3 rounded-xl p-3.5 ${
                      darkMode ? 'bg-amber-500/10' : 'bg-amber-50'
                    }`}
                  >
                    <IoIosWarning className="text-amber-500 text-xl shrink-0 mt-0.5" />
                    <p className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{item}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={muted}>No improvement areas were listed for this interview.</p>
            )}
          </section>
        </div>

        {/* Question review */}
        <section className={`rounded-2xl border p-7 sm:p-8 mt-8 ${surface}`}>
          <h2 className="text-xl font-bold">Your answers</h2>
          <p className={`mt-1 text-sm ${muted}`}>Select a question to read what you wrote.</p>

          <div className="mt-6 space-y-3">
            {questions.map((question, index) => {
              const answer = (answers[index] || '').trim();
              return (
                <details
                  key={index}
                  className={`rounded-xl border ${
                    darkMode ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <summary className="flex items-start gap-4 p-4 cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl">
                    <span
                      className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-sm font-bold ${
                        answer
                          ? 'bg-purple-600 text-white'
                          : darkMode
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 font-semibold leading-7">{question}</span>
                    <span
                      className={`text-sm mt-1 shrink-0 ${
                        answer ? muted : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {answer ? 'Answered' : 'Skipped'}
                    </span>
                  </summary>

                  <div className="px-4 pb-4 sm:pl-[4.25rem]">
                    <p
                      className={`leading-7 rounded-lg border p-4 whitespace-pre-wrap ${
                        darkMode
                          ? 'bg-slate-900 border-slate-800 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {answer || 'No answer provided.'}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default InterviewDetails;