import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { GiMicrophone } from "react-icons/gi";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";

const RecentInt = ({ searchQuery = "" }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchInterviews = async () => {
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

        setInterviews(response.data || []);
      } catch (error) {
        console.log("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  // Filter interviews by user search query (matching job title or job description)
  const filteredInterviews = interviews
    .filter((item) =>
      item.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 4);

  // Helper for dynamic score badge styling
  const getScoreBadge = (score) => {
    if (score >= 80) {
      return {
        label: "Excellent",
        color:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      };
    } else if (score >= 60) {
      return {
        label: "Good",
        color:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      };
    }
    return {
      label: "Needs Practice",
      color:
        "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    };
  };

  return (
    <div className="mx-4 sm:mx-6 my-8">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-2xl font-bold tracking-tight ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Recent Interviews"}
        </h2>

        {interviews.length > 0 && (
          <button
            onClick={() => navigate("/interviewhistory")}
            className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>View All</span>
            <FaArrowRight className="text-xs" />
          </button>
        )}
      </div>

      {/* Content Section */}
      {loading ? (
        /* Skeleton Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-6 h-52 animate-pulse flex flex-col justify-between ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="space-y-3">
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-8 w-1/2 bg-slate-300 dark:bg-slate-700 rounded" />
              </div>
              <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredInterviews.length === 0 ? (
        /* Empty State */
        <div
          className={`rounded-3xl border-2 border-dashed p-10 sm:p-12 text-center flex flex-col items-center justify-center transition ${
            darkMode
              ? "bg-slate-900/50 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl mb-4 shadow-sm">
            <GiMicrophone />
          </div>

          <h3
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            {searchQuery ? "No Matching Interviews Found" : "No Interviews Yet"}
          </h3>

          <p
            className={`mt-1.5 text-sm max-w-md ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {searchQuery
              ? `We couldn't find any interviews matching "${searchQuery}". Try searching for another job title.`
              : "Complete your first AI mock interview to receive detailed feedback and track your score history here."}
          </p>

          {!searchQuery && (
            <button
              onClick={() => navigate("/startinterview")}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 transition duration-200 cursor-pointer"
            >
              Start Your First Interview
            </button>
          )}
        </div>
      ) : (
        /* Interview Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredInterviews.map((item) => {
            const badge = getScoreBadge(item.score);

            return (
              <div
                key={item._id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  darkMode
                    ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200/80 hover:border-purple-200 shadow-sm"
                }`}
              >
                <div>
                  {/* Top Bar: Job Title & Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3
                      className={`text-base font-bold line-clamp-1 ${
                        darkMode ? "text-white" : "text-slate-900"
                      }`}
                      title={item.jobTitle}
                    >
                      {item.jobTitle}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="my-4">
                    <p className="text-xs text-slate-400 font-medium">
                      Overall Score
                    </p>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                        {item.score}
                      </span>
                      <span className="text-slate-400 text-sm font-semibold">
                        /100
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <FaRegCalendarAlt className="text-slate-400" />
                    <span>
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* View Button */}
                <button
                  onClick={() => navigate(`/interview-details/${item._id}`)}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-600 dark:hover:text-white transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Details</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentInt;