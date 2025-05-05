import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const MyMusics = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const q = query(
          collection(db, "tracks"),
          where("uploadedBy", "==", auth.currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setTracks(data);
      } catch (error) {
        console.error("Ошибка загрузки треков:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Topbar username="Музыкант" />
      <div className="flex flex-1">
        <Sidebar role="musician" />
        <div className="flex-1 bg-white p-8">
          <h2 className="text-2xl font-bold mb-4">🎵 Мои загруженные треки</h2>

          {loading ? (
            <p>Загрузка...</p>
          ) : tracks.length === 0 ? (
            <p>У тебя пока нет загруженных треков.</p>
          ) : (
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 border p-4 rounded shadow"
                >
                  <img
                    src={track.cover || "https://placehold.co/60x60?text=🎵"}
                    alt="cover"
                    className="w-14 h-14 rounded"
                  />
                  <div>
                    <p className="font-semibold">{track.title}</p>
                    <p className="text-sm text-gray-500">
                      {track.artist} — {track.genre}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMusics;
