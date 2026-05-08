import React from "react";
import { useState, } from "react";
import { useEffect } from "react";
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
  ];

  const [student, setStudent] = useState({
    name: "Loading...",
    grade: "",
    section: "",
    category: "",
    status: "",
    photo: null
  });

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/profile/student`, {
          credentials:"include"
        });

        const data = await res.json();
        if (res.ok) {
          setStudent({
            name: data.display_name,
            grade: data.extra_data.grade,
            section: data.extra_data.section,
            category: data.extra_data.category,
            status: data.extra_data.status,
            strand: data.extra_data.strand,
            photo: data.profile_photo 
          });
        } else {
          toast.error(data.error || "Failed to load profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

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
              {student.photo ? (
                <img 
                  src={student.photo} 
                  alt="Profile" 
                  className="size-32 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-32 text-gray-400">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
              )}
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
                {student.strand && (
                  <p> ▸ Strand: {student.strand}</p>
                )}
              <p className={statusColors[student.status] || " "}>
                ▸ {student.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl mt-5 shadow-lg">
        <div className="grid grid-cols-[2fr_1.5fr_1.5fr] bg-white gap-0.5">
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
