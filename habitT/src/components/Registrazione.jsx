import React, { useState } from "react";

const Registrazione = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username && form.password && form.fullName) {
      setMessage({ type: "success", text: "Registrazione avvenuta con successo!" });
    } else {
      setMessage({ type: "error", text: "Registrazione fallita: per favore, compila tutti i campi." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-6 sm:mt-10 bg-white p-4 sm:p-8 rounded-lg shadow-lg flex flex-col gap-4"
    >
      <div className="flex items-center justify-center mb-4 gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-400">
          Registrazione
        </h2>
        <img
          src="/register.png"
          alt="Register"
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
      <input
        type="text"
        name="fullName"
        placeholder="Nome completo"
        value={form.fullName}
        onChange={handleChange}
        className="border border-green-200 rounded px-3 py-2 focus:outline-none text-base sm:text-lg"
        required
      />

      <button
        type="submit"
        className="w-full bg-yellow-100 py-2 rounded hover:bg-yellow-200 transition-colors text-base sm:text-lg tracking-wide shadow-md font-extrabold"
      >
        <span className="bg-gradient-to-r from-amber-500 via-pink-400 to-blue-500 bg-clip-text text-transparent uppercase">
          Registrati
        </span>
      </button>
      {message && (
        <div
          className={`text-center text-sm mt-2 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
};

export default Registrazione;
