import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Musician = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("Музыкант");

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.role !== "musician") {
            navigate("/listener"); // Если не музыкант, перекидываем к слушателю
          } else {
            setNickname(userData.nickname || "Музыкант");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <Topbar username={nickname} />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar для музыканта */}
        <Sidebar role="musician" />

        {/* Контент */}
        <main className="flex-1 bg-white p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">🎤 Добро пожаловать, {nickname}</h1>

          <p className="text-gray-600 mb-4">
            Здесь ты можешь загружать свои треки, отслеживать их статистику и видеть чарты.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <a
              href="/musician/my-music"
              className="block p-6 border rounded-lg hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-semibold mb-2">🎵 Мои треки</h2>
              <p className="text-gray-500">Управление своими загруженными песнями</p>
            </a>

            <a
              href="/musician/analytics"
              className="block p-6 border rounded-lg hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-semibold mb-2">📈 Аналитика</h2>
              <p className="text-gray-500">Статистика по прослушиваниям и лайкам</p>
            </a>

            <a
              href="/musician/charts"
              className="block p-6 border rounded-lg hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-semibold mb-2">🏆 Чарты</h2>
              <p className="text-gray-500">Позиции твоих треков в рейтингах</p>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Musician;
