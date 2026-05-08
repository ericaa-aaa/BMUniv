import { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FacultyTeacherService } from '../../../../services/facultyteacherservice.js';

export default function DisplayElementary() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FacultyTeacherService.getFaculty("Elementary");
        setFacultyList(data);
      } catch (err) {
        console.error("Failed to load Elementary faculty:", err );
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

      <div className="flex-1 overflow-auto border border-[#630000] rounded-xl bg-white/70 shadow-inner h-180 mt-10">
        <div className="min-w-225 grid grid-cols-3 gap-y-12 gap-x-6 justify-items-center ">
        
        {facultyList.length === 0 ? (
          <p className="col-span-full text-gray-500 italic text-xl mt-10">
            No Elementary faculty members added yet.
          </p>
        ) : (
          facultyList.map((faculty, index) => (
            <div key={faculty.id || index} className="flex flex-col items-center text-center p-4 mt-10 border-2 border-transparent hover:border-[#edebdd] rounded-2xl transition-all">
              <div className="mb-4">
                {faculty.photo_url ? (
                <img
                  src={faculty.photo_url}
                  alt={`${faculty.firstname} ${faculty.lastname}`}
                  className="w-24 h-24 rounded-full object-cover" 
                  onError={(e) => { e.target.src = '/default-avatar.png'; }}
                />
              ) : (
                <FaUserCircle className="text-gray-300 text-[100px]" />
              )}
              </div>
              <h3 className='text-gray-600'>
                Grade {faculty.grade_level} Teacher
              </h3>
              <h3 className="text-black font-bold text-xl leading-tight mt-1">
                {faculty.firstname} {faculty.middlename?.charAt(0)} {faculty.lastname} {faculty.ext || ""}
              </h3>
              <p className="text-[#630000] text-lg font-bold">
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