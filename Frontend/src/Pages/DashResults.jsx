import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../Components/ThemeContext';
import Cards from '../Components/Cards';
import { FaExclamationCircle } from 'react-icons/fa';
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

const DashResults = () => {
  const { darkMode } = useTheme();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResults = async () => {
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

      const data = Array.isArray(response.data) ? response.data : [];
      setResults(data.slice(0, 10));
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          'We could not load your results. Check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const surface = darkMode
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-slate-200 shadow-sm';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Results dashboard</h1>
        <p className={`mt-2 ${muted}`}>See how your latest interviews went.</p>

        <Cards />

        <section className="mt-10" aria-live="polite">
          <h2 className="text-xl font-bold mb-5">Latest 10 interview results</h2>

          {loading ? (
            <div className={`rounded-2xl border p-14 text-center ${surface}`}>
              <CgSpinner className="animate-spin text-4xl text-purple-600 mx-auto" />
              <p className={`mt-3 ${muted}`}>Loading your results</p>
            </div>
          ) : error ? (
            <div className={`rounded-2xl border p-10 text-center ${surface}`}>
              <FaExclamationCircle className="text-red-500 text-2xl mx-auto" />
              <h3 className="mt-3 text-xl font-bold">Could not load results</h3>
              <p className={`mt-1 ${muted}`}>{error}</p>
              <button
                onClick={fetchResults}
                className="mt-6 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors cursor-pointer"
              >
                Try again
              </button>
            </div>
          ) : results.length === 0 ? (
            <div className={`rounded-2xl border p-12 text-center ${surface}`}>
              <h3 className="text-xl font-bold">No results yet</h3>
              <p className={`mt-1 ${muted}`}>Complete an interview to see your results here.</p>
              <Link
                to="/startinterview"
                className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-purple-600/25 transition-colors"
              >
                Start interview
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {results.map((item) => (
                <li
                  key={item._id}
                  className={`rounded-2xl border p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors ${surface} ${
                    darkMode ? 'hover:border-slate-700' : 'hover:border-slate-300'
                  }`}
                >
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold truncate">
                      {item.jobTitle || 'Not available'}
                    </h3>
                    <p className={`mt-0.5 text-sm ${muted}`}>{formatDate(item.createdAt)}</p>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-5">
                    <span
                      className={`px-3.5 py-1.5 rounded-full text-sm font-semibold ${scoreStyle(
                        item.score,
                        darkMode
                      )}`}
                    >
                      {item.score}/100
                    </span>

                    <Link
                      to={`/interview-details/${item._id}`}
                      className={`ml-auto sm:ml-0 px-4 py-2 rounded-lg border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                        darkMode
                          ? 'border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white'
                          : 'border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white'
                      }`}
                    >
                      View details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashResults;