import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FacultyTeacherService } from '../../../../services/facultyteacherservice';

export default function DisplayElementary() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- UPDATED: Pass "Elementary" to filter the API result ---
        const data = await FacultyTeacherService.getFaculty("Elementary");
        setFacultyList(data);
      } catch (err) {
        console.error("Failed to load Elementary faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center text-[#630000] font-bold">Loading Elementary Faculty...</div>;

  return (
    <div className="p-5 font-[Inter]">
      <h2 className="text-[#630000] text-3xl font-bold mb-8 ml-10">Elementary Faculty</h2>

      <div className="flex-1 overflow-auto border border-gray-200 rounded-xl bg-[#faf9f6] shadow-inner h-180">
        <div className="min-w-225 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 justify-items-center ">
        
        {facultyList.length === 0 ? (
          <p className="col-span-full text-gray-500 italic text-xl mt-10">
            No Elementary faculty members added yet.
          </p>
        ) : (
          facultyList.map((faculty, index) => (
            <div key={faculty.id || index} className="flex flex-col items-center text-center p-4 mt-10 border-2 border-transparent hover:border-[#edebdd] rounded-2xl transition-all">
              <div className="mb-4">
                <FaUserCircle className="text-gray-800 text-[100px]" />
              </div>

              <h3 className="text-black font-bold text-xl leading-tight">
                Teacher {faculty.firstname} {faculty.middlename?.charAt(0)}. {faculty.lastname} {faculty.ext || ""}
              </h3>

              <p className="text-[#630000] text-lg">
                {faculty.position || "Faculty Member"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}