import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar"; // 👈 импортим Sidebar для слушателя

const Listener = () => {
  const { playTrack } = useContext(PlayerContext);

  const demoTrack = {
    title: "Dreaming",
    artist: "Artist One",
    album: "Lo-Fi Nights",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://placehold.co/60x60/111111/FFFFFF?text=🎵",
    preview: true,
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <Topbar username="Listener" />

      <div className="flex flex-1">
        {/* Sidebar для слушателя */}
        <Sidebar role="listener" />

        {/* Основной контент */}
        <div className="flex-1 bg-white overflow-y-auto p-8">
          <h2 className="text-2xl font-bold mb-4">🎧 Your Recommended Songs</h2>

          <div className="grid grid-cols-2 gap-6">
            <div
              className="bg-black text-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => playTrack(demoTrack)}
            >
              <img src="https://placehold.co/600x300" className="w-full" />
              <div className="p-4">
                <h4 className="text-gray-400 text-xs">Based on your mood</h4>
                <h3 className="text-xl font-semibold">Lo-Fi Beats</h3>
              </div>
            </div>

            <div className="bg-blue-500 text-white rounded-xl overflow-hidden shadow-lg">
              <img src="https://placehold.co/600x300" className="w-full" />
              <div className="p-4">
                <h4 className="text-white text-xs">Curated just for you</h4>
                <h3 className="text-xl font-semibold">Fresh Vibes</h3>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">🔥 Most Played</h3>

            <div className="grid grid-cols-3 gap-4">
              <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => playTrack(demoTrack)}
              >
                <img src="https://placehold.co/50x50" className="w-12 h-12 rounded" />
                <div>
                  <p className="text-sm font-semibold">Dreaming</p>
                  <p className="text-sm text-gray-500">Artist One</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <img src="https://placehold.co/50x50" className="w-12 h-12 rounded" />
                <div>
                  <p className="text-sm font-semibold">Lights On</p>
                  <p className="text-sm text-gray-500">Artist Two</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <img src="https://placehold.co/50x50" className="w-12 h-12 rounded" />
                <div>
                  <p className="text-sm font-semibold">Skyline</p>
                  <p className="text-sm text-gray-500">Artist Three</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listener;
