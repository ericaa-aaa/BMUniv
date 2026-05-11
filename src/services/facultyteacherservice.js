const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const FacultyTeacherService = {
    getFaculty: async (level) => {
        try {
      
            const response = await fetch(`${API_BASE_URL}/faculty/${level}`, {
                credentials:"include",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 401) {
                window.location.href = "/";
                throw new Error("SESSION_EXPIRED");
            }

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


    addFaculty: async (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "subjects" && Array.isArray(data.subjects)) {
                data.subjects.forEach(id => formData.append("subjects", id));
            } else if (key === "photo" && data.photo?.[0]) {
                formData.append("photo", data.photo[0]);
            } else {
            
                formData.append(key, data[key]);
            }
        });

    
        const response = await fetch(`${API_BASE_URL}/faculty`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        if (response.status === 401) {
            window.location.href = "/";
            throw new Error("SESSION_EXPIRED");
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save record");
        }

        return await response.json();
    },


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
    
    Loadprofile: async () => {
    const response = await fetch(`${API_BASE_URL}/load-profile`, {
        credentials: "include",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) throw new Error("Failed to fetch profile");
    return await response.json();
    },

    getSubjectsByGradeSHS: async (grade, strand) => {
    try {

        const response = await fetch(`${API_BASE_URL}/subjects-list/${grade}/${strand}`);
        
        if (!response.ok) throw new Error("Could not fetch subjects");
        return await response.json();
    } catch (error) {
        console.error("Service Error [getSubjectsByGrade]:", error);
        throw error;
    }
    },
};