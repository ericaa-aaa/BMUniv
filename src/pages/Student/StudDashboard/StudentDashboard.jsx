import { useState } from "react";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { IoClose } from "react-icons/io5"; 
import { User as UserIcon } from "lucide-react"; 
import { TfiAnnouncement } from "react-icons/tfi";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function StudentDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Password updated successfully!");
    setShowPasswordModal(false);
    setShowPassword(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const [student] = useState(() => ({
    name: localStorage.getItem("activeUser") || "Student User",
    grade: localStorage.getItem("studentGrade") || "N/A",
    section: localStorage.getItem("studentSection") || "Unassigned",
    category: localStorage.getItem("studentCategory") || "Student",
    status: localStorage.getItem("studentStatus") || "ENROLLED"
  }));

  return (
    <div className="flex bg-gray-100 overflow-hidden">
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="rounded-3xl overflow-hidden h-56 shadow-lg relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585')",
            backgroundSize: "cover",
            backgroundPosition: "center",}}>
          <div className="absolute inset-0 bg-white/70 flex items-center justify-between px-10">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                 <UserIcon size={50} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 uppercase">
                {student.name}
              </h2>
            </div>
            <div className="m-2 p-2 pr-15">
              <div className="space-y-3 text-lg font-semibold text-[#7B0000]">
                <p>▸ Batangas Metropolitan University</p>
                <p>▸ {student.category} - Grade {student.grade}</p>
                <p> ▸ Section: {student.section}</p>
                <p className={student.status === "ENROLLED" ? "text-green-600" : "text-amber-600"}> ▸ {student.status}</p>
              </div>
            </div>

            <div className="absolute top-2 right-6 z-20">
              <button onClick={() => setShowMenu(!showMenu)} className="p-1 hover:bg-black/10 rounded-full transition-colors">
                <PiDotsThreeCircleLight size={32} className="text-black" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <button onClick={() => {
                      setShowPasswordModal(true);
                      setShowMenu(false);}}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors border-2 border-[#630000] rounded-xl">
                    Update Password
                  </button>
                </div> )}
            </div>

          </div>
        </div>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative mx-4">
              <button onClick={() => {
                  setShowPasswordModal(false);
                  setShowPassword(false);}} 
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
                <IoClose size={28} />
              </button>

              <h2 className="text-2xl font-bold text-[#7A1C1C] mb-6">Update Password</h2>

              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                {[
                  { name: "currentPassword", placeholder: "Current Password" },
                  { name: "newPassword", placeholder: "New Password" },
                  { name: "confirmPassword", placeholder: "Confirm Password" }
                ].map((field) => (
                  <div key={field.name} className="relative flex items-center">
                    <input type={showPassword ? "text" : "password"}
                      name={field.name} placeholder={field.placeholder}
                      value={passwordForm[field.name]} onChange={handleChange}
                      required className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#7A1C1C] border-gray-300 transition-all"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-400 hover:text-[#7A1C1C] transition-colors">
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>))}

                <button type="submit" className="w-full bg-[#7A1C1C] text-white py-3 rounded-lg font-semibold hover:bg-[#5a1515] transition-all mt-4 active:scale-95 shadow-md">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="bg-[#EDEBDD] h-48 rounded-xl shadow-sm border border-black/5 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#7B0000] mb-2 uppercase tracking-tight">
                <TfiAnnouncement className="shrink-0 font-bold" /> 
                <span>Announcements</span>
            </h3>
            <p className="text-gray-500 italic">No new announcements today.</p>
        </div>
        
        <div className="bg-[#EDEBDD] h-72 rounded-xl p-6 overflow-hidden shadow-sm border border-black/5 flex flex-col">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#7B0000] mb-4 uppercase tracking-tight">
                <AiOutlineSchedule className="shrink-0" />
                <span>Schedule & Tasks</span>
            </h3>
            <div className="flex flex-col items-center justify-center grow opacity-30">
                <p className="text-xl font-semibold">Course Content Coming Soon</p>
            </div>
        </div>
      </div>
    </div>
  );
}