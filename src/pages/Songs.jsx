import React, { useContext, useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { PlayerContext } from "../context/PlayerContext";

const songsData = [
  {
    id: 1,
    title: "On & On",
    artist: "Cartoon, Daniel Levi",
    genre: "EDM",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Cartoon/On__On_feat_Daniel_Levi/Cartoon_-_On__On_feat_Daniel_Levi.mp3",
    cover: "https://i1.sndcdn.com/artworks-000123123456-4j9fne-t500x500.jpg"
  },
  {
    id: 2,
    title: "Sky High",
    artist: "Elektronomia",
    genre: "Electro",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Elektronomia/Sky_High/Elektronomia_-_Sky_High.mp3",
    cover: "https://i1.sndcdn.com/artworks-000144845004-qn5kt1-t500x500.jpg"
  },
  {
    id: 3,
    title: "Dreams",
    artist: "Joakim Karud",
    genre: "Chill",
    url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Joakim_Karud/Dreams/Joakim_Karud_-_Dreams.mp3",
    cover: "https://i1.sndcdn.com/artworks-000345345678-kj8f34-t500x500.jpg"
  }
];

const Songs = () => {
  const { playTrack } = useContext(PlayerContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (song) => {
    const isFav = favorites.find((s) => s.id === song.id);
    let updated;
    if (isFav) {
      updated = favorites.filter((s) => s.id !== song.id);
    } else {
      updated = [...favorites, song];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (song) => {
    return favorites.some((s) => s.id === song.id);
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar username="Listener" />
      <div className="flex flex-1">
        <Sidebar role="listener" />
        <div className="flex-1 bg-white p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">🎵 Songs</h2>
          <div className="grid grid-cols-1 gap-4">
            {songsData.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4 cursor-pointer" onClick={() => playTrack(song)}>
                  <img src={song.cover} alt={song.title} className="w-14 h-14 rounded" />
                  <div>
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-sm text-gray-500">{song.artist} • {song.genre}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(song)}
                  className="text-red-600 hover:text-red-800 text-xl"
                  title={isFavorite(song) ? "Удалить из избранного" : "Добавить в избранное"}
                >
                  {isFavorite(song) ? "❤️" : "🤍"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songs;
