import { useState, useEffect } from 'react'; 
import profile from '../../../assets/images/faculty1.png';
import back from "../../../assets/images/bg.jpg";
import { FacultyTeacherService } from '../../../services/facultyteacherservice';

function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [counts, setCounts] = useState({
    elementary: 0,
    highSchool: 0,
    seniorHigh: 0
  });

  useEffect(() => {
    // 1. Load the First Name stored during login
    const storedName = localStorage.getItem("activeUser");  
    if (storedName) {
      setFirstName(storedName);
    }

    // 2. Fetch Subjects
    const fetchMySubjects = async () => {
        try {
            const data = await FacultyTeacherService.getMySubjects();
            setSubjects(data);
        } catch (error) {
            console.error("Error loading subjects:", error);
        }
    };

    fetchMySubjects();
  }, []);

useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token"); // 1. Get the token
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/students/count`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 2. Add the header
          }
        });

        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCounts({
          elementary: data.elementary,
          highSchool: data.highSchool,
          seniorHigh: data.seniorHigh
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
             style={{ backgroundImage: `url(${back})` }}>
      <div className="min-h-screen bg-white/90 p-4 pb-20">
      
        {/* User Profile Header */}
        <div className="flex justify-end pt-10 pr-12">
          <div className="flex items-center gap-4 group">
            
            {/* Text Info: Aligned to the center of the image */}
            <div className="flex flex-col text-right justify-center">
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">
                Faculty
              </p>
              <p className='font-["Inter"] text-[#1B1717] text-xl font-semibold capitalize leading-none'>
                {firstName ? `Teacher ${firstName}` : "Faculty Teacher"}
              </p>
            </div>

            {/* Profile Image: Added a clean border and consistent sizing */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#630000] p-0.5 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img 
                src={profile} 
                alt='Faculty' 
                className='w-full h-full rounded-full object-cover' 
              />
            </div>

          </div>
        </div>

        {/* Enrollment Stats Row */}
        <div className="flex justify-around mt-17 font-['Inter'] font-semibold ">
          {[
            { label: "Elementary Students", count: counts.elementary },
            { label: "High School Enrolled", count: counts.highSchool },
            { label: "SHS Enrolled", count: counts.seniorHigh }
          ].map((item, index) => (
            <div key={index} className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6 shadow-lg">
              <h2 className="text-2xl font-bold text-[#EDEBDD] transition-all duration-500 hover:scale-110">
                  {item.count}
              </h2>
              <div className='w-55 h-0.5 bg-white mt-5 mb-2 mx-auto'></div>
              <p className='text-[20px] text-[#EDEBDD]'>{item.label}</p>
            </div>
          ))}
        </div>

        {/* --- TEACHER'S SUBJECTS SECTION --- */}
        <div className='bg-[#EDEBDD] w-[90%] mx-auto mt-11 rounded-[15px] p-8 shadow-md min-h-75'>
            <h3 className="text-[#630000] text-2xl font-bold mb-6 border-b-2 border-[#630000] pb-2 w-fit">
                My Assigned Subjects
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {subjects.length > 0 ? (
                    subjects.map((sub) => (
                        <div key={sub.id} className="bg-white p-5 rounded-lg border-l-8 border-[#630000] shadow-sm transform transition hover:-translate-y-1">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Grade {sub.grade}</p>
                            <p className="text-[#1B1717] text-lg font-bold mt-1">{sub.name}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-10">
                         <p className="text-gray-500 italic text-lg">No subjects assigned to your account yet.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;