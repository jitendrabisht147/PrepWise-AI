import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "https://prepwise-ai-backend-0ttv.onrender.com/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data.user); setUser(response.data.user);
                setStats(response.data.stats);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return (
            <div className="bg-slate-100 min-h-screen flex justify-center items-center">
                <h1 className="text-2xl font-bold">Loading Profile...</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Profile
                    </h1>

        
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-8 p-10">

                    <div className="flex items-center gap-8">

                        <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold">
                            {user.name
                                .split(" ")
                                .map((word) => word.charAt(0).toUpperCase())
                                .join("")}
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">
                                {user.name}
                            </h2>

                            <p className="text-slate-500 mt-2 text-lg">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    {/* Statistics */}
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-5 mt-10">

                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
                            <p className="text-slate-500 text-sm">
                                Total Interviews
                            </p>

                            <h3 className="text-3xl font-bold mt-2">
                                {stats?.totalInterviews}
                            </h3>
                        </div>

                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
                            <p className="text-slate-500 text-sm">
                                Average Score
                            </p>

                            <h3 className="text-3xl font-bold mt-2">
                                {stats?.averageScore}%
                            </h3>
                        </div>

                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
                            <p className="text-slate-500 text-sm">
                                Highest Score
                            </p>

                            <h3 className="text-3xl font-bold mt-2">
                                {stats?.highestScore}%
                            </h3>
                        </div>

                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
                            <p className="text-slate-500 text-sm">
                                Questions Practiced
                            </p>

                            <h3 className="text-3xl font-bold mt-2">
                                {stats?.questionsPracticed}
                            </h3>
                        </div>

                    </div>

                </div>

                {/* Account Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-8 p-8">

                    <h2 className="text-2xl font-bold text-slate-900">
                        Account Information
                    </h2>

                    <div className="border-t border-slate-200 mt-6 pt-6 space-y-6">

                        <div>
                            <p className="text-sm text-slate-500">
                                Full Name
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-1">
                                {user.name}
                            </h3>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Email Address
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-1">
                                {user.email}
                            </h3>
                        </div>

                    </div>

                </div>

                {/* Logout Button */}
                <div className="mt-8">

                    <button
                        onClick={handleLogout}
                        className="px-8 py-3 border border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                        Logout
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Profile;