import React from "react";
import { useState } from "react";

export default function StudentSubjects() {
  const subjects = [
    {
      course_code: "Fili 2",
      subject: "Filipino",
      teacher: "Dela Cruz, Juan M.",
      schedule: "MWF",
    },
    {
      course_code: "Eng 2",
      subject: "English",
      teacher: "Reyes, Carlo C.",
      schedule: "TTH",
    },
    {
      course_code: "Sci 2",
      subject: "Science",
      teacher: "Mendoza, Ayan L.",
      schedule: "MWF",
    },
    {
      course_code: "Math 2",
      subject: "Mathematics",
      teacher: "Balabo, Maine M.",
      schedule: "MWF",
    },
    {
      course_code: "AP 2",
      subject: "Araling Panlipunan",
      teacher: "Villanueva, Precy Z.",
      schedule: "TTH",
    },
    {
      course_code: "Mep 2",
      subject: "MAPEH",
      teacher: "Ramos, Merly K.",
      schedule: "F",
    },
    {
      course_code: "EPP 2",
      subject: "EPP",
      teacher: "Atienza, Princess R.",
      schedule: "MWF",
    },
    {
      course_code: "GM 2",
      subject: "GMRC",
      teacher: "Mancil, Clarish P.",
      schedule: "TTH",
    },
  ];

  const [student] = useState(() => ({
    name: localStorage.getItem("activeUser") || "Student User",
    grade: localStorage.getItem("studentGrade") || "N/A",
    section: localStorage.getItem("studentSection") || "Unassigned",
    category: localStorage.getItem("studentCategory") || "Student",
    status: localStorage.getItem("studentStatus") || "ENROLLED",
  }));

  const statusColors = {
    Enrolled: "text-green-600",
    Dropped: "text-red-500",
  };

  return (
    <div className="font-['Inter'] p-8 bg-gray-100">
      <div
        className="rounded-3xl overflow-hidden h-56 shadow-lg relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/70 flex items-center justify-between px-10">
          <div className="flex items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-32"
            >
              <path
                fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clip-rule="evenodd"
              />
            </svg>
            <h2 className="font-['Inter'] text-2xl font-semibold text-gray-800 uppercase">
              {student.name}
            </h2>
          </div>

          <div className="m-2 p-2 pr-15">
            <div className="font-['Inter'] space-y-3 text-lg font-semibold text-[#7B0000]">
              <p>▸ Batangas Metropolitan University</p>
              <p>
                ▸ {student.category} - Grade {student.grade}
              </p>
              <p> ▸ Section: {student.section}</p>
              <p className={statusColors[student.status] || " "}>
                ▸ {student.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ">
        <div className="grid grid-cols-[1fr_2fr_1.5fr_1fr] bg-white gap-0.5">
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold ">
            Course Code
          </div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold ">
            Subjects
          </div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold ">
            Teacher
          </div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold ">
            Schedule
          </div>
          {subjects.map((item, index) => (
            <React.Fragment key={index}>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm">
                {item.course_code}
              </div>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm font-medium">
                {item.subject}
              </div>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm">
                {item.teacher}
              </div>
              <div className="p-4 bg-[#ECE9DF] text-center text-sm">
                {item.schedule}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
