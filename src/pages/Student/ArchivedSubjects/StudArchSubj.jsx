import React from 'react';
import { User } from "lucide-react";

export default function ArchivedSubjects() {
  const archived = [
    {
      subject: "Computer",
      teacher: "Mendoza, Ayan L.",
      schoolYear: "2024-2025",
    },
    {
      subject: "Values Education",
      teacher: "Villanueva, Precy Z.",
      schoolYear: "2024-2025",
    },
    {
      subject: "Music",
      teacher: "Ramos, Merly K.",
      schoolYear: "2023-2024",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
    {/* STUDENT INFO CARD */}
      <div className="rounded-3xl overflow-hidden h-56 shadow-lg relative mb-10"
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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Title */}
        <div className="bg-[#7B0000] text-white px-6 py-4 text-xl font-bold border-b border-white/20">
          Archived Subjects
        </div>

        {/* Custom Grid Table */}
        <div className="w-full">
          {/* Table Header Row */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr] bg-[#8B0000] text-white text-center font-semibold sticky top-0 z-10 shadow-md">
            <div className="p-4 border-r border-white/10">Subject</div>
            <div className="p-4 border-r border-white/10">Teacher</div>
            <div className="p-4">School Year</div>
          </div>

          {/* Table Body Rows */}
          <div className="flex flex-col">
            {archived.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-[2fr_1.5fr_1fr] bg-[#ECE9DF] border-b border-white text-center items-center text-sm"
              >
                <div className="p-5 border-r border-white/20 font-medium">{item.subject}</div>
                <div className="p-5 border-r border-white/20">{item.teacher}</div>
                <div className="p-5">{item.schoolYear}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}