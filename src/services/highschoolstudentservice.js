const BASE_URL = "http://127.0.0.1:5000";

/**
 * Helper to handle unauthorized redirects and token cleanup.
 */
const handleUnauthorized = () => {
    localStorage.removeItem("token");
    alert("Your session has expired. Please log in again.");
    window.location.href = "/";
};

/**
 * Helper to get Authorization headers.
 */
const getAuthHeaders = () => ({
    "Authorization": `Bearer ${localStorage.getItem("token")}`
});

/**
 * GET: Fetch all students.
 * Matches: @Highstudent_bp.route('/Highstudents', methods=['GET'])
 */
export const getStudents = async () => {
    const res = await fetch(`${BASE_URL}/Highstudents`, {
        headers: getAuthHeaders(),
    });

    if (res.status === 401) return handleUnauthorized();
    if (!res.ok) throw new Error("Failed to fetch students");

    return await res.json();
};

/**
 * POST: Add a new student using FormData (supports photo/file upload).
 * Matches: @Highstudent_bp.route('/Highstudents', methods=['POST'])
 */
export const addStudent = async (formData) => {
    const res = await fetch(`${BASE_URL}/Highstudents`, {
        method: "POST",
        headers: getAuthHeaders(),
        // Note: Do NOT set 'Content-Type': 'multipart/form-data' manually.
        // The browser sets the boundary automatically when passing FormData.
        body: formData,
    });

    if (res.status === 401) return handleUnauthorized();

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to save student");
    
    return result;
};

/**
 * PUT: Update an existing student using FormData.
 * Matches: @Highstudent_bp.route('/Highstudents/<int:id>', methods=['PUT'])
 */
export const updateStudent = async (id, formData) => {
    // Fixed typo in URL: was 'Hightudents', now 'Highstudents'
    const res = await fetch(`${BASE_URL}/Highstudents/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formData,
    });

    if (res.status === 401) return handleUnauthorized();

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to update student");

    return result;
};

/**
 * DELETE: Remove a student.
 * Matches: @Highstudent_bp.route('/Highstudents/<int:id>', methods=['DELETE'])
 */
export const deleteStudent = async (id) => {
    const res = await fetch(`${BASE_URL}/Highstudents/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (res.status === 401) return handleUnauthorized();

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to delete student");

    return result;
};