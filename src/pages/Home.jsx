import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6 flex flex-col">
        <h1 className="text-2xl font-semibold mb-6">Music</h1>
        <nav className="flex flex-col space-y-3">
          <a href="#" className="flex items-center space-x-3 text-black font-semibold">
            <i className="fas fa-home"></i><span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-black font-semibold">
            <i className="fas fa-newspaper"></i><span>News</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-black font-semibold">
            <i className="fas fa-broadcast-tower"></i><span>Radio</span>
          </a>
        </nav>
        <div className="mt-auto text-sm text-gray-500 space-y-2">
          <a href="#" className="block">Try Premium ↗</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* Topbar */}
        <div className="px-8 py-6 flex justify-between items-center border-b">
          <div className="text-xl font-bold">VibeTunes</div>
          <div className="text-sm">
            <Link
              to="/login"
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Playlists */}
        <div className="px-8 py-4">
          <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-black text-white rounded-xl overflow-hidden shadow-lg">
              <img src="https://placehold.co/600x300" className="w-full" />
              <div className="p-4">
                <h4 className="text-gray-400 text-xs">Updated Playlist</h4>
                <h3 className="text-xl font-semibold">Today’s Hits</h3>
              </div>
            </div>
            <div className="bg-orange-400 text-white rounded-xl overflow-hidden shadow-lg">
              <img src="https://placehold.co/600x300" className="w-full" />
              <div className="p-4">
                <h4 className="text-white text-xs">New Tracks</h4>
                <h3 className="text-xl font-semibold">New Music Daily</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Top Charts */}
        <div className="px-8 py-4">
          <h2 className="text-xl font-bold mb-4">Top Charts</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <img src="https://placehold.co/50x50" className="w-12 h-12 rounded" />
              <div>
                <p className="text-sm font-semibold">Bluebird</p>
                <p className="text-sm text-gray-500">Lana Del Rey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img src="https://placehold.co/50x50" className="w-12 h-12 rounded" />
              <div>
                <p className="text-sm font-semibold">Forever</p>
                <p className="text-sm text-gray-500">Dom Dolla</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img src="https://placehold.co/50x50" className="w-12 h-12 rounded" />
              <div>
                <p className="text-sm font-semibold">WRK</p>
                <p className="text-sm text-gray-500">JID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
