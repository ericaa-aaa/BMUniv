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
    localStorage.setItem("activeUser", data.username);
    return { success: true };
  }
  return { success: false, message: data.message };
};
