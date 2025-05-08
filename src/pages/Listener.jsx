import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

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

        {/* Основной контент с размытием */}
        <div className="flex-1 bg-gradient-to-br from-[#1e1e2f] via-[#2e2e4f] to-[#1e1e2f] overflow-y-auto p-8 font-sans text-white">
          <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 shadow-md">
            <h2 className="text-3xl font-bold mb-6">🎧 Сіздің ұсынылған тректеріңіз</h2>

            {/* Рекомендованные карточки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map((_, index) => (
                <div
                  key={index}
                  onClick={() => playTrack(demoTrack)}
                  className="bg-white/5 hover:bg-white/10 transition rounded-xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <img src="https://placehold.co/600x300" className="w-full object-cover" />
                  <div className="p-4">
                    <h4 className="text-sm text-gray-300">Mood-based selection</h4>
                    <h3 className="text-xl font-semibold">Lo-Fi Beats Vol. {index + 1}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Самые популярные треки */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-4">🔥 Ең жиі тыңдалатын тректер</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    onClick={() => playTrack(demoTrack)}
                    className="flex items-center space-x-4 bg-white/5 hover:bg-white/10 transition p-3 rounded-lg cursor-pointer"
                  >
                    <img
                      src="https://placehold.co/50x50"
                      className="w-12 h-12 rounded"
                      alt="cover"
                    />
                    <div>
                      <p className="text-md font-semibold">Dreaming</p>
                      <p className="text-sm text-gray-400">Artist One</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listener;
