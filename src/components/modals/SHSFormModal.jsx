import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { SeHighSchoolStudentService } from "../../services/sehighstudentservice";

export default function SHSFormModal({
  showModal,
  setShowModal,
  selectedStudent,
  handleChange,
  onUpdateSuccess,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!showModal || !selectedStudent) return null;

    const handleUpdate = async () => {
        setIsSubmitting(true);
        try {
          await SeHighSchoolStudentService.updateStudent(selectedStudent.id, selectedStudent);

          alert("Student record updated successfully!");

          if (onUpdateSuccess) onUpdateSuccess();
          setShowModal(false);
        } catch (error) {
          alert(`Update failed: ${error.message}`);
        } finally {
          setIsSubmitting(false);
        }
      };

  const readOnlyStyle = "border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-100 cursor-not-allowed text-gray-500 w-full text-sm font-medium";
  const editableStyle = "border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none w-full text-sm transition-all";
  const labelStyle = "text-[10px] font-bold mb-1.5 ml-1 text-gray-400 uppercase tracking-tight";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative p-6 md:p-10 border border-gray-100">
          
           <button 
            disabled={isSubmitting}
            onClick={() => setShowModal(false)} 
            className="absolute top-6 right-6 text-gray-400 hover:text-red-800 transition-colors bg-gray-50 p-1 rounded-full disabled:opacity-50">
            <IoMdCloseCircleOutline size={28} />
          </button>

          <div className="bg-red-800 text-white text-center py-5 rounded-2xl mb-10 shadow-md">
            <h1 className="text-2xl font-black uppercase tracking-widest">Senior High Student Record</h1>
            <p className="text-red-100 text-[10px] mt-1 opacity-80 italic font-medium">Update Information System</p>
          </div>

          <div className="space-y-10">

            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col col-span-2">
                  <label className={labelStyle}>Full Name </label>
                  <input value={selectedStudent.fullname || ""} readOnly className={readOnlyStyle} />
                </div>
                <div className="flex flex-col">
                  <label className={labelStyle}>Current Grade Level </label>
                  <input value={selectedStudent.grade_level || ""} readOnly className={readOnlyStyle} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#7A1C1C] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-800 rounded-full"></span> Educational Background
              </h2>
              <div className="space-y-4">
{/* elem */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="flex flex-col md:col-span-3">
                    <label className={labelStyle}>Last Elementary School Attended</label>
                    <input name="elem_school" value={selectedStudent.elschool_attended || ""} onChange={handleChange} className={editableStyle} placeholder="Name of Elementary School" />
                  </div>
                  <div className="flex flex-col">
                    <label className={labelStyle}>Year Completed</label>
                    <input name="elem_year" value={selectedStudent.school_year || ""} onChange={handleChange} className={editableStyle} placeholder="YYYY-YYYY" />
                  </div>
                </div>
{/* jhs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="flex flex-col md:col-span-3">
                    <label className={labelStyle}>Last Junior High School Attended</label>
                    <input name="jhs_school" value={selectedStudent.highschool_attended || ""} onChange={handleChange} className={editableStyle} placeholder="Name of Junior High School" />
                  </div>
                  <div className="flex flex-col">
                    <label className={labelStyle}>Year Completed</label>
                    <input name="jhs_year" value={selectedStudent.highschool_year || ""} onChange={handleChange} className={editableStyle} placeholder="YYYY-YYYY" />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#7A1C1C] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-800 rounded-full"></span> Basic Information
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5">
                <div className="flex flex-col"><label className={labelStyle}>Age</label><input name="age" value={selectedStudent.age || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Gender</label><input name="gender" value={selectedStudent.gender || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Civil Status</label><input name="civil_status" value={selectedStudent.civil_status || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Birthdate</label><input type="date" name="birthdate" value={selectedStudent.birthdate || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col md:col-span-2"> <label className={labelStyle}>Birth Place</label><input name="place_of_birth" value={selectedStudent.place_of_birth || ""} onChange={handleChange} className={editableStyle}/></div>
                <div className="flex flex-col"><label className={labelStyle}>Weight (kg)</label><input name="weight" value={selectedStudent.weight || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Height (cm)</label><input name="height" value={selectedStudent.height || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col md:col-span-2"><label className={labelStyle}>Citizenship</label><input name="citizenship" value={selectedStudent.citizenship || ""} onChange={handleChange} className={editableStyle} /></div>
                <div className="flex flex-col"><label className={labelStyle}>Mother Tongue</label><input name="mother_tongue" value={selectedStudent.mother_tongue || ""} onChange={handleChange} className={editableStyle}/></div>
                <div className="flex flex-col"><label className={labelStyle}>Religion</label><input name="religion" value={selectedStudent.religion || ""} onChange={handleChange} className={editableStyle}/></div>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className={labelStyle}>Enrollment Status</label>
                <select 
                  name="status" 
                  value={selectedStudent.status || ""} 
                  onChange={handleChange} 
                  className={`${editableStyle} font-bold ${
                    selectedStudent.status === "Enrolled" ? "text-green-600" : 
                    selectedStudent.status === "Dropped" ? "text-red-600" : "" }`}>
                  <option value="">Select Status</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>
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
              <div className="flex flex-col">
                    <label className={labelStyle}>Returning Learner?</label>
                    <select name="is_RL" value={selectedStudent.is_RL} onChange={handleChange} className={editableStyle}>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#EDEBDD]/40 p-6 rounded-2xl border border-[#EDEBDD]">
                <p className="text-[11px] font-black text-red-800 mb-4 tracking-tighter uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-800 rounded-full"></span> Current Residence
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <input name="curr_house_no" placeholder="House No." value={selectedStudent.curr_house_no || ""} onChange={handleChange} className={editableStyle} />
                  <input name="curr_street" placeholder="Street" value={selectedStudent.curr_street || ""} onChange={handleChange} className={editableStyle} />
                  <input name="curr_barangay" placeholder="Barangay" value={selectedStudent.curr_barangay || ""} onChange={handleChange} className={editableStyle} />
                  <input name="curr_municipality" placeholder="Municipality" value={selectedStudent.curr_municipality || ""} onChange={handleChange} className={editableStyle} />
                  <input name="curr_province" placeholder="Province" value={selectedStudent.curr_province || ""} onChange={handleChange} className={`${editableStyle} col-span-2`} />
                </div>
              </div>
              <div className="bg-[#EDEBDD]/40 p-6 rounded-2xl border border-[#EDEBDD]">
                <p className="text-[11px] font-black text-red-800 mb-4 tracking-tighter uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-800 rounded-full"></span> Permanent Residence
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <input name="perm_house_no" placeholder="House No." value={selectedStudent.perm_house_no || ""} onChange={handleChange} className={editableStyle} />
                  <input name="perm_street" placeholder="Street" value={selectedStudent.perm_street || ""} onChange={handleChange} className={editableStyle} />
                  <input name="perm_barangay" placeholder="Barangay" value={selectedStudent.perm_barangay || ""} onChange={handleChange} className={editableStyle} />
                  <input name="perm_municipality" placeholder="Municipality" value={selectedStudent.perm_municipality || ""} onChange={handleChange} className={editableStyle} />
                  <input name="perm_province" placeholder="Province" value={selectedStudent.perm_province || ""} onChange={handleChange} className={`${editableStyle} col-span-2`} />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-[#7A1C1C] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-800 rounded-full"></span> Family Background
              </h2>
              <div className="grid grid-cols-1 gap-8">
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
                  <div key={p.label} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl space-y-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <label className={labelStyle}>{p.label}'S NAME</label>
                        <input value={`${selectedStudent[p.fName] || ''} ${selectedStudent[p.lName] || ''}`} readOnly className={readOnlyStyle} />
                      </div>
                      <div className="flex flex-col">
                        <label className={labelStyle}>CONTACT NO. </label>
                        <input name={p.contact} value={selectedStudent[p.contact] || ""} onChange={handleChange} className={editableStyle} />
                      </div>
                      <div className="flex flex-col md:col-span-2">
                        <label className={labelStyle}>{p.label === "GUARDIAN" ? "RELATIONSHIP" : "OCCUPATION"}</label>
                        <input name={p.occup} value={selectedStudent[p.occup] || ""} onChange={handleChange} className={editableStyle} />
                      </div>
                    </div>
                    <div className="pt-5 border-t border-gray-200">
                      <p className="text-[10px] font-black text-gray-400 mb-4 tracking-widest uppercase italic">Default {p.label} Residence</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <input value={selectedStudent[p.hNo] || ""} readOnly className={readOnlyStyle} placeholder="No." />
                        <input value={selectedStudent[p.str] || ""} readOnly className={readOnlyStyle} placeholder="Street" />
                        <input value={selectedStudent[p.brgy] || ""} readOnly className={readOnlyStyle} placeholder="Brgy" />
                        <input value={selectedStudent[p.mun] || ""} readOnly className={readOnlyStyle} placeholder="Mun" />
                        <input value={selectedStudent[p.prov] || ""} readOnly className={readOnlyStyle} placeholder="Prov" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-12">
            <button 
              onClick={handleUpdate} 
              disabled={isSubmitting}
              className={`w-full text-white py-5 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-[0.98] ${
                isSubmitting ? "bg-gray-400 cursor-wait" : "bg-red-800 hover:bg-red-900"
              }`}>
              {isSubmitting ? "UPDATING RECORD..." : "SAVE UPDATED RECORD"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}