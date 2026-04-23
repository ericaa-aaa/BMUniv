import React from "react";
import { User } from "lucide-react";

export default function ArchivedSubjects() {
  const archived = [
    {
      subject: "Computer",
      teacher: "Mendoza, Ayan L.",
      schoolYear: "2024-2025",
    },
    {
      subject: "filipino",
      teacher: "Villanueva, Precy Z.",
      schoolYear: "2024-2025",
    },
    { subject: "English", teacher: "Reyes, Carlo C.", schoolYear: "2024-2025" },
    {
      subject: "Mathematics",
      teacher: "Mendoza, Ayan L.",
      schoolYear: "2024-2025",
    },
    {
      subject: "Science",
      teacher: "Balabo, Maine M.",
      schoolYear: "2024-2025",
    },
    {
      subject: "Araling panlipunan",
      teacher: "Princess R.Precy Z.",
      schoolYear: "2024-2025",
    },
    { subject: "Music", teacher: "Ramos, Merly K.", schoolYear: "2023-2024" },
  ];

  return (
    <div className="font-['Inter'] p-8 bg-gray-100">
      <div
        className="rounded-3xl overflow-hidden h-56 shadow-lg relative mb-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/70 flex items-center justify-between px-10">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
              <User size={50} className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold">Dela Cruz, Juan M.</h2>
          </div>
          <div className="pr-17 space-y-3 text-lg font-semibold text-[#7B0000]">
            <p>▸ Batangas Metropolitan University</p>
            <p>▸ Grade 12 - ABM</p>
            <p>▸ Second Semester</p>
            <p className="text-green-600">▸ ENROLLED</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <div className="grid grid-cols-[2fr_1.5fr_1fr] bg-white gap-0.5">
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold">
            Subject
          </div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold">
            Teacher
          </div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold">
            School Year
          </div>
          {archived.map((item, index) => (
            <React.Fragment key={index}>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm font-medium">
                {" "}
                {item.subject}{" "}
              </div>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm">
                {item.teacher}
              </div>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm">
                {item.schoolYear}{" "}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
