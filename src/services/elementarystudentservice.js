// HighSchoolStudentService.js (Consider renaming to ElementaryStudentService.js if that's the intent)

const API_BASE_URL = "http://127.0.0.1:5000";

export const ElementaryStudentService = {
    // 1. Fetch all students
    getStudents: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Elstudents`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Try to get error message from server if it exists
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Service Error [getStudents]:", error);
            throw error; // Re-throw so the UI component can catch it and show an error state
        }
    },

    // 2. Enroll a new student (Consolidated logic)
    enrollStudent: async (data) => {
        const formData = new FormData();
        const token = localStorage.getItem("token");

        // Prepare FormData
        Object.keys(data).forEach((key) => {
            if (key === "photo" && data.photo?.[0]) {
                formData.append("photo", data.photo[0]);
            } else {
                formData.append(key, data[key]);
            }
        });

        const response = await fetch(`${API_BASE_URL}/Elstudents`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}` 
                // Let the browser set the Content-Type boundary automatically
            },
            body: formData,
        });

        // Handle Token Expiry
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"; // Optional: Force redirect
            throw new Error("SESSION_EXPIRED");
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save record");
        }

        return await response.json();
    }
};