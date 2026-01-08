import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setMessage({ type: "error", text: "Inserisci username e password." });
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // FastAPI OAuth2PasswordRequestForm richiede form-urlencoded
      const body = new URLSearchParams();
      body.append("username", form.username);
      body.append("password", form.password);

      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(" Login OK:", data);
        setMessage({ type: "success", text: "Login effettuato con successo!" });

        setMessage({ type: "error", text: data.detail || "Login fallito." });
      }
    } catch (err) {
      console.error(" Errore login:", err);
      setMessage({ type: "error", text: "Errore di rete." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-6 sm:mt-10 bg-blue-50 p-4 sm:p-8 rounded-lg shadow-lg flex flex-col gap-4"
    >
      <div className="flex items-center justify-center mb-4 gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-400">
          Login
        </h2>
        <img
          src="/register.png"
          alt="Login"
          className="h-5 w-5 sm:h-6 sm:w-6"
        />
      </div>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="border border-green-200 rounded px-3 py-2 focus:outline-none text-base sm:text-lg"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border border-green-200 rounded px-3 py-2 focus:outline-none text-base sm:text-lg"
        required
      />

      <button
        type="submit"
        className="w-full bg-yellow-100 py-2 rounded hover:bg-yellow-200 transition-colors text-base sm:text-lg tracking-wide shadow-md font-extrabold"
        disabled={loading}
      >
        <span className="bg-gradient-to-r from-amber-500 via-pink-400 to-blue-500 bg-clip-text text-transparent uppercase">
          {loading ? "Caricamento..." : "Login"}
        </span>
      </button>

      {message && (
        <div
          className={`text-center text-sm mt-2 ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
};

export default Login;
