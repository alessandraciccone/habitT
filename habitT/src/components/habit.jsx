import React from "react";

const Habit = ({ habit, onToggle, onDelete }) => {
  return (
    <li className="habit-item">
      <label>
        <input
          type="checkbox"
          checked={habit.done}
          onChange={() => onToggle(habit.id, habit.done)}
        />
        {habit.name}
      </label>

      <button onClick={() => onDelete(habit.id)}>🗑️</button>
    </li>
  );
};

export default Habit;
