const BASE_URL = "http://127.0.0.1:5000";

// ✅ NEW: Login function to get and store the token
export const loginTeacher = async (username, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    // Save the token in localStorage so we can use it later
    localStorage.setItem("token", data.access_token);
    return { success: true };
  }
  return { success: false, message: data.message };
};

export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`);
  return res.json();
};

// ✅ UPDATED: Delete now requires the JWT token from localStorage
export const deleteStudent = async (id) => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`, // Send the token here
      "Content-Type": "application/json",
    },
  });
};