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
       return { success: false, message: "Netork Error: Is the Flask server running?" };
    }

    return { success: false, message: error.message || "Server connection failed" };
  }
};

// cookies

// const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// export const loginUser = async (username, password) => {
//   // 1. Configuration Check
//   if (!API_BASE_URL) {
//     console.error("VITE_BASE_URL is missing!");
//     return { success: false, message: "Frontend Config Error" };
//   }

//   try {
//     // 2. The Fetch Request
//     const res = await fetch(`${API_BASE_URL}/login`, {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json" 
//         // Note: Removed Bearer token here; you usually don't have one during login!
//       },
//       body: JSON.stringify({ username, password }),
//       credentials: "include", // Required if your Flask server uses Secure/HttpOnly cookies
//     });

//     // 3. Content-Type Validation
//     const contentType = res.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const text = await res.text();
//       console.error("Server returned non-JSON:", text);
//       return { success: false, message: "Server error: Invalid response format" };
//     }

//     const data = await res.json();

//     // 4. Handle Successful Login
//     if (res.ok) {
//       // Store non-sensitive metadata
//       localStorage.setItem("role", data.primary_role);
//       localStorage.setItem("activeUser", data.username);
//       localStorage.setItem("permissions", JSON.stringify(data.permissions || []));

//       if (data.primary_role === 'student') {
//         localStorage.setItem("studentGrade", data.grade || "");
//         localStorage.setItem("studentSection", data.section || "");
//       }

//       return { success: true, role: data.primary_role };
//     }

//     // 5. Handle Logic Errors (e.g., 401 Unauthorized)
//     return { success: false, message: data.msg || data.message || "Invalid credentials" };

//   } catch (error) {
//     // 6. Handle Network/System Errors
//     console.error("Login Fetch Error:", error);
    
//     if (error.name === 'TypeError' && error.message.includes('fetch')) {
//       return { success: false, message: "Network Error: Is the Flask server running?" };
//     }
    
//     return { success: false, message: error.message || "Server connection failed" };
//   }
// };