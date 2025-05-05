import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMusician, setIsMusician] = useState(false);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      console.log("🟢 Начало регистрации...");

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("✅ Пользователь зарегистрирован:", user.uid);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        role: isMusician ? "musician" : "listener",
        nickname: isMusician ? nickname : "",
      });

      console.log("✅ Данные записаны в Firestore");

      // 💥 Жёсткая задержка для стабильного перехода
      setTimeout(() => {
        console.log("➡️ Переход на /login...");
        navigate("/login");
      }, 500);
    } catch (error) {
      console.error("❌ Ошибка регистрации:", error.message);
      alert("Ошибка регистрации: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>

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

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isMusician}
            onChange={() => setIsMusician(!isMusician)}
          />
          <span>Зарегистрироваться как музыкант</span>
        </label>

        {isMusician && (
          <input
            type="text"
            placeholder="Псевдоним"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-2 border rounded"
          />
        )}

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
        >
          Зарегистрироваться
        </button>

        <p className="text-sm text-center">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
