import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InterviewDetails = () => {

    const { id } = useParams();

    const [interview, setInterview] = useState(null);

    useEffect(() => {

        const fetchInterview = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `http://localhost:5000/interviews/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setInterview(response.data);

            } catch (error) {
                console.log(error);
            }

        };

        fetchInterview();

    }, [id]);

    if (!interview) {

        return (
            <div className="bg-slate-100 min-h-screen flex justify-center items-center">
                <h1 className="text-2xl font-bold">
                    Loading Interview...
                </h1>
            </div>
        );

    }

    return (
        <div className="bg-slate-100 min-h-screen py-10">

            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="max-w-6xl mx-auto px-6">
                    <button
                        onClick={() => window.history.back()}
                        className="mb-6 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                    >
                        ← Back to History
                    </button>

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <div className="flex justify-between items-center">

                            <div>

                                <h1 className="text-4xl font-bold text-slate-900">
                                    {interview.jobTitle}
                                </h1>

                                <p className="text-slate-500 mt-2">
                                    Interview Details
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-slate-500">
                                    Interview Date
                                </p>

                                <h2 className="font-semibold text-lg">

                                    {
                                        new Date(interview.createdAt)
                                            .toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )
                                    }

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Score Card */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 flex flex-col items-center">

                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Overall Score
                    </h2>

                    <div className="flex flex-col items-center">

                        <div
                            className={`w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold
        ${interview.score >= 80
                                    ? "bg-green-100 text-green-700"
                                    : interview.score >= 50
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                        >
                            {interview.score}
                        </div>

                        <h2 className="text-2xl font-bold mt-5">
                            {interview.score}/100
                        </h2>

                        <p className="text-slate-500 mt-2">

                            {
                                interview.score >= 80
                                    ? "Excellent Performance "
                                    : interview.score >= 50
                                        ? "Good Performance "
                                        : "Needs Improvement "
                            }

                        </p>

                    </div>

                </div>
                {/* Strengths & Improvements */}

                <div className="grid grid-cols-2 gap-8 mt-8">

                    {/* Strengths */}

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold text-green-700 mb-5">
                             Strengths
                        </h2>

                        <div className="space-y-4">

                            {
                                interview.strengths.length > 0 ? (

                                    interview.strengths.map((strength, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center gap-3 bg-green-50 rounded-xl p-3"
                                        >

                                            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex justify-center items-center font-bold">
                                                ✓
                                            </div>

                                            <p className="font-medium text-slate-700">
                                                {strength}
                                            </p>

                                        </div>

                                    ))

                                ) : (

                                    <p className="text-slate-500">
                                        No strengths were identified in this interview.
                                    </p>

                                )
                            }

                        </div>

                    </div>

                    {/* Areas to Improve */}

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold text-orange-600 mb-5">
                            Areas to Improve
                        </h2>

                        <div className="space-y-4">

                            {
                                interview.improvements.map((item, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center gap-3 bg-orange-50 rounded-xl p-3"
                                    >

                                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex justify-center items-center font-bold">
                                            !
                                        </div>

                                        <p className="font-medium text-slate-700">
                                            {item}
                                        </p>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                    {/* AI Feedback */}

                    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                        <h2 className="text-2xl font-bold text-slate-900 mb-5">
                             AI Feedback
                        </h2>

                        <div className="border-t border-slate-200 pt-5">

                            <p className="text-slate-600 leading-8">
                                {interview.feedback}
                            </p>

                        </div>

                    </div>

                    {/* Interview Review */}

                    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Interview Review
                        </h2>

                        {
                            interview.questions.map((question, index) => (

                                <div
                                    key={index}
                                    className="border-b border-slate-200 pb-6 mb-6"
                                >

                                    <h3 className="font-bold text-lg text-slate-900">
                                        Question {index + 1}
                                    </h3>

                                    <p className="text-slate-700 mt-3">
                                        {question}
                                    </p>

                                    <div className="bg-slate-100 rounded-xl p-4 mt-4">

                                        <p className="font-semibold text-blue-600 mb-2">
                                            Your Answer
                                        </p>

                                        <p className="text-slate-700">
                                            {interview.answers[index] || "No Answer"}
                                        </p>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
};

export default InterviewDetails;