import React, { useState, useEffect } from "react";

const Registrazione = () => {
  console.log("🟢 Registrazione component render");

  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🟡 useEffect → form changed:", form);
  }, [form]);

  const handleChange = (e) => {
    console.log("✏️ handleChange fired");
    console.log("name:", e.target.name);
    console.log("value:", e.target.value);

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 handleSubmit fired");
    console.log("📦 form data:", form);

    if (!form.username || !form.password || !form.fullName) {
      console.log("❌ validation FAILED");
      setMessage({
        type: "error",
        text: "Registrazione fallita: per favore, compila tutti i campi.",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          full_name: form.fullName, // <--- corrisponde al Pydantic model
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Errore registrazione");
      }

      const data = await res.json();
      console.log("✅ Registrazione backend OK:", data);

      setMessage({
        type: "success",
        text: "Registrazione avvenuta con successo!",
      });

      // Pulisco il form
      setForm({ username: "", password: "", fullName: "" });
    } catch (err) {
      console.error("❌ Registration error:", err);
      setMessage({
        type: "error",
        text: `Registrazione fallita: ${err.message}`,
      });
    } finally {
      setLoading(false);
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
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border border-green-200 rounded px-3 py-2 focus:outline-none text-base sm:text-lg"
      />

      <input
        type="text"
        name="fullName"
        placeholder="Nome completo"
        value={form.fullName}
        onChange={handleChange}
        className="border border-green-200 rounded px-3 py-2 focus:outline-none text-base sm:text-lg"
      />

      <button
        type="submit"
        className="w-full bg-yellow-100 py-2 rounded hover:bg-yellow-200 transition-colors text-base sm:text-lg tracking-wide shadow-md font-extrabold"
        onClick={() => console.log("🖱️ button clicked")}
        disabled={loading}
      >
        <span className="bg-gradient-to-r from-amber-500 via-pink-400 to-blue-500 bg-clip-text text-transparent uppercase">
          {loading ? "Registrando..." : "Registrati"}
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

export default Registrazione;

// import React, { useState } from "react";
// import { register } from "../api";

// function Register({ onRegisterSuccess }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   console.log("🔵 Register component loaded"); // DEBUG

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("📝 Form submitted!");
//     console.log("Username:", username);
//     console.log("Password:", password);
//     console.log("Full Name:", fullName);

//     setError("");
//     setLoading(true);

//     try {
//       console.log("🚀 Calling register API...");
//       const result = await register(username, password, fullName);
//       console.log("✅ Registration successful!", result);
//       alert("Registration successful! Please login.");
//       onRegisterSuccess();
//     } catch (err) {
//       console.error("❌ Registration error:", err);
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => {
//             console.log("Username changed:", e.target.value);
//             setUsername(e.target.value);
//           }}
//           style={styles.input}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => {
//             console.log("Password changed");
//             setPassword(e.target.value);
//           }}
//           style={styles.input}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => {
//             console.log("Full Name changed:", e.target.value);
//             setFullName(e.target.value);
//           }}
//           style={styles.input}
//           required
//         />

//         <button
//           type="submit"
//           style={styles.button}
//           disabled={loading}
//           onClick={() => console.log("Button clicked!")}
//         >
//           {loading ? "Loading..." : "Register"}
//         </button>
//         {error && <p style={styles.error}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "50px auto",
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//   },
//   input: {
//     padding: "10px",
//     fontSize: "16px",
//     borderRadius: "4px",
//     border: "1px solid #ddd",
//   },
//   button: {
//     padding: "10px",
//     fontSize: "16px",
//     backgroundColor: "#28a745",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     margin: "10px 0",
//   },
// };

// export default Register;
