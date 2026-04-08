import { useEffect, useState } from "react";
import { ElementaryStudentServicefetch } from "../../../services/elementarystudentservice"; // Adjust path as needed

export default function Elementary() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await ElementaryStudentServicefetch.getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter students based on search input
  const filteredStudents = students.filter((s) =>
    s.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen flex-1 bg-[url('/src/assets/images/bg.jpg')] bg-cover bg-no-repeat bg-fixed relative">
      <div className="absolute inset-0 bg-white/80 px-6 py-8 overflow-auto">
        
        {/* Header Section */}
        <div className="flex justify-center mb-6">
          <h1 className="bg-red-800 text-white px-10 py-3 rounded-xl text-lg md:text-xl font-semibold shadow-md">
            Elementary Students Records
          </h1>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Students Enrolled ({filteredStudents.length})
          </h2>
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Search:</label>
            <input
              type="text"
              placeholder="Filter by name..."
              className="border border-red-800 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-red-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <table className="w-full text-sm text-center">
            <thead className="bg-red-800 text-white">
              <tr>
                <th className="py-3 px-2">#</th>
                <th className="py-3 px-2">Student Name</th>
                <th className="py-3 px-2">Grade Level</th>
                <th className="py-3 px-2">Section</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Image</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="py-10 text-gray-500 italic">Loading student records...</td></tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-red-50 transition-colors">
                    <td className="py-4">{index + 1}</td>
                    <td className="py-4 uppercase font-bold text-gray-800">{student.fullname}</td>
                    <td className="py-4">{student.grade_level}</td>
                    <td className="py-4 font-bold text-red-700">{student.section || "N/A"}</td>
                    <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Enrolled</span></td>
                    <td className="py-4">
                      {student.photo_url ? (
                        <img 
                          src={student.photo_url} 
                          alt={student.fullname} 
                          className="h-20 w-20 mx-auto object-cover border-2 border-red-800" 
                        />
                      ) : (
                        <div className="h-12 w-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                      )}
                    </td>
                    <td className="py-4">
                      <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition-colors">
                        View Form
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="py-10 text-gray-500">No records matching your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}