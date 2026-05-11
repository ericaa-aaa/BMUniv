import { useState, useEffect, useMemo } from "react";
import JHSFormModal from "../../../components/modals/JHSFormModal";
import bg from "../../../assets/images/bg.jpg";
import { CiSearch } from "react-icons/ci";
import { HighSchoolStudentService } from "../../../services/highschoolstudentservice";

export default function Highschool() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await HighSchoolStudentService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase().trim();
    let result = students;

    if (query) {
      result = students.filter((student) => {
        return (
          student.fullname?.toLowerCase().includes(query) ||
          student.grade_level?.toString().toLowerCase().includes(query) ||
          student.section?.toLowerCase().includes(query) ||
          student.status?.toLowerCase().includes(query)
        );
      });
    }

    const getGradeNumber = (grade) => {
      return parseInt(grade?.toString().replace(/\D/g, "")) || 0;
    };

    return result.sort((a, b) => {
      const gradeDiff =
        getGradeNumber(a.grade_level) -
        getGradeNumber(b.grade_level);

      if (gradeDiff !== 0) return gradeDiff;

      return a.fullname.localeCompare(b.fullname);
    });

  }, [search, students]);

  const openModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await HighSchoolStudentService.updateStudent(
        selectedStudent.id,
        selectedStudent,
      );
      await fetchStudents();
      setShowModal(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update student record.");
    }
  };

  return (
    <section
      className="h-screen w-full bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-white/80 px-6 py-8 flex flex-col">
        <div className="flex justify-center mb-8 shrink-0">
          <h1 className="bg-[#630000] text-white px-12 py-3 font-['Inter'] rounded-2xl text-lg md:text-xl font-semibold shadow-lg">
            Highschool Students Records
          </h1>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col flex-1 min-h-0 border border-white/50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3 shrink-0">
            <h2 className="text-lg font-semibold text-gray-700">
              {loading
                ? "Loading records..."
                : `Students (${students.length})`}
            </h2>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center group">
                <CiSearch className="absolute left-3 text-gray-400 size-5 group-focus-within:text-[#8B0000] transition-colors" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by student name, grade level, or section..."
                  className="w-96 py-2 pl-10 pr-4 border border-[#810100] rounded-lg outline-none 
                            bg-white text-sm placeholder:text-gray-400 font-['Inter']
                            focus:ring-2 focus:ring-red-100 focus:border-[#630000] 
                            transition-all duration-200 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="font-['Inter'] flex-1 overflow-auto border border-gray-200 rounded-xl bg-white shadow-inner">
            <div className="min-w-225">
              <div className="grid grid-cols-[0.5fr_2fr_0.8fr_1fr_1fr_0.7fr_1fr] bg-[#630000] text-white text-center font-['Inter'] font-semibold sticky top-0 z-10 shadow-md">
                <div className="p-3 border-r border-white/10">#</div>
                <div className="p-3 border-r border-white/10">Student Name</div>
                <div className="p-3 border-r border-white/10">Grade Level</div>
                <div className="p-3 border-r border-white/10">Section</div>
                <div className="p-3 border-r border-white/10">Status</div>
                <div className="p-3 border-r border-white/10">Photo</div>
                <div className="p-3">Student File</div>
              </div>

              {loading ? (
                <div className="p-10 text-center text-gray-500">
                  Fetching data from server...
                </div>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <div
                    key={student.id}
                    className="grid grid-cols-[0.5fr_2fr_0.8fr_1fr_1fr_0.7fr_1fr] text-center border-b border-gray-100 hover:bg-red-50/50 transition-colors items-center"
                  >
                    <div className="p-4 border-r border-gray-100 text-gray-500">
                      {index + 1}
                    </div>
                    <div className="p-4 text-left border-r border-gray-100 font-medium text-gray-800">
                      {student.fullname}
                    </div>
                    <div className="p-4 border-r border-gray-100 text-gray-600">
                      {student.grade_level}
                    </div>

                    <div className="p-4 border-r border-gray-100 text-gray-600">
                      {student.status?.toLowerCase() === "dropped" ? (
                        <span className="text-gray-400 font-bold">—</span>
                      ) : (
                        student.section || "N/A"
                      )}
                    </div>

                    <div className="p-4 border-r border-gray-100">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          student.status?.toLowerCase() === "enrolled"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status || "N/A"}
                      </span>
                    </div>

                    <div className="p-4 border-r border-gray-100 flex justify-center">
                      {student.photo_url ? (
                        <img
                          src={student.photo_url}
                          alt="Profile"
                          onClick={() => setPreviewImage(student.photo_url)}
                          className="h-16 w-16 rounded-md object-cover border"
                        />
                      ) : (
                        <span className="text-gray-300 text-xs italic">
                          No Image
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <button
                        onClick={() => openModal(student)}
                        className="bg-red-50 text-[#630000] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#8B0000] hover:text-white transition-all shadow-sm"
                      >
                        View Form
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-400 italic">
                  No records match "{search}"
                </div>
              )}
            </div>

          {previewImage && (
            <div 
              className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
              onClick={() => setPreviewImage(null)}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                
                <button 
                  className="absolute top-0 right-0 m-4 text-white hover:text-red-400 transition-colors z-10"
                  onClick={() => setPreviewImage(null)}
                >
                  <span className="text-3xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>

                  </span>
                </button>

                <img 
                  src={previewImage} 
                  alt="Student Photo"
                  className="rounded-lg shadow-2xl max-w-[90vw] max-h-[85vh] object-contain border-2 border-white/20 bg-gray-900"
                  onClick={(e) => e.stopPropagation()} 
                />
              </div>
            </div>
          )}

          </div>
        </div>

        <JHSFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedStudent={selectedStudent}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          onUpdateSuccess={fetchStudents}
          onDeleteSuccess={fetchStudents}
        />
      </div>
    </section>
  );
}
