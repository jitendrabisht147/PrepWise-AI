import React from 'react';
import { IoIosNotifications } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from './ThemeContext';
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Topbar = ({ user, setSidebarOpen }) => {

    const { darkMode, toggleTheme } = useTheme();

    return (
        <div
            className={`fixed top-0 right-0 w-full lg:w-[calc(100%-17.5rem)] h-20 shadow-md transition-all duration-300 z-40 ${darkMode
                ? "bg-slate-950  border-slate-800"
                : "bg-white  border-slate-200"
                }`}
        >

            <div className="flex items-center justify-end  px-6 w-full h-full">

                {/* Search */}

                <div className="flex items-center  gap-10">

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className={`lg:hidden text-3xl cursor-pointer ${darkMode ? "text-white" : "text-slate-800"
                            }`}
                    >
                        <HiOutlineMenuAlt3 />
                    </button>
                  
                    {/* Icons */}
                    <div className="flex items-center  gap-10">



                        <span
                            className={`flex items-center px-2 py-1 rounded-xl transition ${darkMode
                                ? "bg-slate-800 hover:bg-slate-700"
                                : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >

                            <button
                                onClick={toggleTheme}
                                className={`text-2xl transition cursor-pointer ${darkMode
                                    ? "text-yellow-400"
                                    : "text-slate-600 hover:text-slate-900"
                                    }`}
                            >
                                {darkMode ? <MdSunny /> : <IoMoon />}
                            </button>

                        </span>

                    </div>

                    {/* User */}

                    <div className="flex items-center justify-end  gap-5">

                        <p
                            className={`text-2xl font-bold ${darkMode
                                ? "text-white"
                                : "text-slate-800"
                                }`}
                        >
                            {user?.name}
                        </p>

                        <Link
                            to="/profile"
                            className={`text-2xl transition ${darkMode
                                ? "text-slate-300 hover:text-white"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            <IoPerson />
                        </Link>

                    </div>

                </div>

            </div>
            </div>
            );
};

            export default Topbar;