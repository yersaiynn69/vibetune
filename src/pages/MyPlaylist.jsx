import React, { useContext, useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { PlayerContext } from "../context/PlayerContext";

const MyPlaylist = () => {
  const { playTrack } = useContext(PlayerContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFromFavorites = (songId) => {
    const updated = favorites.filter((s) => s.id !== songId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar username="Listener" />
      <div className="flex flex-1">
        <Sidebar role="listener" />
        <div className="flex-1 bg-white p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">❤️ My Playlist</h2>

          {favorites.length === 0 ? (
            <p className="text-gray-500 text-sm">Пока что здесь пусто. Добавь треки из раздела Songs 🤍</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {favorites.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <div
                    className="flex items-center space-x-4 cursor-pointer"
                    onClick={() => playTrack(song)}
                  >
                    <img src={song.cover} alt={song.title} className="w-14 h-14 rounded" />
                    <div>
                      <p className="font-semibold">{song.title}</p>
                      <p className="text-sm text-gray-500">{song.artist} • {song.genre}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromFavorites(song.id)}
                    className="text-red-600 hover:text-red-800 text-xl"
                    title="Удалить из избранного"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPlaylist;
