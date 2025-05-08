import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const Topbar = ({ username }) => {
  const { currentTrack, isPlaying, togglePlay, audioRef } = useContext(PlayerContext);
  const [volume, setVolume] = useState(0.6);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
      };

      const audio = audioRef.current;
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateTime);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateTime);
      };
    }
  }, [audioRef, volume]);

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 text-gray-800 px-6 py-3 flex items-center justify-between shadow-md font-sans">
      {/* Инфо о треке */}
      <div className="flex items-center space-x-4">
        <img
          src={currentTrack?.cover || "https://placehold.co/60x60"}
          alt="cover"
          className="w-14 h-14 rounded shadow"
        />
        <div className="flex flex-col max-w-[200px] overflow-hidden">
          <span className="font-semibold truncate">{currentTrack?.title || "Трек не выбран"}</span>
          <span className="text-sm text-gray-500 truncate">
            {currentTrack?.artist || "Неизвестный артист"}
          </span>
        </div>
      </div>

      {/* Контролы и полоса */}
      <div className="flex flex-col items-center w-full max-w-2xl px-6">
        {/* Кнопки */}
        <div className="flex items-center space-x-4 mb-1 text-xl">
          <button className="hover:scale-110 transition">⏮</button>
          <button
            onClick={togglePlay}
            className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-pink-700 transition"
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <button className="hover:scale-110 transition">⏭</button>
        </div>

        {/* Полоса воспроизведения */}
        <div className="flex items-center space-x-3 w-full text-xs text-gray-700">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-pink-600"
          />
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Громкость и имя */}
      <div className="flex items-center space-x-4 w-40">
        <div className="flex items-center space-x-2 w-full">
          <span className="text-lg">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-pink-600"
          />
        </div>
      </div>

      {/* Аудио */}
      {currentTrack?.url && (
        <audio
          src={currentTrack.url}
          ref={audioRef}
          autoPlay
          onEnded={() => console.log("Трек завершён")}
        />
      )}
    </div>
  );
};

export default Topbar;
