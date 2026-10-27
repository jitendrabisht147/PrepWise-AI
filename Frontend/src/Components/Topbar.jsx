import React, { useState } from 'react';
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from './ThemeContext';
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Topbar = ({ user, setSidebarOpen, onSearch }) => {
  const { darkMode, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Helper to get initials (e.g. "Jitendra Bisht" -> "JB")
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Handle Search Execution
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // If you pass a filter function from parent Dashboard component:
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e) => {
    // If user presses Enter key, redirect to history or questions page with query
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/interviewhistory?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 w-full lg:w-[calc(100%-18rem)] h-24 border-b transition-all duration-300 z-30 px-6 sm:px-8 flex items-center justify-between ${
        darkMode
          ? "bg-slate-950/90 border-slate-900 text-white"
          : "bg-white/90 border-slate-100 text-slate-900"
      }`}
    >
      {/* Left Area: Mobile Toggle & Functional Search Input */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className={`lg:hidden p-2.5 rounded-2xl text-2xl transition cursor-pointer ${
            darkMode
              ? "text-slate-300 hover:bg-slate-900 hover:text-white"
              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          }`}
          aria-label="Open sidebar"
        >
          <HiOutlineMenuAlt3 />
        </button>

        {/* Working Quick Search Input */}
        <div
          className={`hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200 w-72 lg:w-96 ${
            darkMode
              ? "bg-slate-900 text-slate-200 focus-within:ring-2 focus-within:ring-purple-500"
              : "bg-slate-100/80 text-slate-700 focus-within:ring-2 focus-within:ring-purple-600 focus-within:bg-white"
          }`}
        >
          <FaSearch className="text-slate-400 text-sm shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search interviews, topics, or history..."
            className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right Area: Theme Toggle & User Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-2xl text-xl transition-all duration-200 cursor-pointer ${
            darkMode
              ? "bg-slate-900 text-amber-400 hover:bg-slate-800"
              : "bg-slate-100 text-purple-600 hover:bg-purple-50"
          }`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <MdSunny /> : <IoMoon />}
        </button>

        {/* User Profile Link */}
        <Link
          to="/profile"
          className={`flex items-center gap-3.5 p-1.5 sm:pr-4 rounded-2xl transition duration-200 ${
            darkMode ? "hover:bg-slate-900" : "hover:bg-slate-50"
          }`}
        >
          {/* Avatar Circle */}
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-purple-600/30">
            {getInitials(user?.name)}
          </div>

          {/* Name & Role */}
          <div className="hidden sm:block text-left">
            <p
              className={`text-sm font-bold leading-tight ${
                darkMode ? "text-slate-100" : "text-slate-800"
              }`}
            >
              {user?.name || "Guest User"}
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold leading-tight mt-0.5">
              Candidate
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;