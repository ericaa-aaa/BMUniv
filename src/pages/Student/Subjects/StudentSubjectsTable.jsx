import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function StudentSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({
    name: "Loading...",
    grade: "",
    section: "",
    category: "",
    status: "",
    strand: "",
    photo: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // 1. Fetch Student Profile first to get Grade and Strand
        const profileRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/profile/student`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const profileData = await profileRes.json();

        if (!profileRes.ok) throw new Error(profileData.error || "Failed to load profile");

        setStudent({
          name: profileData.display_name,
          grade: profileData.extra_data.grade,
          section: profileData.extra_data.section,
          category: profileData.extra_data.category,
          status: profileData.extra_data.status,
          strand: profileData.extra_data.strand || "", 
          photo: profileData.profile_photo
        });
        // Updated API call within useEffect
        const grade = parseInt(profileData.extra_data.grade);
        const isSeniorHigh = grade === 11 || grade === 12;

        // Only include strand if Senior High
        const strandParam = isSeniorHigh ? `&strand=${profileData.extra_data.strand || ''}` : '';


        const subjectsRes = await fetch(
        `${import.meta.env.VITE_BASE_URL}/student/subjects?grade=${profileData.extra_data.grade}${strandParam}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const subjectsData = await subjectsRes.json();
        
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Data fetch error:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();  
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Data...</div>;

  return (
    <div className="font-['Inter'] p-8 bg-gray-100 ">
      {/* Header Section */}
      <div
        className="rounded-3xl overflow-hidden h-56 shadow-lg relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/70 flex items-center justify-between px-10">
          <div className="flex items-center gap-5">
            {student.photo ? (
              <img src={student.photo} className="size-32 rounded-full object-cover border-4 border-white shadow-md" alt="Profile" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-32 text-gray-400">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>
            )}
            <h2 className="text-2xl font-semibold text-gray-800 uppercase">{student.name}</h2>
          </div>
          <div className="m-2 p-2">
            <div className="space-y-2 text-lg font-semibold text-[#7B0000]">
              <p>▸ Batangas Metropolitan University</p>
              <p>▸ {student.category} - Grade {student.grade}</p>
              <p>▸ Section: {student.section}</p>
                {student.strand && (
                  <p> ▸ Strand: {student.strand}</p>
                )}
              <p className={student.status === "Enrolled" ? "text-green-600" : "text-red-500"}>
                ▸ {student.status}
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ">
        <div className="grid grid-cols-[1fr_2fr_1.5fr_1fr] bg-white gap-0.5">
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold ">Course Code</div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold ">Subjects</div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold ">Teacher</div>
          <div className="p-4 bg-[#7B0000] text-white text-center font-semibold ">Schedule</div>

          {subjects.length > 0 ? (
            subjects.map((item, index) => (   
              <React.Fragment key={index}>
                <div className="p-4 bg-[#ECE9DF] text-center text-sm">{item.coursecode || "N/A"}</div>
                <div className="p-4 bg-[#ECE9DF] text-center text-sm font-medium">{item.subject || item.name}</div>
                <div className="p-4 bg-[#ECE9DF] text-center text-sm">{item.teacher}</div>
                <div className="p-4 bg-[#ECE9DF] text-center text-sm">{item.schedule}</div>
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-4 p-8 bg-[#ECE9DF] text-center text-gray-500">
              No subjects found for Grade {student.grade}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
