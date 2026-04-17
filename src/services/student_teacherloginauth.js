const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginUser = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      
      // CRITICAL: Store data.username (the First Name from backend)
      localStorage.setItem("activeUser", data.username); 

      return { success: true, role: data.role };
    }
    return { success: false, message: data.message };
  } catch (error) {
    return { success: false, message: "Server connection failed" };
  }
};