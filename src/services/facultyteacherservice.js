const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const FacultyTeacherService = {
    // 1. Fetch all faculty members
    getFaculty: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/faculty`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Service Error [getFaculty]:", error);
            throw error;
        }
    },

    // 2. Add a new Faculty member
    addFaculty: async (data) => {
        const formData = new FormData();
        const token = localStorage.getItem("token");

        // Prepare FormData
        Object.keys(data).forEach((key) => {
            if (key === "subjects" && Array.isArray(data.subjects)) {
                // IMPORTANT: When sending multiple checkboxes (subjects) in FormData,
                // you must append each ID individually so Flask can use getlist()
                data.subjects.forEach(id => formData.append("subjects", id));
            } else if (key === "photo" && data.photo?.[0]) {
                formData.append("photo", data.photo[0]);
            } else {
                // Standard fields: firstname, lastname, email, position, etc.
                formData.append(key, data[key]);
            }
        });

        const response = await fetch(`${API_BASE_URL}/faculty`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}` 
                // Note: Do NOT set Content-Type header when using FormData
            },
            body: formData,
        });

        // Handle Token Expiry
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("SESSION_EXPIRED");
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save record");
        }

        return await response.json();
    },

    // 3. Update existing Faculty (PATCH)
    updateFaculty: async (id, facultyData) => {
        const token = localStorage.getItem("token");
        
        try {
            const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(facultyData),
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                throw new Error("SESSION_EXPIRED");
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to update record");
            }

            return await response.json();
        } catch (error) {
            console.error("Service Error [updateFaculty]:", error);
            throw error;
        }
    },

    // 4. Helper: Fetch subjects by grade level (to populate checkboxes)
    getSubjectsByGrade: async (grade) => {
        try {
            const response = await fetch(`${API_BASE_URL}/subjects-list/${grade}`);
            if (!response.ok) throw new Error("Could not fetch subjects");
            return await response.json();
        } catch (error) {
            console.error("Service Error [getSubjectsByGrade]:", error);
            throw error;
        }
    }
};