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
      credentials: "include"
    });

   
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text(); 
      console.error("Server returned non-JSON:", text);
      return { success: false, message: "Server error: Invalid response format" };
    }

    const data = await res.json();

    if (res.ok) {

  if (data.primary_role === 'student') {
  }
  return { success: true, role: data.primary_role }; 
}


    return { success: false, message: data.message || "Invalid credentials" };

  } catch (error) {

    console.error("Login Fetch Error:", error); 
    
   
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
       return { success: false, message: "Unable to connect to the server." };
    }

    return { success: false, message: error.message || "Server connection failed" };
  }
};
