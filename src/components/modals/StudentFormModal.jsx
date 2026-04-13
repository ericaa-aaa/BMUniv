import { IoMdCloseCircleOutline } from "react-icons/io";

export default function StudentFormModal({
  showModal,
  setShowModal,
  selectedStudent,
  handleChange,
  handleUpdate,
}) {
  if (!showModal || !selectedStudent) return null;

  // Reusable Styles
  const readOnlyStyle = "border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed text-gray-600 w-full text-sm";
  const editableStyle = "border rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-red-800 outline-none w-full text-sm transition-all";
  const labelStyle = "text-[10px] font-bold mb-1 ml-1 text-gray-500 uppercase";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center py-10 px-4">
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative p-6 md:p-8">
          
          <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-red-800 transition-colors">
            <IoMdCloseCircleOutline size={30} />
          </button>

          <div className="bg-red-800 text-white text-center py-4 rounded-xl mb-8">
            <h1 className="text-xl font-bold uppercase tracking-wide">Update Student Record</h1>
          </div>

          <div className="space-y-8">
            {/* 1. READ-ONLY HEADER INFO (Not in your patch list) */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#EDEBDD] p-5 rounded-xl">
                <div className="flex flex-col col-span-2">
                  <label className={labelStyle}>Full Name (Generated)</label>
                  <input value={selectedStudent.fullname || ""} readOnly className={readOnlyStyle} />
                </div>
                <div className="flex flex-col">
                  <label className={labelStyle}>Current Grade Level</label>
                  <input value={selectedStudent.grade_level || ""} readOnly className={readOnlyStyle} />
                </div>
              </div>
            </section>

            {/* 2. EDITABLE PERSONAL INFO (In your patch list) */}
            <section>
              <h2 className="text-lg font-bold text-[#7A1C1C] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-red-800 rounded-full"></span> Basic Information
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col"><label className={labelStyle}>Last Name</label><input name="lastname" value={selectedStudent.lastname || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>First Name</label><input name="firstname" value={selectedStudent.firstname || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Middle Name</label><input name="middlename" value={selectedStudent.middlename || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Ext.</label><input name="ext" value={selectedStudent.ext || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Age</label><input name="age" value={selectedStudent.age || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Gender</label><input name="gender" value={selectedStudent.gender || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Civil Status</label><input name="civil_status" value={selectedStudent.civil_status || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Birthdate</label><input type="date" name="birthdate" value={selectedStudent.birthdate || ""} onChange={handleChange} className={editableStyle} /></div>
              </div>
            </section>

            {/* 3. BOOLEAN & ADDITIONAL INFO */}
            <section className="bg-gray-50 p-5 rounded-xl border border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="flex flex-col">
                  <label className={labelStyle}>IP Community?</label>
                  <select name="is_ip_community" value={selectedStudent.is_ip_community} onChange={handleChange} className={editableStyle}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className={labelStyle}>Transferee?</label>
                  <select name="is_transferee" value={selectedStudent.is_transferee} onChange={handleChange} className={editableStyle}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="flex flex-col"><label className={labelStyle}>Weight(KG)</label><input name="weight" value={selectedStudent.weight || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Height(CM)</label><input name="height" value={selectedStudent.height || ""} onChange={handleChange} className={editableStyle} /></div>
            </section>

            {/* 4. ADDRESSES (All in your patch list) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#EDEBDD] p-5 rounded-xl">
                <p className="text-[11px] font-black text-red-800 mb-3">CURRENT ADDRESS</p>
                <div className="grid grid-cols-2 gap-2">
                  <input name="curr_house_no" placeholder="House No." value={selectedStudent.curr_house_no || ""} onChange={handleChange} className={editableStyle} />
                  <input name="curr_street" placeholder="Street" value={selectedStudent.curr_street || ""} onChange={handleChange} className={editableStyle} />
                  <input name="curr_barangay" placeholder="Barangay" value={selectedStudent.curr_barangay || ""} onChange={handleChange} className={editableStyle} />
                  <input name="curr_municipality" placeholder="Municipality" value={selectedStudent.curr_municipality || ""} onChange={handleChange} className={editableStyle} />
                  <input name="curr_province" placeholder="Province" value={selectedStudent.curr_province || ""} onChange={handleChange} className={`${editableStyle} col-span-2`} />
                </div>
              </div>
              <div className="bg-[#EDEBDD] p-5 rounded-xl">
                <p className="text-[11px] font-black text-red-800 mb-3">PERMANENT ADDRESS</p>
                <div className="grid grid-cols-2 gap-2">
                  <input name="perm_house_no" placeholder="House No." value={selectedStudent.perm_house_no || ""} onChange={handleChange} className={editableStyle} />
                  <input name="perm_street" placeholder="Street" value={selectedStudent.perm_street || ""} onChange={handleChange} className={editableStyle} />
                  <input name="perm_barangay" placeholder="Barangay" value={selectedStudent.perm_barangay || ""} onChange={handleChange} className={editableStyle} />
                  <input name="perm_municipality" placeholder="Municipality" value={selectedStudent.perm_municipality || ""} onChange={handleChange} className={editableStyle} />
                  <input name="perm_province" placeholder="Province" value={selectedStudent.perm_province || ""} onChange={handleChange} className={`${editableStyle} col-span-2`} />
                </div>
              </div>
            </section>

            {/* 5. PARENT INFO (Strictly following the f_, m_, and g_ naming) */}
<section className="space-y-4">
  <h2 className="text-xl font-bold text-[#7A1C1C] mb-4 flex items-center gap-2">
    <span className="w-1.5 h-6 bg-red-800 rounded-full"></span> 
    Family Background
  </h2>
  <div className="grid grid-cols-1 gap-6">
    {[
      { 
        label: "FATHER", 
        fName: "father_first_name", lName: "father_last_name", contact: "father_contact", occup: "father_occupation",
        hNo: "f_house_no", str: "f_street", brgy: "f_barangay", mun: "f_municipality", prov: "f_province" 
      },
      { 
        label: "MOTHER", 
        fName: "mother_first_name", lName: "mother_last_name", contact: "mother_contact", occup: "mother_occupation",
        hNo: "m_house_no", str: "m_street", brgy: "m_barangay", mun: "m_municipality", prov: "m_province" 
      },
      { 
        label: "GUARDIAN", 
        fName: "guardian_first_name", lName: "guardian_last_name", contact: "guardian_contact", occup: "guardian_relationship",
        hNo: "g_house_no", str: "g_street", brgy: "g_barangay", mun: "g_municipality", prov: "g_province" 
      }
    ].map((p) => (
      <div key={p.label} className="bg-gray-50 border border-gray-200 p-5 rounded-xl space-y-5 shadow-sm">
        {/* --- PERSONAL INFO ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className={labelStyle}>{p.label}'S FIRST NAME</label>
            <input name={p.fName} value={selectedStudent[p.fName] || ""} onChange={handleChange} className={editableStyle} />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>{p.label}'S LAST NAME</label>
            <input name={p.lName} value={selectedStudent[p.lName] || ""} onChange={handleChange} className={editableStyle} />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>CONTACT NUMBER</label>
            <input name={p.contact} value={selectedStudent[p.contact] || ""} onChange={handleChange} className={editableStyle} />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>{p.label === "GUARDIAN" ? "RELATIONSHIP" : "OCCUPATION"}</label>
            <input name={p.occup} value={selectedStudent[p.occup] || ""} onChange={handleChange} className={editableStyle} />
          </div>
        </div>

        {/* --- FULL ADDRESS ROW WITH LABELS --- */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-[10px] font-black text-red-800 mb-3 tracking-widest uppercase">{p.label}'S COMPLETE ADDRESS</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="flex flex-col">
              <label className={labelStyle}>HOUSE NO.</label>
              <input name={p.hNo} value={selectedStudent[p.hNo] || ""} onChange={handleChange} placeholder="House No." className={editableStyle} />
            </div>
            <div className="flex flex-col">
              <label className={labelStyle}>STREET</label>
              <input name={p.str} value={selectedStudent[p.str] || ""} onChange={handleChange} placeholder="Street" className={editableStyle} />
            </div>
            <div className="flex flex-col">
              <label className={labelStyle}>BARANGAY</label>
              <input name={p.brgy} value={selectedStudent[p.brgy] || ""} onChange={handleChange} placeholder="Barangay" className={editableStyle} />
            </div>
            <div className="flex flex-col">
              <label className={labelStyle}>MUNICIPALITY</label>
              <input name={p.mun} value={selectedStudent[p.mun] || ""} onChange={handleChange} placeholder="Municipality" className={editableStyle} />
            </div>
            <div className="flex flex-col">
              <label className={labelStyle}>PROVINCE</label>
              <input name={p.prov} value={selectedStudent[p.prov] || ""} onChange={handleChange} placeholder="Province" className={editableStyle} />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
          </div>

          <div className="mt-10">
            <button onClick={handleUpdate} className="w-full bg-red-800 hover:bg-red-900 text-white py-4 rounded-xl font-bold shadow-lg transition-transform active:scale-[0.99]">
              SAVE UPDATED RECORD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}