import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Контексты
import { PlayerProvider } from "./context/PlayerContext";

// Страницы
import Home from "./pages/Home"; // Главная (лендинг)
import Login from "./pages/Login";
import Register from "./pages/Register";

// Слушатель
import Listener from "./pages/Listener";
import Playlists from "./pages/Playlists";
import Charts from "./pages/Charts";
import MyPlaylist from "./pages/MyPlaylist";
import Songs from "./pages/Songs";

// Музыкант
import Musician from "./pages/Musician";
import MyMusics from "./pages/MyMusics";
import Analytics from "./pages/Analytics";
import MusicianCharts from "./pages/MusicianCharts"; // если будет отдельный файл

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          {/* Лэндинг */}
          <Route path="/" element={<Home />} />

          {/* Аутентификация */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Слушатель */}
          <Route path="/listener" element={<Listener />} />
          <Route path="/listener/playlists" element={<Playlists />} />
          <Route path="/listener/charts" element={<Charts />} />
          <Route path="/listener/favorites" element={<MyPlaylist />} />
          <Route path="/listener/songs" element={<Songs />} />

          {/* Музыкант */}
          <Route path="/musician" element={<Musician />} />
          <Route path="/musician/my-music" element={<MyMusics />} />
          <Route path="/musician/analytics" element={<Analytics />} />
          <Route path="/musician/charts" element={<MusicianCharts />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  </React.StrictMode>
);
