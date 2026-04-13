import { useState, useEffect } from "react";
import StudentFormModal from "../../../components/modals/StudentFormModal";
import bg from "../../../assets/images/bg.jpg";
import { CiSearch } from "react-icons/ci";
import { ElementaryStudentService } from "../../../services/elementarystudentservice";

export default function Elementary() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await ElementaryStudentService.getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to load students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

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

  const handleUpdate = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? selectedStudent : s))
    );
    setShowModal(false);
  };

  const filteredStudents = students.filter((student) =>
    student.fullname?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="h-screen w-full bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-white/80 px-6 py-8 flex flex-col">
        
        <div className="flex justify-center mb-8 shrink-0">
          <h1 className="bg-[#8B0000] text-white px-12 py-3 rounded-2xl text-lg md:text-xl font-semibold shadow-lg">
            Elementary Students Records
          </h1>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col flex-1 min-h-0 border border-white/50">
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3 shrink-0">
            <h2 className="text-lg font-semibold text-gray-700">
                {loading ? "Loading records..." : `Students Enrolled (${students.length})`}
            </h2>

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Search: </span>
              <div className="relative flex items-center">
                <CiSearch className="absolute left-3 text-gray-500 size-5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student..."
                  className="border border-[#8B0000] rounded-lg pl-10 pr-3 py-1.5 outline-none focus:ring-2 focus:ring-red-300 w-64 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto border border-gray-200 rounded-xl bg-white shadow-inner">
            <div className="min-w-225"> 
              
              {/* Header: Changed Status Label */}
              <div className="grid grid-cols-[0.5fr_2fr_0.8fr_1fr_1fr_0.7fr_1fr] bg-[#8B0000] text-white text-center font-semibold sticky top-0 z-10 shadow-md">
                <div className="p-3 border-r border-white/10">#</div>
                <div className="p-3 border-r border-white/10">Student Name</div>
                <div className="p-3 border-r border-white/10">Grade Level</div>
                <div className="p-3 border-r border-white/10">Section</div>
                <div className="p-3 border-r border-white/10">Status</div> {/* Updated UI label */}
                <div className="p-3 border-r border-white/10">Photo</div>
                <div className="p-3">Student File</div>
              </div>

              {loading ? (
                <div className="p-10 text-center text-gray-500">Fetching data from server...</div>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <div 
                    key={student.id} 
                    className="grid grid-cols-[0.5fr_2fr_0.8fr_1fr_1fr_0.7fr_1fr] text-center border-b border-gray-100 hover:bg-red-50/50 transition-colors items-center"
                  >
                    <div className="p-4 border-r border-gray-100 text-gray-500">{index + 1}</div>
                    <div className="p-4 text-left border-r border-gray-100 font-medium text-gray-800">
                      {student.fullname}
                    </div>
                    <div className="p-4 border-r border-gray-100 text-gray-600">{student.grade_level}</div>
                    <div className="p-4 border-r border-gray-100 text-gray-600">{student.section}</div>
                    
                    {/* Status Column with Conditional Styling */}
                    <div className="p-4 border-r border-gray-100">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        student.status?.toLowerCase() === 'enrolled' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {student.status || 'N/A'} 
                      </span>
                    </div>

                    <div className="p-4 border-r border-gray-100 flex justify-center">
                      {student.photo_url ? (
                        <img src={student.photo_url} alt="Profile" className="h-20 w-20 object-cover border" />
                      ) : (
                        <span className="text-gray-300 text-xs italic">No Image</span>
                      )}
                    </div>
                    <div className="p-4">
                      <button onClick={() => openModal(student)} className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        View Form
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-400 italic">
                  No students found.
                </div>
              )}
            </div>
          </div>
        </div>

        <StudentFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedStudent={selectedStudent}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
        />
      </div>
    </section>
  );
}