import { useState, useEffect } from "react";
import profile from "../../../assets/images/faculty1.png";
import back from "../../../assets/images/bg.jpg";
import { FacultyTeacherService } from "../../../services/facultyteacherservice";

export default function TeacherDashboard() {
  const [firstName, setFirstName] = useState("");
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null); 
  const [counts, setCounts] = useState({
    elementary: 0,
    highSchool: 0,
    seniorHigh: 0,
  });

  useEffect(() => {
    const storedName = localStorage.getItem("activeUser");
    const storedGrade = localStorage.getItem("teacherGrade");

    if (storedName) setFirstName(storedName);
    if (storedGrade) setGrade(storedGrade);

    const fetchTeacherData = async () => {
      try {
        const data = await FacultyTeacherService.getMySubjects();
        

        if (data.profile_photo) {
          setProfilePhoto(data.profile_photo);
        }
        

        setSubjects(data.subjects || []);
      } catch (error) {
        console.error("Error loading teacher data:", error);
      }
    };
    fetchTeacherData();
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/students/count`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCounts({
          elementary: data.elementary,
          highSchool: data.highSchool,
          seniorHigh: data.seniorHigh,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []); 

  return (
    <section
      className="w-full h-full bg-cover bg-no-repeat bg-fixed bg-center min-h-screen"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="w-full h-full bg-white/75 min-h-screen">

        <div className="flex justify-end pt-10 pr-12 font-['Inter']">
          <div className="flex items-center gap-7 group">
            <div className="flex flex-col text-right justify-center gap-2">
              <p className='text-[#1B1717] text-xl font-semibold capitalize leading-none'>
                {firstName ? `Teacher ${firstName}` : "Faculty Teacher"}
              </p>
              <p className="text-[13px] font-bold text-[#810100] uppercase tracking-widest leading-none mb-1">
                Grade {grade} Teacher
              </p>
            </div>

            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#630000] p-0.5 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img
                src={profilePhoto || profile}  
                alt="Faculty"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = profile;
                }}
              />
            </div>
          </div>
        </div>


        <div className="px-12">
          <table className="mt-15 font-['Inter'] font-semibold border border-collapse mx-auto max-w-7xl w-full mb-10">
            <tbody>
              <tr>
                {[
                  "Elementary Students",
                  "High School Enrolled",
                  "SHS Enrolled",
                ].map((label, index) => (
                  <th
                    key={index}
                    className="border-2 border-[#edebdd] bg-[#630000] px-6 py-3 text-center text-[#edebdd]"
                  >
                    {label}
                  </th>
                ))}
              </tr>

              <tr>
                {[counts.elementary, counts.highSchool, counts.seniorHigh].map(
                  (count, index) => (
                    <td
                      key={index}
                      className="border-2 border-[#edebdd] bg-[#810100] px-6 py-2 text-center text-[#edebdd] font-bold text-xl"
                    >
                      {count}
                    </td>
                  ),
                )}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-12 font-['Inter'] pb-20">
          <div className="max-w-7xl mx-auto px-12">
            <div className="text-[#630000] font-[Inter] text-[23px] font-bold text-left">
              <p>My Assigned Subjects</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-12">
            {subjects.length > 0 ? (
              subjects.map((sub, index) => (
                <div
                  key={index}
                  className="bg-[#edebdd] border-2 border-b-6 border-[#630000]/20 rounded-xl p-4 text-left text-[#630000] shadow-sm pl-8 mt-10"
                >
                  <div className="text-[15px] font-bold mb-2">
                    {sub.grade ? `Grade ${sub.grade}` : "NA"}
                  </div>

                  <div className="text-[19px] font-bold mb-2">
                    {sub.name ?? "NA"}
                  </div>
                  {[11, 12].includes(Number(sub.grade)) && sub.courseCode && (
                    <div className="text-[15px] mt-2 font-medium">
                      {sub.courseCode}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center mt-10 text-gray-500 italic">
                No subjects assigned yet.
              </div>  
            )}
          </div>
        </div>
      </div>
    </section>
  );
}