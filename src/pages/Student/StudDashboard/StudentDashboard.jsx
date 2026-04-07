import { Routes, Route } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import Subjects from "../Subjects/StudentSubjectsTable";
import Archived from "../ArchivedSubjects/StudArchSubj";
import Settings from "../Settings/StudSettings";
import { IoMdArrowDropright } from "react-icons/io";

export default function StudentDashboard() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <StudentSidebar />

      {/* Main */}
      <div className="flex-1 p-6 space-y-6 bg-[#F5F5F5]">

        {/* HEADER */}
        <div className="relative rounded-2xl overflow-hidden h-[140px]">
          {/* Background */}
          <div className="absolute inset-0 bg-[url('/src/assets/images/bg.jpg')] bg-cover bg-center"></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/75"></div>
          {/* Content */}
          <div className="relative flex justify-between items-center h-full px-6">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-black rounded-full"></div>
              <p className="text-[#1B1717] font-medium text-lg">
                Dela Cruz, Juan M.
              </p>
            </div>
            {/* Right */}
            <div className="text-right space-y-1 text-[#7A1C1C] font-medium">

              <p className="flex items-center justify-end gap-2">
                <span><IoMdArrowDropright /></span>
                Batangas Metropolitan University
              </p>

              <p className="flex items-center justify-end gap-2">
                <span><IoMdArrowDropright /></span>
                Grade 1 - Makakalikasan
              </p>

              <p className="flex items-center justify-end gap-2 text-green-600 font-semibold">
                <span><IoMdArrowDropright /></span>
                ENROLLED
              </p>

            </div>
          </div>
        </div>
        {/* TOP PANEL */}
        <div className="bg-[#EDEBDD] h-[180px] rounded-xl"></div>
        {/* BOTTOM PANEL (ROUTES HERE) */}
        <div className="bg-[#EDEBDD] h-[300px] rounded-xl p-4 overflow-auto">
          <Routes>
            <Route path="/studsubj/*" element={<Subjects />} />
            <Route path="/archsubj/*" element={<Archived />} />
            <Route path="/settings/*" element={<Settings />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}