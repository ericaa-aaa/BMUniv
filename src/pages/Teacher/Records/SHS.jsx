import { useState } from "react";
import StudentFormModal from "../../../components/modals/StudentFormModal";
import bg from "../../../assets/images/bg.jpg";
import { CiSearch } from "react-icons/ci";

export default function SHS() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Dela Cruz, Llyne Say M.",
      grade: "12",
      section: "HUMMS 1",
      status: "Enrolled",
      image: "jpg",
      contact: "09123456789",
      email: "juan@gmail.com",
      address: "Batangas City",
      father: "Juan Dela Cruz Sr.",
      mother: "Maria Dela Cruz",
      guardian: "Ana Dela Cruz",
    },
    {
      id: 2,
      name: "Reyes, Axel L.",
      grade: "11",
      section: "ABM 1",
      status: "Enrolled",
      image: "jpg",
      contact: "09987654321",
      email: "anna@gmail.com",
      address: "Lipa City",
      father: "Mark Reyes",
      mother: "Liza Reyes",
      guardian: "Liza Reyes",
    },
    {
      id: 3,
      name: "Santos, Juanito M.",
      grade: "11",
      section: "STEM 2",
      status: "Enrolled",
      image: "png",
      contact: "09112223344",
      email: "juanito@gmail.com",
      address: "Tanauan",
      father: "Pedro Santos",
      mother: "Lina Santos",
      guardian: "Pedro Santos",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
      prev.map((student) =>
        student.id === selectedStudent.id ? selectedStudent : student
      )
    );

    setShowModal(false);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen flex-1 bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/80 px-6 py-8">

        {/* TITLE */}
        <div className="flex justify-center mb-8">
          <h1 className="bg-[#8B0000] text-white px-12 py-3 rounded-2xl text-lg md:text-xl font-semibold shadow-lg">
            Senior High School Students Records
          </h1>
        </div>

        {/* CARD CONTAINER */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
            <h2 className="text-lg font-semibold text-gray-700">Students Enrolled</h2>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Search: </span>
                  
                  {/* Container for the icon and input */}
                  <div className="relative flex items-center">
                    <CiSearch className="absolute left-3 text-gray-500 size-5" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search student..."
                      className="border border-[#8B0000] rounded pl-10 pr-3 py-1 outline-none focus:ring-2 focus:ring-red-300"
                    />
                  </div>
                </div>
          </div>

          {/* TABLE */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">

              {/* HEADER */}
              <div className="grid grid-cols-[0.5fr_2fr_0.8fr_1fr_1fr_0.7fr_1fr] bg-[#8B0000] text-white text-center font-semibold">
                <div className="p-3 border border-white/20">#</div>
                <div className="p-3 border border-white/20">Student Name</div>
                <div className="p-3 border border-white/20">Grade Level</div>
                <div className="p-3 border border-white/20">Section</div>
                <div className="p-3 border border-white/20">Status</div>
                <div className="p-3 border border-white/20">Image</div>
                <div className="p-3 border border-white/20">Student File</div>
              </div>

              {/* BODY */}
              {filteredStudents.map((student, index) => (
                <div key={student.id} className="grid grid-cols-[0.5fr_2fr_0.8fr_1fr_1fr_0.7fr_1fr] text-center">
                  <div className="p-4 border border-gray-200">{index + 1}</div>
                  <div className="p-4 text-left border border-gray-200">{student.name}</div>
                  <div className="p-4 border border-gray-200">{student.grade}</div>
                  <div className="p-4 border border-gray-200">{student.section}</div>

                    <div className="p-4 font-medium border border-gray-200">
                      <span className={student.status === "Enrolled" ? "text-green-600" : "text-yellow-600"}>{student.status}</span>
                    </div>

                    <div className="p-4 border border-gray-200">
                      {student.image}
                    </div>

                  <div className="p-4 border border-gray-200">
                    <button onClick={() => openModal(student)} className="text-blue-600 hover:underline">
                      View Form
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* MODAL */}
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