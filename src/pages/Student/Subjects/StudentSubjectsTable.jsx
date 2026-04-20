import React from "react";
import { User } from "lucide-react";

export default function StudentSubjects() {
  const subjects = [
    { course_code: "Fili 2", subject: "Filipino", teacher: "Dela Cruz, Juan M.", schedule: "MWF" },
    { course_code: "Eng 2", subject: "English", teacher: "Reyes, Carlo C.", schedule: "TTH" },
    { course_code: "Sci 2", subject: "Science", teacher: "Mendoza, Ayan L.", schedule: "MWF" },
    { course_code: "Math 2", subject: "Mathematics", teacher: "Balabo, Maine M.", schedule: "MWF" },
    { course_code: "AP 2", subject: "Araling Panlipunan", teacher: "Villanueva, Precy Z.", schedule: "TTH" },
    { course_code: "Mep 2", subject: "MAPEH", teacher: "Ramos, Merly K.", schedule: "F" },
    { course_code: "EPP 2", subject: "EPP", teacher: "Atienza, Princess R.", schedule: "MWF" },
    { course_code: "GM 2", subject: "GMRC", teacher: "Mancil, Clarish P.", schedule: "TTH" },
  ];

  return (
    <div className="p-8 bg-gray-100">
      {/* STUDENT INFO CARD */}
      <div className="rounded-3xl overflow-hidden h-56 shadow-lg relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-white/70 flex items-center justify-between px-10">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
              <User size={50} className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold">Dela Cruz, Juan M.</h2>
          </div>
          <div className="space-y-3 text-lg font-semibold text-[#7B0000]">
            <p>▸ Batangas Metropolitan University</p>
            <p>▸ Grade 12 - ABM</p>
            <p>▸ Second Semester</p>
            <p className="text-green-600">▸ ENROLLED</p>
          </div>
        </div>
      </div>

      {/* SUBJECT GRID TABLE */}
      <div className="mt-8 overflow-hidden rounded-2xl shadow-lg border border-white">
        <div className="grid grid-cols-[1fr_2fr_1.5fr_1fr] bg-white gap-0.5">
          {/* Table Header */}
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold sticky top-0 z-10">Course Code</div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold sticky top-0 z-10">Subjects</div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold sticky top-0 z-10">Teacher</div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold sticky top-0 z-10">Schedule</div>
          {/* Table Body */}
          {subjects.map((item, index) => (
            <React.Fragment key={index}>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm">{item.course_code}</div>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm font-medium">{item.subject}</div>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm">{item.teacher}</div>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm">{item.schedule}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}