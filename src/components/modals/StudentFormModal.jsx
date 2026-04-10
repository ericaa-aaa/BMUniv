import { IoClose } from "react-icons/io5";

export default function StudentFormModal({
  showModal,
  setShowModal,
  selectedStudent,
  handleChange,
  handleUpdate,
}) {
  if (!showModal || !selectedStudent) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center py-10 px-4">
        <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl relative p-8">
          {/* CLOSE */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4"
          >
            <IoClose size={28} />
          </button>

          {/* TITLE */}
          <h1 className="bg-red-800 text-white text-center py-4 rounded-xl text-2xl font-bold mb-8">
            Elementary Enrollment Form
          </h1>

          {/* STUDENT INFO */}
          <h2 className="text-2xl font-bold text-[#7A1C1C] mb-4">
            Student Information
          </h2>

          <div className="grid grid-cols-4 gap-4 bg-[#EDEBDD] p-6 rounded-xl">
            <input
              name="name"
              value={selectedStudent.name}
              onChange={handleChange}
              placeholder="Student Name"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="grade"
              value={selectedStudent.grade}
              onChange={handleChange}
              placeholder="Grade Level"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="section"
              value={selectedStudent.section}
              onChange={handleChange}
              placeholder="Section"
              className="border rounded-lg px-4 py-3"
            />

            <select
              name="status"
              value={selectedStudent.status}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            >
              <option>Enrolled</option>
              <option>Pending</option>
              <option>Dropped</option>
            </select>
          </div>

          {/* CONTACT INFO */}
          <h2 className="text-2xl font-bold text-[#7A1C1C] mt-8 mb-4">
            Contact Information
          </h2>

          <div className="grid grid-cols-3 gap-4 bg-[#EDEBDD] p-6 rounded-xl">
            <input
              name="contact"
              value={selectedStudent.contact || ""}
              onChange={handleChange}
              placeholder="Contact Number"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="email"
              value={selectedStudent.email || ""}
              onChange={handleChange}
              placeholder="Email Address"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="address"
              value={selectedStudent.address || ""}
              onChange={handleChange}
              placeholder="Address"
              className="border rounded-lg px-4 py-3"
            />
          </div>

          {/* PARENT INFO */}
          <h2 className="text-2xl font-bold text-[#7A1C1C] mt-8 mb-4">
            Parent / Guardian Information
          </h2>

          <div className="grid grid-cols-3 gap-4 bg-[#EDEBDD] p-6 rounded-xl">
            <input
              name="father"
              value={selectedStudent.father || ""}
              onChange={handleChange}
              placeholder="Father's Name"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="mother"
              value={selectedStudent.mother || ""}
              onChange={handleChange}
              placeholder="Mother's Name"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="guardian"
              value={selectedStudent.guardian || ""}
              onChange={handleChange}
              placeholder="Guardian"
              className="border rounded-lg px-4 py-3"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            className="w-full mt-8 bg-red-800 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Update Student Record
          </button>
        </div>
      </div>
    </div>
  );
}