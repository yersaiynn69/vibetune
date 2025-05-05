import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar = ({ role = "listener" }) => {
  const location = useLocation();

  // Определим базовый префикс
  const base = role === "musician" ? "/musician" : "/listener";

  return (
    <div className="w-64 bg-white border-r p-6 flex flex-col">
      <h1 className="text-2xl font-semibold mb-6">Music</h1>
      <nav className="flex flex-col space-y-3">
        <a
          href={`${base}`}
          className={`flex items-center space-x-3 font-semibold ${
            location.pathname === base ? "text-black" : "text-gray-600"
          }`}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>

        <a
          href={`${base}/my-music`}
          className={`flex items-center space-x-3 font-semibold ${
            location.pathname.includes("my-music") ? "text-black" : "text-gray-600"
          }`}
        >
          <i className="fas fa-music"></i>
          <span>My Musics</span>
        </a>

        <a
          href={`${base}/analytics`}
          className={`flex items-center space-x-3 font-semibold ${
            location.pathname.includes("analytics") ? "text-black" : "text-gray-600"
          }`}
        >
          <i className="fas fa-chart-line"></i>
          <span>Analytics</span>
        </a>

        <a
          href={`${base}/charts`}
          className={`flex items-center space-x-3 font-semibold ${
            location.pathname.includes("charts") ? "text-black" : "text-gray-600"
          }`}
        >
          <i className="fas fa-trophy"></i>
          <span>Charts</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
