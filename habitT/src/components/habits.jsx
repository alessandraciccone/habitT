import { useEffect, useState } from "react";
import Habit from "./components/habit";

const API_URL = "http://localhost:8000/habits/";

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  // GET
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.error("GET error:", err));
  }, []);

  // POST
  const addHabit = () => {
    if (!newHabit.trim()) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newHabit, done: false }),
    })
      .then((res) => res.json())
      .then((data) => setHabits((prev) => [...prev, data]))
      .catch((err) => console.error("POST error:", err));

    setNewHabit("");
  };

  // DELETE
  const deleteHabit = (id) => {
    fetch(`${API_URL}${id}/`, { method: "DELETE" })
      .then(() => setHabits((prev) => prev.filter((h) => h.id !== id)))
      .catch((err) => console.error("DELETE error:", err));
  };

  // PATCH toggle
  const toggleHabit = (id, done) => {
    fetch(`${API_URL}${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done }),
    })
      .then(() =>
        setHabits((prev) =>
          prev.map((h) => (h.id === id ? { ...h, done: !done } : h))
        )
      )
      .catch((err) => console.error("PATCH error:", err));
  };

  return (
    <div className="habits">
      <h2>🌱 Le mie abitudini</h2>

      <input
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="Aggiungi abitudine"
      />
      <button onClick={addHabit}>➕</button>

      <ul>
        {habits.map((habit) => (
          <Habit
            key={habit.id}
            habit={habit}
            onToggle={toggleHabit}
            onDelete={deleteHabit}
          />
        ))}
      </ul>
    </div>
  );
};

export default Habits;
