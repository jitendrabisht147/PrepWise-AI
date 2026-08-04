import React, { useEffect, useState } from 'react'
import { TiTick } from "react-icons/ti";
import { IoIosWarning } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaTrophy } from "react-icons/fa";
import { HiMiniChartBar } from "react-icons/hi2";
import { FaRegLightbulb } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Result = () => {

    const location = useLocation();
    const [evaluation, setEvaluation] = useState(null);
    const [feedback, setFeedback] = useState();
    console.log(evaluation);
    const { questions, answers, jobTitle } = location.state || {};

    useEffect(() => {

        const evaluateInterview = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.post(
                    "https://prepwise-ai-backend-0ttv.onrender.com/evaluate-interview",
                    {
                        questions,
                        answers,
                        jobTitle
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const parsedData = JSON.parse(response.data.feedback);

                setEvaluation(parsedData);

            } catch (error) {
                console.log(error);
            }
        };

        evaluateInterview();

    }, []);

    console.log("Location State:", location.state);
    console.log("Questions:", questions);
    console.log("Answers:", answers);

    const score = evaluation?.score || 0;

    let performanceText = "";
    let performanceColor = "";

    if (score >= 80) {
        performanceText = "Excellent Performance";
        performanceColor = "text-green-600";
    } else if (score >= 60) {
        performanceText = "Good Performance ";
        performanceColor = "text-blue-600";
    } else if (score >= 40) {
        performanceText = "Average Performance ";
        performanceColor = "text-yellow-600";
    } else {
        performanceText = "Needs Improvement ";
        performanceColor = "text-red-600";
    }



    return (
        <div className="min-h-screen bg-gray-100 py-8 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="text-center mb-10">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Interview Results
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Here's your AI interview performance summary.
                    </p>

                </div>

                {/* Score Card */}

                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 font-medium">
                                Overall Score
                            </p>

                            <h1 className="text-6xl font-bold text-blue-600 mt-3">
                                {evaluation?.score || 0}<span className="text-3xl text-gray-500">/100</span>
                            </h1>

                            <p className={`${performanceColor} font-semibold mt-4 text-lg`}>
                                {performanceText}
                            </p>

                        </div>

                        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">

                            <FaTrophy className="text-blue-600 text-6xl" />

                        </div>

                    </div>

                </div>

                {/* Stats */}

                <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">

                        <p className="text-gray-500">
                            Questions
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                            {questions?.length || 0}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">

                        <p className="text-gray-500">
                            Answered
                        </p>

                        <h2 className="text-4xl font-bold mt-3 text-blue-600">
                            {answers?.filter(answer => answer.trim() !== "").length || 0}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">

                        <p className="text-gray-500">
                            Need Improvement
                        </p>

                        <h2 className="text-4xl font-bold mt-3 text-orange-500">
                            {evaluation?.improvements?.length || 0}
                        </h2>

                    </div>

                </div>

                {/* Strength & Improvement */}

                <div className="grid lg:grid-cols-2 gap-8 mt-8">

                    <div className="bg-white rounded-2xl shadow border border-gray-200 p-7">

                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">

                            <TiTick className="text-green-600" />

                            Strengths

                        </h2>

                        <div className="space-y-4">

                            {evaluation?.strengths?.map((strength, index) => (

                                <div
                                    key={index}
                                    className="flex items-start gap-3 bg-green-50 rounded-xl p-3"
                                >

                                    <TiTick className="text-green-600 text-xl mt-1" />

                                    <p className="text-gray-700">
                                        {strength}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow border border-gray-200 p-7">

                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">

                            <IoIosWarning className="text-orange-500" />

                            Areas to Improve

                        </h2>

                        <div className="space-y-4">

                            {evaluation?.improvements?.map((improvement, index) => (

                                <div
                                    key={index}
                                    className="flex items-start gap-3 bg-orange-50 rounded-xl p-3"
                                >

                                    <IoIosWarning className="text-orange-500 text-xl mt-1" />

                                    <p className="text-gray-700">
                                        {improvement}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* AI Feedback */}

                <div className="bg-white rounded-2xl shadow border border-gray-200 p-8 mt-8">

                    <h2 className="text-2xl font-bold flex items-center gap-2">

                        <FaRegLightbulb className="text-yellow-500" />

                        AI Feedback

                    </h2>

                    <p className="text-gray-600 leading-8 mt-5">

                        {evaluation?.feedback}

                    </p>

                </div>

                {/* Interview Review */}

                <div className="bg-white rounded-2xl shadow border border-gray-200 p-8 mt-8">

                    <h2 className="text-2xl font-bold mb-8">
                        Interview Review
                    </h2>
                    {questions?.map((question, index) => (
                        <div
                            key={index}
                            className="mb-6 last:mb-0 bg-gray-50 border border-gray-200 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>

                                <h3 className="font-semibold text-gray-900 text-lg">
                                    {question}
                                </h3>
                            </div>

                            <div className="ml-13">
                                <p className="text-sm text-gray-500 mb-2">
                                    Your Answer
                                </p>

                                <p className="text-gray-700 leading-7 bg-white border border-gray-200 rounded-xl p-4">
                                    {answers[index]?.trim()
                                        ? answers[index]
                                        : "No answer provided."}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Buttons */}

                <div className="flex justify-center gap-5 mt-10">

                    <Link to='/startinterview'
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition cursor-pointer"
                    >
                        Take Another Interview
                    </Link>

                    <Link to='/dashboard'
                        className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold shadow-sm transition cursor-pointer"
                    >
                        Back to Dashboard
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Result