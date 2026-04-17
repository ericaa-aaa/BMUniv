import { useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Profile from "../../../assets/images/faculty1.png";

export default function StudentDashboard() {
  const [showMenu, setShowMenu] = useState(false);

  // --- DYNAMIC DATA STATE ---
const [student, setStudent] = useState(() => ({
    name: localStorage.getItem("activeUser") || "Student User",
    grade: localStorage.getItem("studentGrade") || "N/A",
    section: localStorage.getItem("studentSection") || "Unassigned",
    category: localStorage.getItem("studentCategory") || "Student",
    status: localStorage.getItem("studentStatus") || "ENROLLED"
  }));

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">

        {/* PROFILE HEADER CARD */}
        <div 
          className="rounded-3xl overflow-hidden h-56 shadow-lg relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585')",
            backgroundSize: "cover",
            backgroundPosition: "center", 
          }}>
          <div className="absolute inset-0 bg-white/70 flex items-center justify-between px-10">

            <div className="flex items-center gap-5">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                 <img src={Profile} alt="profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 uppercase">
                {student.name}
              </h2>
            </div>

            <div className="space-y-3 text-lg font-semibold text-[#7B0000] text-right">
              <p>▸ Batangas Metropolitan University</p>
              <p>▸ {student.category} - Grade {student.grade}</p>
              <p className="text-gray-600 italic">Section: {student.section}</p>
              {/* Dynamic Status Display */}
              <p className={student.status === "ENROLLED" ? "text-green-600" : "text-amber-600"}>
                ▸ {student.status}
              </p>
            </div>

            {/* OPTIONS MENU */}
            <div className="absolute top-6 right-6 z-20">
              <button 
                onClick={() => setShowMenu(!showMenu)} 
                className="p-1 hover:bg-black/5 rounded-full transition-colors"
              >
                <BiDotsHorizontalRounded size={32} className="text-gray-700" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <button 
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DASHBOARD PANELS */}
        <div className="bg-[#EDEBDD] h-48 rounded-xl shadow-sm border border-black/5 p-6">
            <h3 className="text-lg font-bold text-[#7B0000] mb-2 uppercase tracking-tight">Announcements</h3>
            <p className="text-gray-500 italic">No new announcements today.</p>
        </div>
        
        <div className="bg-[#EDEBDD] h-72 rounded-xl p-6 overflow-auto shadow-sm border border-black/5">
            <h3 className="text-lg font-bold text-[#7B0000] mb-4 uppercase tracking-tight">Schedule & Tasks</h3>
            <div className="flex flex-col items-center justify-center h-full opacity-30">
                <p className="text-xl font-semibold">Course Content Coming Soon</p>
            </div>
        </div>
      </div>
    </div>
  );
}