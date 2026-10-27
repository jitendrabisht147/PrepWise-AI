import React from "react";
import {
  IoHomeOutline,
  IoHome,
  IoBookOutline,
  IoBook,
  IoPersonOutline,
  IoPerson,
  IoLogOutOutline,
  IoStatsChartOutline,
  IoStatsChart,
  IoClose
} from "react-icons/io5";
import { GiMicrophone } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const Slidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <IoHomeOutline className="text-2xl" />,
      activeIcon: <IoHome className="text-2xl" />,
    },
    {
      path: "/startinterview",
      label: "Start Interview",
      icon: <GiMicrophone className="text-2xl" />,
      activeIcon: <GiMicrophone className="text-2xl" />,
    },
    {
      path: "/practicequestions",
      label: "Practice Questions",
      icon: <IoBookOutline className="text-2xl" />,
      activeIcon: <IoBook className="text-2xl" />,
    },
    {
      path: "/interviewhistory",
      label: "Interview History",
      icon: <FaHistory className="text-xl" />,
      activeIcon: <FaHistory className="text-xl" />,
    },
    {
      path: "/dashresults",
      label: "Results",
      icon: <IoStatsChartOutline className="text-2xl" />,
      activeIcon: <IoStatsChart className="text-2xl" />,
    },
    {
      path: "/profile",
      label: "Profile",
      icon: <IoPersonOutline className="text-2xl" />,
      activeIcon: <IoPerson className="text-2xl" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-white text-slate-900 shadow-xl shadow-slate-200/50"
        }`}
      >
        <div>
          {/* Header & Logo Area */}
          <div className="h-24 px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
             
              <h1 className="text-2xl font-black tracking-tight">
                PrepWise <span className="text-purple-600 dark:text-purple-400">AI</span>
              </h1>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden p-2 rounded-xl text-2xl transition ${
                darkMode
                  ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <IoClose />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="px-4 py-4">
            <p className="px-4 mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </p>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-purple-600 text-white shadow-xl shadow-purple-600/30 dark:shadow-none"
                        : darkMode
                        ? "text-slate-300 hover:bg-slate-900 hover:text-white"
                        : "text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{isActive ? item.activeIcon : item.icon}</span>
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Logout Section */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-2xl font-bold text-base transition duration-200 cursor-pointer ${
              darkMode
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "bg-red-50 text-red-600 hover:bg-red-100"
            }`}
          >
            <IoLogOutOutline className="text-2xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Slidebar;