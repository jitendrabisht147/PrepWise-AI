import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Components/ThemeContext';
import { FaSearch, FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';

const scoreStyle = (score, darkMode) => {
  if (score >= 80)
    return darkMode ? 'bg-green-500/15 text-green-300' : 'bg-green-100 text-green-700';
  if (score >= 50)
    return darkMode ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-700';
  return darkMode ? 'bg-red-500/15 text-red-300' : 'bg-red-100 text-red-700';
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const InterviewHistory = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');

      const response = await axios.get(
        'https://prepwise-ai-backend-0ttv.onrender.com/interviews',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          'We could not load your interviews. Check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter((item) =>
    (item.jobTitle || '').toLowerCase().includes(search.toLowerCase())
  );

  const scores = interviews.map((i) => Number(i.score)).filter((n) => Number.isFinite(n));
  const averageScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null;
  const bestScore = scores.length ? Math.max(...scores) : null;

  const surface = darkMode
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-slate-200 shadow-sm';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-600';
  const divider = darkMode ? 'border-slate-800' : 'border-slate-100';

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
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Interview history</h1>
        <p className={`mt-2 ${muted}`}>Review your past mock interviews and how you scored.</p>

        {/* Summary */}
        {interviews.length > 0 && (
          <dl className="mt-8 grid grid-cols-3 gap-4 max-w-xl">
            {[
              ['Interviews', interviews.length],
              ['Average score', averageScore ?? '-'],
              ['Best score', bestScore ?? '-'],
            ].map(([term, value]) => (
              <div key={term} className={`rounded-2xl border px-5 py-4 ${surface}`}>
                <dd className="text-2xl font-bold">{value}</dd>
                <dt className={`text-sm mt-0.5 ${muted}`}>{term}</dt>
              </div>
            ))}
          </dl>
        )}

        {/* Search */}
        <div className="mt-8">
          <label htmlFor="history-search" className="sr-only">
            Search by job role
          </label>
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all max-w-xl ${
              darkMode
                ? 'bg-slate-900 border-slate-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30'
                : 'bg-white border-slate-300 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/20'
            }`}
          >
            <FaSearch className="text-slate-400 text-sm shrink-0" />
            <input
              id="history-search"
              type="text"
              placeholder="Search by job role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-base font-medium placeholder-slate-400"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mt-6" aria-live="polite">
          {loading ? (
            <div className={`rounded-2xl border p-16 text-center ${surface}`}>
              <CgSpinner className="animate-spin text-4xl text-purple-600 mx-auto" />
              <p className={`mt-3 ${muted}`}>Loading your interviews</p>
            </div>
          ) : error ? (
            <div className={`rounded-2xl border p-10 text-center ${surface}`}>
              <FaExclamationCircle className="text-red-500 text-2xl mx-auto" />
              <h2 className="mt-3 text-xl font-bold">Could not load interviews</h2>
              <p className={`mt-1 ${muted}`}>{error}</p>
              <button
                onClick={fetchInterviews}
                className="mt-6 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors cursor-pointer"
              >
                Try again
              </button>
            </div>
          ) : interviews.length === 0 ? (
            <div className={`rounded-2xl border p-12 sm:p-16 text-center ${surface}`}>
              <h2 className="text-2xl font-bold">No interviews yet</h2>
              <p className={`mt-2 max-w-md mx-auto ${muted}`}>
                Finish a mock interview and it will show up here with its score and date.
              </p>
              <Link
                to="/startinterview"
                className="mt-7 inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-purple-600/25 transition-colors"
              >
                Start interview
              </Link>
            </div>
          ) : filteredInterviews.length === 0 ? (
            <div className={`rounded-2xl border p-12 text-center ${surface}`}>
              <h2 className="text-xl font-bold">No matching interviews</h2>
              <p className={`mt-1 ${muted}`}>Nothing matches "{search}". Try a different job role.</p>
              <button
                onClick={() => setSearch('')}
                className={`mt-5 px-6 py-2.5 rounded-xl border font-semibold transition cursor-pointer ${
                  darkMode
                    ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className={`rounded-2xl border overflow-hidden ${surface}`}>
              {/* Column labels, desktop only */}
              <div
                className={`hidden sm:grid grid-cols-[1fr_8rem_9rem_9rem] gap-4 px-6 py-3.5 text-sm font-semibold border-b ${divider} ${
                  darkMode ? 'bg-slate-950/50 text-slate-400' : 'bg-slate-50 text-slate-600'
                }`}
              >
                <span>Job role</span>
                <span>Score</span>
                <span>Date</span>
                <span className="text-right">Details</span>
              </div>

              <ul>
                {filteredInterviews.map((item) => (
                  <li
                    key={item._id}
                    className={`grid grid-cols-2 sm:grid-cols-[1fr_8rem_9rem_9rem] gap-x-4 gap-y-2 items-center px-6 py-4 border-b last:border-b-0 transition-colors ${divider} ${
                      darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="col-span-2 sm:col-span-1 font-semibold">
                      {item.jobTitle || 'Not available'}
                    </span>

                    <span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${scoreStyle(
                          item.score,
                          darkMode
                        )}`}
                      >
                        {item.score}/100
                      </span>
                    </span>

                    <span className={`text-sm sm:text-base text-right sm:text-left ${muted}`}>
                      {formatDate(item.createdAt)}
                    </span>

                    <span className="col-span-2 sm:col-span-1 sm:text-right">
                      <Link
                        to={`/interview-details/${item._id}`}
                        className={`inline-block px-4 py-2 rounded-lg border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                          darkMode
                            ? 'border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white'
                            : 'border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white'
                        }`}
                      >
                        View details
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      </main>
    </div>
  );
};

export default InterviewHistory;