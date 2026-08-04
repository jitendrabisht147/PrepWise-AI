import React, { useState } from "react";
import axios from "axios";

const PracticeQuestions = () => {
    const [formData, setFormData] = useState({
        skill: "React",
        difficulty: "Easy",
        numberOfQuestions: "5",
    });

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const generateQuestions = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "https://prepwise-ai-backend-0ttv.onrender.com/generate-questions",
                {
                    jobTitle: "Practice Session",
                    experience: "Fresher",
                    skill: formData.skill,
                    difficulty: formData.difficulty,
                    numberOfQuestions: formData.numberOfQuestions,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const questionsArray = response.data.questions
                .split("\n")
                .filter((question) => question.trim() !== "");

            setQuestions(questionsArray);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-100 min-h-screen py-10">

            <div className="max-w-5xl mx-auto px-6">

                <h1 className="text-4xl font-bold text-slate-900">
                    Practice Questions
                </h1>

                <p className="text-slate-500 mt-2">
                    Practice interview questions without AI evaluation.
                </p>

                <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">
                                Skill
                            </label>

                            <select
                                name="skill"
                                value={formData.skill}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option>React</option>
                                <option>JavaScript</option>
                                <option>HTML</option>
                                <option>CSS</option>
                                <option>Node js</option>
                                <option>Mongo DB</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">
                                Difficulty
                            </label>

                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">
                                Number of Questions
                            </label>

                            <select
                                name="numberOfQuestions"
                                value={formData.numberOfQuestions}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option>2</option>
                                <option>5</option>
                                <option>10</option>
                            </select>
                        </div>

                    </div>

                    <button
                        onClick={generateQuestions}
                        disabled={loading}
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:bg-blue-400"
                    >
                        {loading ? "Generating..." : "Generate Questions"}
                    </button>

                </div>

                {questions.length > 0 && (

                    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            Practice Questions
                        </h2>

                        <div className="space-y-5">

                            {questions.map((question, index) => (

                                <div
                                    key={index}
                                    className="border-b border-slate-200 pb-5"
                                >
                                    <h3 className="font-semibold text-blue-600 mb-2">
                                        Question {index + 1}
                                    </h3>

                                    <p className="text-slate-700">
                                        {question}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default PracticeQuestions;