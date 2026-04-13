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

  // Reusable Styles
  const readOnlyStyle = "border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed text-gray-600 w-full";
  const editableStyle = "border rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-red-800 outline-none w-full transition-all";

  // Helper to generate the default address string from student info
  const studentFullAddress = [
    selectedStudent.houseNum,
    selectedStudent.street,
    selectedStudent.barangay,
    selectedStudent.city,
    selectedStudent.province
  ].filter(Boolean).join(", ");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center py-10 px-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative p-6 md:p-8">
          
          {/* CLOSE BUTTON */}
          <button 
            onClick={() => setShowModal(false)} 
            className="absolute top-5 right-5 text-gray-400 hover:text-red-800 transition-colors"
          >
            <IoMdCloseCircleOutline size={26} />
          </button>

          {/* HEADER */}
          <div className="bg-red-800 text-white text-center py-4 rounded-xl mb-8">
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wide">
              Student Information System
            </h1>
          </div>

          <div className="space-y-8">
            {/* STUDENT INFO SECTION */}
            <section>
              <h2 className="text-xl font-bold text-[#7A1C1C] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
                Student Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#EDEBDD] p-5 rounded-xl">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold mb-1 ml-1 text-gray-600 uppercase">Student Name</label>
                  <input name="name" value={selectedStudent.name} readOnly className={readOnlyStyle} />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold mb-1 ml-1 text-gray-600 uppercase">Grade Level</label>
                  <input name="grade" value={selectedStudent.grade} readOnly className={readOnlyStyle} />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold mb-1 ml-1 text-gray-600 uppercase">Section</label>
                  <input name="section" value={selectedStudent.section || ""} onChange={handleChange} placeholder="Section" className={editableStyle} />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold mb-1 ml-1 text-gray-600 uppercase">Status</label>
                  <select name="status" value={selectedStudent.status} onChange={handleChange} className={editableStyle}>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Dropped">Dropped</option>
                  </select>
                </div>
              </div>
            </section>

            {/* CONTACT INFO SECTION */}
            <section>
              <h2 className="text-xl font-bold text-[#7A1C1C] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
                Contact Information
              </h2>
              <div className="bg-[#EDEBDD] p-5 rounded-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="contact" value={selectedStudent.contact || ""} onChange={handleChange} placeholder="Contact Number" className={editableStyle} />
                  <input name="email" value={selectedStudent.email || ""} onChange={handleChange} placeholder="Email Address" className={editableStyle} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <input name="houseNum" value={selectedStudent.houseNum || ""} onChange={handleChange} placeholder="House No." className={editableStyle} />
                  <input name="street" value={selectedStudent.street || ""} onChange={handleChange} placeholder="Street" className={editableStyle} />
                  <input name="barangay" value={selectedStudent.barangay || ""} onChange={handleChange} placeholder="Barangay" className={editableStyle} />
                  <input name="city" value={selectedStudent.city || ""} onChange={handleChange} placeholder="City" className={editableStyle} />
                  <input name="province" value={selectedStudent.province || ""} onChange={handleChange} placeholder="Province" className={editableStyle} />
                </div>
              </div>
            </section>

            {/* PARENT / GUARDIAN INFO SECTION */}
            <section>
              <h2 className="text-xl font-bold text-[#7A1C1C] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
                Parent / Guardian Information
              </h2>
              <div className="space-y-3">
                {[
                  { label: "FATHER", name: "fatherName", contact: "fatherContact", address: "fatherAddress" },
                  { label: "MOTHER", name: "motherName", contact: "motherContact", address: "motherAddress" },
                  { label: "GUARDIAN", name: "guardianName", contact: "guardianContact", address: "guardianAddress" }
                ].map((p) => (
                  <div key={p.label} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#EDEBDD] p-5 rounded-xl items-end">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold mb-1 text-gray-600">{p.label}'S NAME</label>
                      <input name={p.name} value={selectedStudent[p.name] || ""} readOnly className={readOnlyStyle} />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold mb-1 text-gray-600">CONTACT NUMBER</label>
                      <input name={p.contact} value={selectedStudent[p.contact] || ""} onChange={handleChange} placeholder="Contact Number" className={editableStyle} />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold mb-1 text-gray-600">ADDRESS (AUTO)</label>
                      <input 
                        name={p.address} 
                        value={selectedStudent[p.address] || studentFullAddress} 
                        readOnly 
                        className={readOnlyStyle} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* UPDATE BUTTON */}
          <div className="mt-10">
            <button 
              onClick={handleUpdate} 
              className="w-full bg-red-800 hover:bg-red-900 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-lg active:scale-[0.99]"
            >
              UPDATE RECORD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}