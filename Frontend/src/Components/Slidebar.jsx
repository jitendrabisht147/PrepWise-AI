import React from "react";
import {
    IoHome,
    IoBook,
    IoPerson,
    IoLogOut,
    IoStatsChartSharp
} from "react-icons/io5";
import { GiMicrophone } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { IoClose } from "react-icons/io5";

const Slidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const navClass = ({ isActive }) =>
        `mx-3 flex items-center gap-4 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${isActive
            ? "bg-blue-600 text-white shadow-lg"
            : darkMode
                ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <div
            className={`fixed top-0 left-0 h-screen w-70 border-r z-50 transform transition-transform duration-300

        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0
        ${darkMode
                    ? "bg-slate-950 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
        >
            <button
    onClick={() => setSidebarOpen(false)}
    className={`absolute top-5 right-5 lg:hidden text-3xl ${
        darkMode ? "text-white" : "text-slate-800"
    }`}
>
    <IoClose />
</button>``
            <div className="flex flex-col justify-between h-full py-8">

                

                {/* Logo */}

                <div>

                    <h1
                        className={`text-3xl font-bold px-8 ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        PrepWise AI
                    </h1>

                    {/* Navigation */}

                    <div className="flex flex-col gap-2 mt-12">

                        <NavLink
                            to="/dashboard"
                            className={navClass}
                        >
                            <IoHome className="text-xl" />
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/startinterview"
                            className={navClass}
                        >
                            <GiMicrophone className="text-xl" />
                            Start Interview
                        </NavLink>

                        <NavLink
                            to="/practicequestions"
                            className={navClass}
                        >
                            <IoBook className="text-xl" />
                            Practice Questions
                        </NavLink>

                        <NavLink
                            to="/interviewhistory"
                            className={navClass}
                        >
                            <FaHistory className="text-xl" />
                            Interview History
                        </NavLink>

                        <NavLink
                            to="/dashresults"
                            className={navClass}
                        >
                            <IoStatsChartSharp className="text-xl" />
                            Results
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={navClass}
                        >
                            <IoPerson className="text-xl" />
                            Profile
                        </NavLink>

                    </div>

                </div>

                {/* Logout */}

                <div className="px-3">

                    <button
                        onClick={handleLogout}
                        className="w-full flex justify-center items-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
                    >
                        <IoLogOut className="text-xl" />
                        Logout
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Slidebar;