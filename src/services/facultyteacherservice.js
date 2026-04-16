const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const FacultyTeacherService = {
    // 1. MODIFIED: Fetch faculty members based on level (e.g., 'Elementary' or 'HighSchool')
    getFaculty: async (level) => {
        try {
            // Updated URL to match the new Flask route: /faculty/<level>
            const response = await fetch(`${API_BASE_URL}/faculty/${level}`, {
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
            console.error(`Service Error [getFaculty - ${level}]:`, error);
            throw error;
        }
    },

    // 2. MODIFIED: Add a new Faculty member (Now handles the 'level' field)
    addFaculty: async (data) => {
        const formData = new FormData();
        const token = localStorage.getItem("token");

        Object.keys(data).forEach((key) => {
            if (key === "subjects" && Array.isArray(data.subjects)) {
                data.subjects.forEach(id => formData.append("subjects", id));
            } else if (key === "photo" && data.photo?.[0]) {
                formData.append("photo", data.photo[0]);
            } else {
                // This will now include the 'level' you send from your form
                formData.append(key, data[key]);
            }
        });

        // The POST route remains /faculty, but the data now includes the level column
        const response = await fetch(`${API_BASE_URL}/faculty`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}` 
            },
            body: formData,
        });

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

    // ... updateFaculty and getSubjectsByGrade remain largely the same
    // but ensure getSubjectsByGrade uses the correct IDs for HS vs Elem
    getSubjectsByGrade: async (grade) => {
        try {
            const response = await fetch(`${API_BASE_URL}/subjects-list/${grade}`);
            if (!response.ok) throw new Error("Could not fetch subjects");
            return await response.json();
        } catch (error) {
            console.error("Service Error [getSubjectsByGrade]:", error);
            throw error;
        }
    },
    getMySubjects: async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/my-subjects`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) throw new Error("Failed to fetch subjects");
    return await response.json();
}
};