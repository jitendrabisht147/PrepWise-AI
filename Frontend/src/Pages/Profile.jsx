import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../Components/ThemeContext";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaChartLine, 
  FaCheckCircle, 
  FaTrophy, 
  FaSignOutAlt,
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaTimes,
  FaCheck
} from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit State Management
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const response = await axios.get(
          "https://prepwise-ai-backend-0ttv.onrender.com/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data.user;
        setUser(userData);
        setName(userData?.name || "");
        setPhone(userData?.phone || "");
        setLocation(userData?.location || "");
        setStats(response.data.stats);
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://prepwise-ai-backend-0ttv.onrender.com/profile",
        { 
          name: name.trim(),
          phone: phone.trim(),
          location: location.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user || { 
        ...user, 
        name: name.trim(), 
        phone: phone.trim(), 
        location: location.trim() 
      };

      setUser(updatedUser);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully." });

      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile. Try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (nameStr) => {
    if (!nameStr) return "U";
    return nameStr
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* Clean Modern Topbar */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
          darkMode
            ? "bg-slate-950/80 border-slate-800"
            : "bg-white/80 border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Brand + Back Route */}
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-base shadow-sm shadow-purple-500/30 group-hover:bg-purple-700 transition">
                P
              </div>
              <span className="text-xl font-bold tracking-tight">
                PrepWise <span className="text-purple-600 dark:text-purple-400">AI</span>
              </span>
            </Link>

            <span className="hidden sm:block h-5 w-px bg-slate-200 dark:bg-slate-800" />

            <button
              onClick={() => navigate("/dashboard")}
              className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                darkMode
                  ? "text-slate-400 hover:text-white hover:bg-slate-900"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className={`sm:hidden p-2.5 rounded-xl border text-sm transition ${
                darkMode ? "border-slate-800 text-slate-300" : "border-slate-200 text-slate-600"
              }`}
              title="Dashboard"
            >
              <FaArrowLeft />
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border text-lg transition cursor-pointer ${
                darkMode
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                  : "bg-white border-slate-200 text-purple-600 hover:bg-slate-100 shadow-xs"
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <MdSunny /> : <IoMoon />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Feedback Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl border text-sm font-medium flex items-center justify-between ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {message.type === "success" ? <FaCheck /> : <FaTimes />}
              <span>{message.text}</span>
            </div>
            <button onClick={() => setMessage({ type: "", text: "" })} className="cursor-pointer">
              <FaTimes className="text-xs opacity-70 hover:opacity-100" />
            </button>
          </div>
        )}

        {loading ? (
          /* Loading Placeholder */
          <div className="space-y-6 animate-pulse">
            <div className={`h-40 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`} />
            <div className={`h-32 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`} />
            <div className={`h-64 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* User Profile Overview Card */}
            <div
              className={`rounded-2xl border p-6 sm:p-8 transition ${
                darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-purple-600/20 shrink-0">
                    {getInitials(user?.name)}
                  </div>

                  {/* Identity */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      <h1 className="text-2xl font-bold tracking-tight">
                        {user?.name || "Candidate"}
                      </h1>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        Candidate Account
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-2">
                      <FaEnvelope className="text-xs" />
                      <span>{user?.email}</span>
                    </p>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setName(user?.name || "");
                      setPhone(user?.phone || "");
                      setLocation(user?.location || "");
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition cursor-pointer shadow-sm shadow-purple-600/20"
                  >
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* Preparation Stats Grid */}
            <div>
              <h2 className="text-base font-semibold text-slate-500 dark:text-slate-400 mb-3 px-1">
                Interview Performance
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  className={`p-5 rounded-2xl border transition ${
                    darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Interviews</span>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm">
                      <GiMicrophone />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{stats?.totalInterviews || 0}</div>
                </div>

                <div
                  className={`p-5 rounded-2xl border transition ${
                    darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Average Score</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">
                      <FaChartLine />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{stats?.averageScore || 0}%</div>
                </div>

                <div
                  className={`p-5 rounded-2xl border transition ${
                    darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Highest Score</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm">
                      <FaTrophy />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-amber-500 dark:text-amber-400">
                    {stats?.highestScore || 0}%
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border transition ${
                    darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Questions Done</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">
                      <FaCheckCircle />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{stats?.questionsPracticed || 0}</div>
                </div>
              </div>
            </div>

            {/* Personal Details & Editable Form */}
            <div
              className={`rounded-2xl border p-6 sm:p-8 transition ${
                darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
              }`}
            >
              <h2 className="text-lg font-bold tracking-tight mb-6">
                Personal Information
              </h2>

              {isEditing ? (
                /* Editable Form */
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                        Full Name
                      </label>
                      <div
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition ${
                          darkMode
                            ? "bg-slate-950 border-slate-800 focus-within:border-purple-500 text-white"
                            : "bg-slate-50 border-slate-200 focus-within:border-purple-600 focus-within:bg-white text-slate-900"
                        }`}
                      >
                        <FaUser className="text-slate-400 text-sm shrink-0" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                          className="bg-transparent border-none outline-none w-full text-sm font-medium"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <div
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition ${
                          darkMode
                            ? "bg-slate-950 border-slate-800 focus-within:border-purple-500 text-white"
                            : "bg-slate-50 border-slate-200 focus-within:border-purple-600 focus-within:bg-white text-slate-900"
                        }`}
                      >
                        <FaPhone className="text-slate-400 text-sm shrink-0" />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="bg-transparent border-none outline-none w-full text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                        Location
                      </label>
                      <div
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition ${
                          darkMode
                            ? "bg-slate-950 border-slate-800 focus-within:border-purple-500 text-white"
                            : "bg-slate-50 border-slate-200 focus-within:border-purple-600 focus-within:bg-white text-slate-900"
                        }`}
                      >
                        <FaMapMarkerAlt className="text-slate-400 text-sm shrink-0" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. San Francisco, CA"
                          className="bg-transparent border-none outline-none w-full text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <div
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border opacity-70 cursor-not-allowed ${
                          darkMode ? "bg-slate-950/60 border-slate-800" : "bg-slate-100 border-slate-200"
                        }`}
                      >
                        <FaEnvelope className="text-slate-400 text-sm shrink-0" />
                        <input
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-400 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition cursor-pointer disabled:opacity-50"
                    >
                      <FaSave />
                      <span>{saving ? "Saving..." : "Save Changes"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setName(user?.name || "");
                        setPhone(user?.phone || "");
                        setLocation(user?.location || "");
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border transition cursor-pointer ${
                        darkMode
                          ? "border-slate-800 hover:bg-slate-800 text-slate-300"
                          : "border-slate-200 hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      <FaTimes />
                      <span>Cancel</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Read-Only Details */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-xl border flex items-center gap-4 ${
                      darkMode ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50 border-slate-200/70"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <FaUser />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Full Name</p>
                      <p className="text-sm font-semibold mt-0.5">{user?.name || "Not provided"}</p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl border flex items-center gap-4 ${
                      darkMode ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50 border-slate-200/70"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Email Address</p>
                      <p className="text-sm font-semibold mt-0.5">{user?.email || "Not provided"}</p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl border flex items-center gap-4 ${
                      darkMode ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50 border-slate-200/70"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Phone</p>
                      <p className="text-sm font-semibold mt-0.5">{user?.phone || "Not provided"}</p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl border flex items-center gap-4 ${
                      darkMode ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50 border-slate-200/70"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Location</p>
                      <p className="text-sm font-semibold mt-0.5">{user?.location || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Action Bar */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 border border-red-500/20 transition cursor-pointer"
              >
                <FaSignOutAlt />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;