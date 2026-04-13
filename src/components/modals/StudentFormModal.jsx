import { IoMdCloseCircleOutline } from "react-icons/io";

export default function StudentFormModal({
  showModal,
  setShowModal,
  selectedStudent,
  handleChange,
  handleUpdate,
}) {
  if (!showModal || !selectedStudent) return null;

  // Logic to determine level for conditional rendering
  const grade = parseInt(selectedStudent.grade);
  const isJHS = grade >= 7 && grade <= 10;
  const isSHS = grade >= 11 && grade <= 12;

  // Reusable Read-Only Input Style
  const readOnlyStyle = "border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed text-gray-600";
  const editableStyle = "border rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-red-800 outline-none";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center py-10 px-4">
        <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl relative p-8">
          
          {/* CLOSE BUTTON */}
          <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-800 transition-colors">
            <IoMdCloseCircleOutline size={22} />
          </button>

          {/* TITLE */}
          <h1 className="bg-red-800 text-white text-center py-4 rounded-xl text-2xl font-bold mb-8">
            Student Information System
          </h1>

          {/* STUDENT INFO SECTION */}
          <h2 className="text-2xl font-bold text-[#7A1C1C] mb-4"> Student Information </h2>
          <div className="grid grid-cols-4 gap-4 bg-[#EDEBDD] p-6 rounded-xl">
            <div className="flex flex-col">
              <label className="text-xs font-bold mb-1 ml-1">STUDENT NAME</label>
              <input name="name" value={selectedStudent.name} readOnly className={readOnlyStyle} />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold mb-1 ml-1">GRADE LEVEL</label>
              <input name="grade" value={selectedStudent.grade} readOnly className={readOnlyStyle} />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold mb-1 ml-1">SECTION</label>
              <input
                name="section"
                value={selectedStudent.section || ""}
                onChange={handleChange}
                placeholder="Enter Section"
                className={editableStyle}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold mb-1 ml-1">STATUS</label>
              <select
                name="status"
                value={selectedStudent.status}
                onChange={handleChange}
                className={editableStyle}
              >
                <option value="Enrolled">Enrolled</option>
                <option value="Dropped">Dropped</option>
              </select>
            </div>
          </div>

          {/* CONTACT INFO SECTION */}
          <h2 className="text-2xl font-bold text-[#7A1C1C] mt-8 mb-4">Contact Information</h2>
          <div className="bg-[#EDEBDD] p-6 rounded-xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="contact"
                value={selectedStudent.contact || ""}
                onChange={handleChange}
                placeholder="Contact Number"
                className={editableStyle}
              />
              <input
                name="email"
                value={selectedStudent.email || ""}
                onChange={handleChange}
                placeholder="Email Address"
                className={editableStyle}
              />
            </div>
            {/* Address Format: House number, street, barangay, city and province */}
            <div className="grid grid-cols-5 gap-2">
              <input name="houseNum" value={selectedStudent.houseNum || ""} onChange={handleChange} placeholder="House No." className={editableStyle} />
              <input name="street" value={selectedStudent.street || ""} onChange={handleChange} placeholder="Street" className={editableStyle} />
              <input name="barangay" value={selectedStudent.barangay || ""} onChange={handleChange} placeholder="Barangay" className={editableStyle} />
              <input name="city" value={selectedStudent.city || ""} onChange={handleChange} placeholder="City" className={editableStyle} />
              <input name="province" value={selectedStudent.province || ""} onChange={handleChange} placeholder="Province" className={editableStyle} />
            </div>
          </div>

          {/* EDUCATIONAL HISTORY (Magkaiba para sa JHS at SHS) */}
          {(isJHS || isSHS) && (
            <>
              <h2 className="text-2xl font-bold text-[#7A1C1C] mt-8 mb-4">Educational Background</h2>
              <div className="grid grid-cols-2 gap-4 bg-[#EDEBDD] p-6 rounded-xl">
                <input
                  name="elemSchool"
                  value={selectedStudent.elemSchool || ""}
                  onChange={handleChange}
                  placeholder="Elementary School Last Attended"
                  className={editableStyle}
                />
                {isSHS && (
                  <input
                    name="jhsSchool"
                    value={selectedStudent.jhsSchool || ""}
                    onChange={handleChange}
                    placeholder="Junior High School Last Attended"
                    className={editableStyle}
                  />
                )}
              </div>
            </>
          )}

          {/* PARENT / GUARDIAN INFO SECTION */}
          <h2 className="text-2xl font-bold text-[#7A1C1C] mt-8 mb-4">Parent / Guardian Information</h2>
          <div className="space-y-4">
            {/* Father  */}
            <div className="grid grid-cols-3 gap-4 bg-[#EDEBDD] p-6 rounded-xl">
              <div className="flex flex-col col-span-1">
                <label className="text-xs font-bold mb-1">FATHER'S NAME</label>
                <input name="fatherName" value={selectedStudent.fatherName || ""} readOnly className={readOnlyStyle} />
              </div>
              <input name="fatherContact" value={selectedStudent.fatherContact || ""} onChange={handleChange} placeholder="Contact Number" className={`${editableStyle} mt-5`} />
              <input name="fatherAddress" value={selectedStudent.fatherAddress || ""} onChange={handleChange} placeholder="Address (House #, Street, Brgy, City, Prov)" className={`${editableStyle} mt-5`} />
            </div>

            {/* Mother  */}
            <div className="grid grid-cols-3 gap-4 bg-[#EDEBDD] p-6 rounded-xl">
              <div className="flex flex-col col-span-1">
                <label className="text-xs font-bold mb-1">MOTHER'S NAME</label>
                <input name="motherName" value={selectedStudent.motherName || ""} readOnly className={readOnlyStyle} />
              </div>
              <input name="motherContact" value={selectedStudent.motherContact || ""} onChange={handleChange} placeholder="Contact Number" className={`${editableStyle} mt-5`} />
              <input name="motherAddress" value={selectedStudent.motherAddress || ""} onChange={handleChange} placeholder="Address (House #, Street, Brgy, City, Prov)" className={`${editableStyle} mt-5`} />
            </div>

            {/* Guardian  */}
            <div className="grid grid-cols-3 gap-4 bg-[#EDEBDD] p-6 rounded-xl">
              <div className="flex flex-col col-span-1">
                <label className="text-xs font-bold mb-1">GUARDIAN'S NAME</label>
                <input name="guardianName" value={selectedStudent.guardianName || ""} readOnly className={readOnlyStyle} />
              </div>
              <input name="guardianContact" value={selectedStudent.guardianContact || ""} onChange={handleChange} placeholder="Contact Number" className={`${editableStyle} mt-5`} />
              <input name="guardianAddress" value={selectedStudent.guardianAddress || ""} onChange={handleChange} placeholder="Address (House #, Street, Brgy, City, Prov)" className={`${editableStyle} mt-5`} />
            </div>
          </div>

          {/* UPDATE BUTTON */}
          <button onClick={handleUpdate} className="w-full mt-10 bg-red-800 hover:bg-red-900 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-lg active:scale-[0.98]">
            UPDATE RECORD
          </button>
        </div>
      </div>
    </div>
  );
}