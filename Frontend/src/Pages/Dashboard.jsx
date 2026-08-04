import React, { useEffect, useState } from 'react'
import Slidebar from '../Components/Slidebar'
import Topbar from '../Components/Topbar'
import Welcome from '../Components/Welcome'
import Cards from '../Components/Cards'
import RecentInt from '../Components/RecentInt'
import axios from 'axios';
import { useTheme } from '../Components/ThemeContext'


const Dashboard = () => {

  const [user, setUser] = useState(null);
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        console.log(response.data);
        setUser(response.data.user);

      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchProfile();
  }, []);

  console.log(user);

  return (
    <div
      className={`flex pb-10 ${darkMode
        ? "bg-slate-900"
        : "bg-slate-100"
        }`}
    >
      <div className='flex '>
        <Slidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div
        className={`flex-1 ml-0 lg:ml-70 min-h-screen ${darkMode
          ? "bg-slate-900"
          : "bg-slate-100"
          }`}
      >
        <Topbar setSidebarOpen={setSidebarOpen} user={user} />
        <Welcome user={user} />
        <Cards />
        <RecentInt />
      </div>

    </div>
  )
}

export default Dashboard
