import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { FiLogOut } from "react-icons/fi";
import {
  FaMusic,
  FaHome,
  FaChartBar,
  FaHeart,
  FaUpload,
  FaListAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        setUser(userData);
        const userRef = doc(db, "users", userData.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      } else {
        setUser(null);
        setRole("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = {
    listener: [
      { path: "/listener", label: "Home", icon: <FaHome /> },
      { path: "/listener/playlists", label: "Playlists", icon: <FaListAlt /> },
      { path: "/listener/favorites", label: "My Playlist", icon: <FaHeart /> },
      { path: "/listener/songs", label: "Songs", icon: <FaMusic /> },
      { path: "/listener/charts", label: "Charts", icon: <FaChartBar /> },
    ],
    musician: [
      { path: "/musician", label: "Home", icon: <FaHome /> },
      { path: "/musician/my-music", label: "My Musics", icon: <FaMusic /> },
      { path: "/musician/analytics", label: "Analytics", icon: <FaChartBar /> },
      { path: "/musician/upload", label: "Upload", icon: <FaUpload /> },
    ],
  };

  const links = role && navItems[role];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#c1f5ff] via-[#d8c6ff] to-[#f7c8ff] p-6 shadow-xl text-gray-800 font-inter">
      <h1 className="text-3xl font-bold mb-8 tracking-wide text-center">VibeTunes</h1>

      {user && role && (
        <>
          <div className="mb-6 text-center">
            <p className="text-lg font-medium">👤 {user.email}</p>
            <p className="text-sm italic text-gray-600 capitalize">{role}</p>
          </div>

          <nav className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white hover:text-black transition ${
                  isActive(link.path) ? "bg-white text-black font-semibold" : ""
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-10 flex items-center gap-2 px-4 py-2 rounded-md bg-white text-red-600 hover:bg-red-100 transition w-full"
          >
            <FiLogOut /> Sign Out
          </button>
        </>
      )}
    </div>
  );
}
