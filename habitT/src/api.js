const API_URL = "http://localhost:8000";

// Helper per gestire errori
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Something went wrong");
  }
  return response.json();
};

// Auth API
export const register = async (username, password, fullName) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      full_name: fullName,
    }),
  });
  return handleResponse(response);
};

export const login = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: formData,
  });
  return handleResponse(response);
};

// Habits API
export const getHabits = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habits/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const createHabit = async (name, description) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  return handleResponse(response);
};

export const deleteHabit = async (habitId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habits/${habitId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};
