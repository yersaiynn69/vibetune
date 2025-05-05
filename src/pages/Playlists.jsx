import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Playlists = () => {
  return (
    <div className="flex flex-col h-screen">
      <Topbar username="Listener" />
      <div className="flex flex-1">
        <Sidebar role="listener" />
        <div className="flex-1 bg-white p-8">
          <h2 className="text-2xl font-bold mb-4">📀 Playlists</h2>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
