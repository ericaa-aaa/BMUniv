import { useState } from "react";
import StudentFormModal from "../../../components/modals/StudentFormModal";

export default function JHS() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Dela Cruz, Juan M.",
      grade: "10",
      section: "Makakalikasan",
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
      name: "Reyes, Anna L.",
      grade: "9",
      section: "Masikap",
      status: "Pending",
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
      name: "Santos, Carlo M.",
      grade: "7",
      section: "Matapat",
      status: "Enrolled",
      image: "png",
      contact: "09112223344",
      email: "carlo@gmail.com",
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
    <section className="min-h-screen flex-1 bg-[url('/src/assets/images/bg.jpg')] bg-cover bg-no-repeat bg-center relative">
      <div className="absolute inset-0 bg-white/80 px-6 py-8">
        {/* TITLE */}
        <div className="flex justify-center mb-6">
          <h1 className="bg-red-800 text-white px-10 py-3 rounded-xl text-lg md:text-xl font-semibold shadow-md">
            Elementary Students Records
          </h1>
        </div>

        {/* SEARCH */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Students Enrolled
          </h2>

          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Search:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-red-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-300"
              placeholder="Search student..."
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-red-800 text-white">
              <tr>
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Grade Level</th>
                <th className="py-3 px-3">Section</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Image</th>
                <th className="py-3 px-3">Student File</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-3">{student.id}</td>
                  <td className="py-3 px-3">{student.name}</td>
                  <td className="py-3 px-3">{student.grade}</td>
                  <td className="py-3 px-3">{student.section}</td>
                  <td
                    className={`py-3 px-3 font-medium ${
                      student.status === "Enrolled"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {student.status}
                  </td>
                  <td className="py-3 px-3">{student.image}</td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => openModal(student)}
                      className="text-blue-600 hover:underline"
                    >
                      View Form
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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