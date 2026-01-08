import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/habits";

const Habits = () => {
  const [habits, setHabits] = useState([]); // Lista completa
  const [completedToday, setCompletedToday] = useState([]); // Solo completate oggi
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const todayLabel = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Carica tutte le abitudini
  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore caricamento abitudini");
        return res.json();
      })
      .then((data) => setHabits(data))
      .catch(() => setError("Errore caricamento abitudini"));
  }, [token]);

  // Carica i log di oggi (solo abitudini completate oggi)
  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/logs/today`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Errore caricamento abitudini giornaliere");
        return res.json();
      })
      .then((data) => {
        // Filtra solo quelle completate oggi
        const completed = data
          .filter((h) => h.completed)
          .map((h) => h.habit_id);
        setCompletedToday(completed);
      })
      .catch(() => setError("Errore caricamento abitudini giornaliere"));
  }, [token]);

  // Aggiunge una nuova abitudine
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.description.trim()) return;

    try {
      const res = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Errore creazione abitudine");
      }

      const newHabit = await res.json();
      setHabits((prev) => [...prev, newHabit]);
      setForm({ name: "", description: "" });
    } catch {
      setError("Errore durante la creazione.");
    }
  };

  // Toggle completamento abitudine (aggiunge o rimuove il log di oggi)
  const toggleHabit = async (habitId) => {
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${habitId}/log`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Errore aggiornamento abitudine");

      const updated = await res.json();

      if (updated.completed) {
        setCompletedToday((prev) => [...prev, habitId]);
      } else {
        setCompletedToday((prev) => prev.filter((id) => id !== habitId));
      }
    } catch {
      setError("Errore aggiornamento stato abitudine.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
        Le tue abitudini
      </h2>

      {/* LISTA COMPLETA ABITUDINI CON CHECKBOX */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-blue-400 mb-3">
          Tutte le abitudini
        </h3>
        {habits.length === 0 && <p>Nessuna abitudine creata</p>}
        <ul className="space-y-2">
          {habits.map((habit) => (
            <li
              key={habit.id}
              className="flex items-center gap-3 p-3 bg-blue-50 rounded shadow"
            >
              <input
                type="checkbox"
                checked={completedToday.includes(habit.id)}
                onChange={() => toggleHabit(habit.id)}
                id={`habit-${habit.id}`}
                className="w-5 h-5 cursor-pointer"
              />
              <label htmlFor={`habit-${habit.id}`} className="cursor-pointer">
                <span className="font-semibold text-blue-800">
                  {habit.name}
                </span>{" "}
                <small className="text-gray-600">{habit.description}</small>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* SEZIONE GIORNALIERA: SOLO ABITUDINI COMPLETATE OGGI */}
      <div className="mb-8 p-5 bg-green-50 rounded-lg shadow">
        <h3 className="text-lg font-bold text-center text-green-300 mb-4">
          Completate oggi 😎 – {todayLabel}
        </h3>

        {completedToday.length === 0 && (
          <p className="text-center text-gray-600">
            Nessuna abitudine completata oggi
          </p>
        )}

        <ul className="space-y-2">
          {habits
            .filter((habit) => completedToday.includes(habit.id))
            .map((habit) => (
              <li
                key={habit.id}
                className="p-3 bg-white rounded shadow text-green-700 font-semibold"
              >
                {habit.name}
              </li>
            ))}
        </ul>
      </div>

      {/* FORM CREAZIONE NUOVA ABITUDINE */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Titolo abitudine"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-green-200 rounded px-3 py-2"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Descrizione"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border border-green-200 rounded px-3 py-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-100 py-2 rounded hover:bg-yellow-200 font-extrabold"
        >
          <span className="bg-gradient-to-r from-amber-500 via-pink-400 to-blue-500 bg-clip-text text-transparent uppercase">
            Aggiungi
          </span>
        </button>
      </form>

      {error && (
        <p className="text-center text-red-500 text-sm mt-4">{error}</p>
      )}
    </div>
  );
};

export default Habits;
