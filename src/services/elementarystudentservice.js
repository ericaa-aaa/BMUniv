
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const ElementaryStudentService = {
    
    getStudents: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Elstudents`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                window.location.href = "/login";
                throw new Error("SESSION_EXPIRED");
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Service Error [getStudents]:", error);
            throw error;
        }
    },


        enrollStudent: async (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "photo") {
                if (data.photo && data.photo[0]) {
                    formData.append("photo", data.photo[0]);
                }
             
            } else {
            
                formData.append(key, data[key] ?? "");
            }
        });

        const response = await fetch(`${API_BASE_URL}/Elstudents`, {
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

  
    updateStudent: async (id,studentData) => {
        
        try {
            const response = await fetch(`${API_BASE_URL}/Elstudents/${id}`, {
                credentials:"include",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData),
            });

            if (response.status === 401) {
                window.location.href = "/";
                throw new Error("SESSION_EXPIRED");
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to update record");
            }

            return await response.json();
        } catch (error) {
            console.error("Service Error [updateStudent]:", error);
            throw error;
        }
    },
    deleteStudent: async (user_id, studentData) => {
        
        try {
            const response = await fetch(`${API_BASE_URL}/Elstudents/${user_id}`, {
                method: "DELETE",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData),  
            });

            if (response.status === 401) {
                window.location.href = "/";
                throw new Error("SESSION_EXPIRED");
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to delete record");
            }

            return await response.json();
        } catch (error) {
            console.error("Service Error [DELETE Students]:", error);
            throw error;
        }
    }
};