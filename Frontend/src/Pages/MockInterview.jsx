import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTheme } from '../Components/ThemeContext';
import img7 from '../assets/img7.jpg';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';

const MockInterview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const jobTitle = location.state?.jobTitle || '';
  const difficulty = location.state?.difficulty || '';
  const questions = location.state?.questions || [];

  const [question, setQuestion] = useState(1);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const total = questions.length;
  const isAnswered = (i) => (answers[i] || '').trim().length > 0;
  const answeredCount = answers.filter((a) => (a || '').trim().length > 0).length;
  const unanswered = total - answeredCount;
  const currentAnswer = answers[question - 1] || '';
  const wordCount = currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0;

  const updateAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[question - 1] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    navigate('/result', {
      state: {
        questions,
        answers,
        jobTitle,
      },
    });
  };

  const surface = darkMode
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-slate-200 shadow-sm';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-600';

  /* Header shared by both states */
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
            onClick={() => navigate('/dashboard')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
              darkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FaArrowLeft className="text-xs" />
            <span>Exit interview</span>
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

  /* Opened without questions (e.g. page refresh) */
  if (total === 0) {
    return (
      <div
        className={`min-h-screen flex flex-col font-sans ${
          darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}
      >
        {header}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className={`max-w-md w-full rounded-2xl border p-8 text-center ${surface}`}>
            <h1 className="text-2xl font-bold">No interview in progress</h1>
            <p className={`mt-2 ${muted}`}>
              Your questions are cleared when the page is refreshed. Set up a new interview to
              continue.
            </p>
            <Link
              to="/startinterview"
              className="mt-6 inline-flex items-center justify-center w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors"
            >
              Set up interview
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {header}

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Title + question navigator */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {jobTitle ? jobTitle : 'Mock interview'}
              </h1>
              <p className={`mt-1.5 text-sm ${muted}`}>
                Question {question} of {total}
                {difficulty ? `, ${difficulty} difficulty` : ''}. {answeredCount} answered.
              </p>
            </div>

            {/* Jump between questions; the order matters, so numbers are meaningful here */}
            <nav aria-label="Questions" className="flex flex-wrap gap-2">
              {questions.map((_, i) => {
                const active = i + 1 === question;
                const done = isAnswered(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setQuestion(i + 1)}
                    aria-current={active ? 'step' : undefined}
                    aria-label={`Question ${i + 1}${done ? ', answered' : ''}`}
                    className={`w-10 h-10 rounded-xl border text-sm font-bold flex items-center justify-center transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                      darkMode ? 'focus-visible:ring-offset-slate-950' : 'focus-visible:ring-offset-slate-50'
                    } ${
                      active
                        ? 'bg-purple-600 border-purple-600 text-white shadow-sm shadow-purple-600/30'
                        : done
                        ? darkMode
                          ? 'bg-purple-500/15 border-purple-500/40 text-purple-300'
                          : 'bg-purple-50 border-purple-300 text-purple-700'
                        : darkMode
                        ? 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                        : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {done && !active ? <FaCheck className="text-xs" /> : i + 1}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
            {/* Interviewer + question */}
            <section className={`lg:col-span-2 rounded-2xl border overflow-hidden self-start ${surface}`}>
              <div className="bg-purple-600 text-white px-6 py-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/40 shrink-0">
                  <img src={img7} alt="Harry, your AI interviewer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-lg font-bold leading-tight">Harry</p>
                  <p className="text-sm text-purple-200">AI interviewer</p>
                </div>
              </div>

              <div className="px-6 py-6">
                <p className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                  Question {question}
                </p>
                <p className="mt-2 text-xl font-semibold leading-8">{questions[question - 1]}</p>
              </div>
            </section>

            {/* Answer */}
            <section className={`lg:col-span-3 rounded-2xl border p-6 sm:p-8 flex flex-col ${surface}`}>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="answer" className="text-lg font-bold">
                  Your answer
                </label>
                <span className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </span>
              </div>

              <textarea
                id="answer"
                value={currentAnswer}
                onChange={(e) => updateAnswer(e.target.value)}
                placeholder="Type your answer as you would say it in the interview."
                className={`w-full h-72 rounded-xl border p-5 text-base leading-7 outline-none resize-none transition placeholder-slate-400 focus:ring-2 ${
                  darkMode
                    ? 'bg-slate-950 border-slate-700 text-white focus:border-purple-500 focus:ring-purple-500/30'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-purple-600 focus:ring-purple-600/20'
                }`}
              />

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setQuestion(question > 1 ? question - 1 : 1)}
                  disabled={question === 1}
                  className={`flex-1 py-3 rounded-xl border font-semibold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    darkMode
                      ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Previous
                </button>

                {question === total ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors shadow-md shadow-purple-600/25 cursor-pointer"
                  >
                    Submit interview
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setQuestion(question < total ? question + 1 : question)}
                    className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors shadow-md shadow-purple-600/25 cursor-pointer"
                  >
                    Next question
                  </button>
                )}
              </div>

              {question === total && unanswered > 0 && (
                <p className="mt-3 text-sm text-amber-600 dark:text-amber-400">
                  {unanswered} {unanswered === 1 ? 'question has' : 'questions have'} no answer yet.
                  Use the numbers above to go back.
                </p>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MockInterview;