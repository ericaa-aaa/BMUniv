// HighSchoolStudentService.js

const API_BASE_URL = "http://127.0.0.1:5000";

export const ElementaryStudentService = {
    /**
     * Enrolls a new high school student
     * @param {Object} data - The raw form data from React Hook Form
     * @returns {Promise<Object>} - The server response
     */
    enrollStudent: async (data) => {
        const formData = new FormData();
        const token = localStorage.getItem("token");

        // 1. Prepare the FormData
        Object.keys(data).forEach((key) => {
            // Special handling for the file field
            if (key === "photo") {
                if (data.photo && data.photo[0]) {
                    formData.append("photo", data.photo[0]);
                }
            } else {
                // Append all other fields
                formData.append(key, data[key]);
            }
        });

        // 2. Perform the request
        const response = await fetch(`${API_BASE_URL}/Elstudents`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                // Note: Do NOT set 'Content-Type': 'multipart/form-data' manually. 
                // The browser does it automatically with the correct boundary when passing FormData.
            },
            body: formData,
        });

        // 3. Handle Token Expiry
        if (response.status === 401) {
            localStorage.removeItem("token");
            throw new Error("SESSION_EXPIRED");
        }

        // 4. Handle errors vs success
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save record");
        }

        return await response.json();
    }
};