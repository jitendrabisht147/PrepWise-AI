import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext";

const Cards = () => {
    const [cards, setCards] = useState([]);
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

                const interviews = response.data;

                const totalInterviews = interviews.length;

                const totalScore = interviews.reduce(
                    (sum, interview) => sum + interview.score,
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
                        ? Math.max(...interviews.map(interview => interview.score))
                        : 0;

                setCards([
                    {
                        id: 1,
                        title: "Total Interviews",
                        ans: totalInterviews
                    },
                    {
                        id: 2,
                        title: "Average Score",
                        ans: `${averageScore}%`
                    },
                    {
                        id: 3,
                        title: "Questions Practiced",
                        ans: totalQuestions
                    },
                    {
                        id: 4,
                        title: "Highest Score",
                        ans: `${highestScore}/100`
                    }
                ]);

            } catch (error) {
                console.log(error);
            }

        };

        fetchStats();

    }, []);

    return (
        <div className="ml-4 mr-4 mt-4 grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4">

            {cards.map((item) => (

                <div
                    key={item.id}
                    className={`flex flex-col justify-center gap-2 rounded-2xl p-6 h-32 shadow-sm hover:shadow-lg transition-all duration-300 ${
                        darkMode
                            ? "bg-slate-800"
                            : "bg-white"
                    }`}
                >

                    <h1
                        className={`text-lg font-medium ${
                            darkMode
                                ? "text-slate-400"
                                : "text-slate-500"
                        }`}
                    >
                        {item.title}
                    </h1>

                    <span
                        className={`text-3xl font-bold ${
                            darkMode
                                ? "text-white"
                                : "text-slate-900"
                        }`}
                    >
                        {item.ans}
                    </span>

                </div>

            ))}

        </div>
    );
};

export default Cards;