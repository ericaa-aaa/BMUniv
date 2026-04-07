import { Routes, Route } from "react-router-dom";
import StudentSidebar from "../../Student/StudDashboard/StudentSidebar";
import Subjects from "../../Student/Subjects/StudentSubjectsTable";
import Archived from "../../Student/ArchivedSubjects/StudArchSubj";
import Settings from "../../Student/Settings/StudSettings";
import { BiSolidRightArrow } from "react-icons/bi";
import Profile from "../../../assets/images/faculty1.png"

export default function StudentDashboard() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <StudentSidebar />

      {/* Main */}
      <div className="flex-1 p-6 space-y-6 bg-[#F5F5F5]">

        {/* HEADER */}
        <div className="relative rounded-2xl overflow-hidden h-35">
          {/* Background */}
            <div className="absolute inset-0 bg-[url('/src/assets/images/bg.jpg')] bg-cover bg-center"></div>
                {/* Overlay */}
                    <div className="absolute inset-0 bg-white/75"></div>
                        {/* Content */}
                            <div className="relative grid grid-cols-2 justify-between items-center h-full px-6">

                    {/* Left */}
                    <div className="">
                        <div className="flex items-center gap-4">
                            <img src={Profile} alt="prowfile" className="w-14 h-14 rounded-full"></img>
                                <p className="text-[#1B1717] font-medium text-lg">Dela Cruz, Llyne Say</p>
                        </div>
                    </div>
                {/* Right */}
                <div className="">
                    <div className="text-right space-y-1 text-[#7A1C1C] font-medium">
                        <p className="flex gap-2">
                            <span><BiSolidRightArrow /></span>
                            Batangas Metropolitan University
                        </p>
                        <p className="flex gap-2">
                            <span><BiSolidRightArrow /></span>
                            Grade 12 - STEM
                        </p>
                        <p className="flex gap-2 text-green-600 font-semibold">
                            <span><BiSolidRightArrow /></span>
                            ENROLLED
                        </p>
                    </div>
                </div>

          </div>
        </div>
        {/* TOP PANEL */}
        <div className="bg-[#EDEBDD] h-45 rounded-xl"></div>
        {/* (ROUTES HERE) */}
        <div className="bg-[#EDEBDD] h-75 rounded-xl p-4 overflow-auto">
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