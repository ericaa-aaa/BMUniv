const BASE_URL = "http://127.0.0.1:5000";

// Helper for simple JSON requests (GET/DELETE)
// Helper to handle unauthorized redirects
const handleUnauthorized = () => {
    localStorage.removeItem("token"); // Clear the bad token
    alert("Your session has expired. Please log in again.");
    window.location.href = "/"; // Redirect to your login route
};

export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
  });
  
  if (res.status === 401) return handleUnauthorized();
  
  return await res.json();
};

export const addStudent = async (formData) => {
    const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData, 
    });
    
    if (res.status === 401) return handleUnauthorized();

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save student");
    }
    return await res.json();
};
// UPDATE: This must now accept FormData because of the photo!
export const updateStudent = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { 
      "Authorization": `Bearer ${localStorage.getItem("token")}` 
      // Do NOT set Content-Type here for FormData
    },
    body: formData, // Send the FormData object, NOT JSON.stringify
  });
  return await res.json();
};

export const deleteStudent = async (id) => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return await res.json();
};