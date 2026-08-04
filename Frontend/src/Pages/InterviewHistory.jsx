import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const InterviewHistory = () => {
    const [interviews, setInterviews] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/interviews",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setInterviews(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchInterviews();
    }, []);

    const filteredInterviews = interviews.filter((item) =>
    item.jobTitle.toLowerCase().includes(search.toLowerCase())
);

    return (
        <div className=" min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-10">

                <h1 className="text-4xl font-bold text-slate-900">
                    Interview History
                </h1>

                <p className="text-slate-500 mt-2">
                    View all your previous AI interviews.
                </p>

                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Search by Job Role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                </div>

                {
                    filteredInterviews.length === 0 ?

                        (
                            <div className="bg-white rounded-3xl shadow-lg mt-10 p-16 flex flex-col items-center">

                                <h1 className="text-3xl font-bold text-slate-800">
                                    No Interviews Yet
                                </h1>

                                <p className="text-slate-500 mt-3 text-center">
                                    Complete your first interview to start building
                                    your interview history.
                                </p>

                                <Link
                                    to="/startinterview"
                                    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                                >
                                    Start Interview
                                </Link>

                            </div>
                        )

                        :

                        (
                            <div className="bg-white rounded-3xl shadow-xl mt-10 overflow-hidden">

                                <table className="w-full">

                                    <thead className="bg-slate-200">

                                        <tr>

                                            <th className="text-left px-6 py-5 w-16">
                                                #
                                            </th>

                                            <th className="text-left px-6 py-5">
                                                Job Role
                                            </th>

                                            <th className="text-left px-6 py-5">
                                                Score
                                            </th>

                                            <th className="text-left px-6 py-5">
                                                Date
                                            </th>

                                            <th className="text-center px-6 py-5">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            filteredInterviews.map((item, index) => (

                                                <tr
                                                    key={item._id}
                                                    className="border-t hover:bg-slate-50 transition-all duration-200"
                                                >

                                                    <td className="px-6 py-5 font-semibold text-slate-500">
                                                        {index + 1}
                                                    </td>

                                                    <td className="px-6 py-5 font-semibold text-slate-800">
                                                        {item.jobTitle || "Not Available"}
                                                    </td>

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`px-4 py-2 rounded-full text-sm font-semibold
                                                            ${item.score >= 80
                                                                    ? "bg-green-100 text-green-700"
                                                                    : item.score >= 50
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : "bg-red-100 text-red-700"
                                                                }`}
                                                        >
                                                            {item.score}/100
                                                        </span>

                                                    </td>

                                                    <td className="px-6 py-5 text-slate-600">

                                                        {new Date(item.createdAt).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )}

                                                    </td>

                                                    <td className="px-6 py-5 text-center">

                                                        <button
                                                            onClick={() => navigate(`/interview-details/${item._id}`)}
                                                            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2 rounded-lg transition font-medium"
                                                        >
                                                            View Details →
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>
                        )

                }

            </div>
        </div>
    );
};

export default InterviewHistory;