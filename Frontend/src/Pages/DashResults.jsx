import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cards from "../Components/Cards";

const DashResults = () => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
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

                setResults(response.data.slice(0, 10));

            } catch (error) {
                console.log(error);
            }
        };

        fetchResults();
    }, []);

    return (
        <div className="bg-slate-100 min-h-screen py-10">

            <div className="max-w-7xl mx-auto px-10">

                <h1 className="text-4xl font-bold text-slate-900">
                    Results Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                    View your latest interview performance.
                </p>

                <Cards />

                <div className="mt-10">

                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Latest 10 Interview Results
                    </h2>

                    <div className="space-y-5">

                        {results.length === 0 ? (

                            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                                <h2 className="text-2xl font-bold text-slate-700">
                                    No Results Yet
                                </h2>

                                <p className="text-slate-500 mt-2">
                                    Complete an interview to see your results.
                                </p>

                            </div>

                        ) : (

                            results.map((item) => (

                                <div
                                    key={item._id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center"
                                >

                                    <div>

                                        <h3 className="text-xl font-bold text-slate-900">
                                            {item.jobTitle}
                                        </h3>

                                        <p className="text-slate-500 mt-2">
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

                                    <div className="flex items-center gap-6">

                                        <span
                                            className={`px-5 py-2 rounded-full font-bold
                                            ${
                                                item.score >= 80
                                                    ? "bg-green-100 text-green-700"
                                                    : item.score >= 50
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {item.score}/100
                                        </span>

                                        <button
                                            onClick={() =>
                                                navigate(`/interview-details/${item._id}`)
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DashResults;