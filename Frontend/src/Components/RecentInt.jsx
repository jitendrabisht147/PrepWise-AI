import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const RecentInt = () => {
    const [interviews, setInterviews] = useState([]);
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

                setInterviews(response.data.slice(0, 4));

            } catch (error) {
                console.log(error);
            }
        };

        fetchInterviews();
    }, []);

    return (
        <div className="m-4">

            <h1
                className={`text-2xl font-bold p-8 ${
                    darkMode
                        ? "text-white"
                        : "text-slate-900"
                }`}
            >
                Recent Interviews
            </h1>

            {interviews.length === 0 ? (

                <div
                    className={`rounded-2xl shadow-sm p-10 text-center ${
                        darkMode
                            ? "bg-slate-800"
                            : "bg-white"
                    }`}
                >

                    <h2
                        className={`text-xl font-semibold ${
                            darkMode
                                ? "text-white"
                                : "text-slate-700"
                        }`}
                    >
                        No Interviews Yet
                    </h2>

                    <p
                        className={`mt-2 ${
                            darkMode
                                ? "text-slate-400"
                                : "text-slate-500"
                        }`}
                    >
                        Complete your first interview to see it here.
                    </p>

                </div>

            ) : (

                <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">

                    {interviews.map((item) => (

                        <div
                            key={item._id}
                            className={`rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                                darkMode
                                    ? "bg-slate-800"
                                    : "bg-white"
                            }`}
                        >

                            <div>

                                <h2
                                    className={`text-lg font-semibold ${
                                        darkMode
                                            ? "text-white"
                                            : "text-slate-900"
                                    }`}
                                >
                                    {item.jobTitle}
                                </h2>

                                <h1 className="text-3xl font-bold text-blue-500 mt-3">
                                    {item.score}/100
                                </h1>

                                <p
                                    className={`text-sm mt-2 ${
                                        darkMode
                                            ? "text-slate-400"
                                            : "text-slate-500"
                                    }`}
                                >
                                    {new Date(item.createdAt).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/interview-details/${item._id}`)
                                }
                                className="mt-5 border border-blue-600 text-blue-500 rounded-lg py-2 hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer"
                            >
                                View Details →
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default RecentInt;