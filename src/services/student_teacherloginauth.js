const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginUser = async (username, password) => {

  if (!API_BASE_URL) {
    console.error("VITE_BASE_URL is missing! Check your .env file.");
    return { success: false, message: "Frontend Config Error" };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

   
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text(); 
      console.error("Server returned non-JSON:", text);
      return { success: false, message: "Server error: Invalid response format" };
    }

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("activeUser", data.username);
      
      if (data.role === 'student') {
        localStorage.setItem("studentGrade", data.grade || "");
        localStorage.setItem("studentSection", data.section || "");
        localStorage.setItem("studentCategory", data.category || "");
        localStorage.setItem("studentStatus", data.status || "ENROLLED");
      }
      return { success: true, role: data.role };
    }

    return { success: false, message: data.message || "Invalid credentials" };

  } catch (error) {

    console.error("Login Fetch Error:", error); 
    
   
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
       return { success: false, message: "Netork Error: Is the Flask server running?" };
    }

    return { success: false, message: error.message || "Server connection failed" };
  }
};