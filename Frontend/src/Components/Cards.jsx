import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext";
import { GiMicrophone } from "react-icons/gi";
import { FaChartLine, FaCheckCircle, FaTrophy } from "react-icons/fa";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://prepwise-ai-backend-0ttv.onrender.com/interviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const interviews = response.data || [];

        const totalInterviews = interviews.length;

        const totalScore = interviews.reduce(
          (sum, interview) => sum + (interview.score || 0),
          0
        );

        const averageScore =
          totalInterviews > 0
            ? Math.round(totalScore / totalInterviews)
            : 0;

        const totalQuestions = interviews.reduce(
          (sum, interview) =>
            sum + (interview.questions?.length || 0),
          0
        );

        const highestScore =
          totalInterviews > 0
            ? Math.max(...interviews.map((interview) => interview.score || 0))
            : 0;

        setCards([
          {
            id: 1,
            title: "Total Interviews",
            ans: totalInterviews,
            icon: <GiMicrophone className="text-2xl" />,
            badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
          },
          {
            id: 2,
            title: "Average Score",
            ans: `${averageScore}%`,
            icon: <FaChartLine className="text-xl" />,
            badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
          },
          {
            id: 3,
            title: "Questions Practiced",
            ans: totalQuestions,
            icon: <FaCheckCircle className="text-xl" />,
            badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
          },
          {
            id: 4,
            title: "Highest Score",
            ans: `${highestScore}/100`,
            icon: <FaTrophy className="text-xl" />,
            badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
          },
        ]);
      } catch (error) {
        console.log("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mx-4 sm:mx-6 my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {loading
        ? /* Skeleton Loaders */
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 h-32 border animate-pulse flex items-center justify-between ${
                darkMode ? "bg-slate-900/60 border-slate-800/80" : "bg-white border-slate-200/80"
              }`}
            >
              <div className="space-y-3">
                <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
                <div className="h-8 w-16 bg-slate-300 dark:bg-slate-700 rounded-xl" />
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))
        : /* Stat Cards */
          cards.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl border p-6 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                darkMode
                  ? "bg-slate-900 border-slate-800/80 hover:border-purple-500/40 hover:shadow-purple-500/5"
                  : "bg-white border-slate-200/80 hover:border-purple-300 shadow-sm hover:shadow-purple-500/10"
              }`}
            >
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {item.title}
                </p>

                <h3
                  className={`text-3xl font-black mt-2 tracking-tight ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {item.ans}
                </h3>
              </div>

              {/* Icon Badge */}
              <div
                className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${item.badgeBg}`}
              >
                {item.icon}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Cards;