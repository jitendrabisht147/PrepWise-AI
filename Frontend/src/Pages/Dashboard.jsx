import React, { useEffect, useState } from 'react';
import Slidebar from '../Components/Slidebar';
import Topbar from '../Components/Topbar';
import Welcome from '../Components/Welcome';
import Cards from '../Components/Cards';
import RecentInt from '../Components/RecentInt';
import axios from 'axios';
import { useTheme } from '../Components/ThemeContext';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

        setUser(response.data.user);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Sidebar Navigation */}
      <Slidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-0 lg:ml-72 min-h-screen flex flex-col transition-all duration-300">
        {/* Top Header Bar */}
        <Topbar
          setSidebarOpen={setSidebarOpen}
          user={user}
          onSearch={(query) => setSearchQuery(query)}
        />

        {/* Dashboard Sections */}
        <main className="flex-1 pb-12">
          <Welcome user={user} />
          <Cards />
          <RecentInt searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;