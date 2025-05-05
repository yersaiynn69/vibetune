import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const Topbar = ({ username }) => {
  const { currentTrack, isPlaying, togglePlay, audioRef } = useContext(PlayerContext);
  const [volume, setVolume] = useState(0.7);
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
    <div className="w-full bg-white border-b px-6 py-3 flex items-center justify-between shadow z-50">
      {/* Лого */}
      <div className="text-2xl font-bold text-red-600 whitespace-nowrap">VibeTunes</div>

      {/* Центр — плеер */}
      {currentTrack ? (
        <div className="flex flex-col items-center w-full max-w-2xl mx-4">
          {/* Трекбар */}
          <div className="flex items-center space-x-2 w-full text-xs text-gray-500 mb-1">
            <span className="w-10 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-red-600"
            />
            <span className="w-10">{formatTime(duration)}</span>
          </div>

          {/* Контролы + инфо */}
          <div className="flex items-center space-x-4">
            {/* Кнопки */}
            <div className="flex items-center space-x-2 text-xl text-gray-700">
              <button>🔀</button>
              <button>⏮</button>
              <button onClick={togglePlay}>
                {isPlaying ? "⏸️" : "▶️"}
              </button>
              <button>⏭</button>
              <button>🔁</button>
            </div>

            {/* Инфо о треке */}
            <div className="flex items-center space-x-3 bg-gray-100 px-3 py-1 rounded">
              <img
                src={currentTrack.cover || "https://placehold.co/40x40"}
                className="w-10 h-10 rounded"
                alt="cover"
              />
              <div className="flex flex-col overflow-hidden max-w-[200px]">
                <span className="font-semibold text-sm truncate">{currentTrack.title}</span>
                <span className="text-xs text-gray-500 truncate">
                  {currentTrack.artist} {currentTrack.album ? `— ${currentTrack.album}` : ""}
                </span>
              </div>
              {currentTrack.preview && (
                <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded">PREVIEW</span>
              )}
              <audio
                src={currentTrack.url}
                ref={audioRef}
                autoPlay
                onEnded={() => console.log("Трек завершён")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 text-center w-full">Нет трека для воспроизведения</div>
      )}

      {/* Громкость и ник */}
      <div className="flex items-center space-x-3 whitespace-nowrap">
        <div className="flex items-center space-x-2 w-24">
          <span>🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-red-600"
          />
        </div>
        <div className="text-sm font-semibold text-gray-700">{username}</div>
      </div>
    </div>
  );
};

export default Topbar;
