import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FacultyTeacherService } from '../../../../services/facultyteacherservice';

export default function Display() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FacultyTeacherService.getFaculty();
        setFacultyList(data);
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading faculty...</div>;

  return (
    <div className="p-5">
      <h2 className="text-[#630000] text-3xl font-bold mb-8 ml-10">Elementary Faculty</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 justify-items-center">
        
        {facultyList.length === 0 ? (
          <p className="col-span-full text-gray-500 italic text-xl mt-10">
            No faculty members added yet.
          </p>
        ) : (
          facultyList.map((faculty, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <FaUserCircle className="text-gray-800 text-[100px]" />
              </div>

              <h3 className="text-black font-bold text-xl leading-tight">
                Teacher {faculty.firstname} {faculty.middlename?.charAt(0)}. {faculty.lastname} {faculty.ext || ""}
              </h3>

              <p className="text-gray-600 text-lg">
                {faculty.position || "Faculty Member"}
              </p>

              {/* Displaying assigned subjects if they exist */}  
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {faculty.subjects?.map((sub) => (
                  <span key={sub.id} className="bg-[#630000] text-[#EDEBDD] text-[10px] px-2 py-0.5 rounded-full">
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}