import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FacultyTeacherService } from '../../../../services/facultyteacherservice';

export default function DisplayHighSchool() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- API CALL: Fetch specifically for HighSchool ---
        // This matches the @faculty_bp.route('/faculty/<level>')
        const data = await FacultyTeacherService.getFaculty("HighSchool");
        setFacultyList(data);
      } catch (err) {
        console.error("Failed to load High School faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold text-[#630000]">Loading JHS Faculty...</div>;

  return (
    <div className="p-5 font-[Inter]">
      <h2 className="text-[#630000] text-3xl font-bold mb-8 ml-10">Junior High School Faculty</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 justify-items-center">
        
        {facultyList.length === 0 ? (
          <p className="col-span-full text-gray-500 italic text-xl mt-10">
            No High School faculty members added yet.
          </p>
        ) : (
          facultyList.map((faculty) => (
            <div key={faculty.id} className="flex flex-col items-center text-center p-4">
              
              <div className="mb-4">
                <FaUserCircle className="text-gray-800 text-[100px]" />
              </div>

              <h3 className="text-black font-bold text-xl leading-tight">
                Teacher {faculty.firstname} {faculty.middlename ? `${faculty.middlename.charAt(0)}.` : ""} {faculty.lastname} {faculty.ext || ""}
              </h3>

              <p className="text-gray-600 text-lg font-medium">
                {faculty.position || "JHS Instructor"}
              </p>

              {/* Display the subjects assigned to them */}
              <div className="mt-3 flex flex-wrap justify-center gap-2 max-w-62.5">
                {faculty.subjects && faculty.subjects.length > 0 ? (
                  faculty.subjects.map((sub) => (
                    <span 
                      key={sub.id} 
                      className="bg-[#630000] text-[#EDEBDD] text-[10px] px-2 py-1 rounded-full font-semibold"
                    >
                      {sub.name} (G{sub.grade})
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 italic text-sm">No subjects assigned</span>
                )}
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}