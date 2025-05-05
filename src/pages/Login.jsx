import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("🟢 Попытка входа...");

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("✅ Вход выполнен:", user.uid);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        console.log("🧾 Роль пользователя:", data.role);

        if (data.role === "musician") {
          navigate("/musician");
        } else {
          navigate("/listener");
        }
      } else {
        console.warn("⚠️ Пользователь не найден в Firestore");
        alert("Аккаунт не зарегистрирован правильно.");
      }
    } catch (error) {
      console.error("❌ Ошибка входа:", error.message);
      alert("Ошибка входа: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
        >
          Войти
        </button>

        <p className="text-sm text-center">
          Нет аккаунта? <a href="/register" className="text-red-600">Зарегистрируйтесь</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
