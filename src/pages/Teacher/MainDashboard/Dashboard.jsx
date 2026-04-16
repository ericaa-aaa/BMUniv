import { useState, useEffect } from 'react'; 
import profile from '../../../assets/images/faculty1.png';
import back from "../../../assets/images/bg.jpg";
import { FacultyTeacherService } from '../../../services/facultyteacherservice';

function Dashboard() {
  const [currentTeacher, setCurrentTeacher] = useState("");
  const [subjects, setSubjects] = useState([]); // Added missing state
  const [counts, setCounts] = useState({
    elementary: 0,
    highSchool: 0,
    seniorHigh: 0
  });

  useEffect(() => {
    const user = localStorage.getItem("activeUser");  
    if (user) {
      setCurrentTeacher(user);
    }

    // Fetch Teacher's Specific Subjects
    const fetchMySubjects = async () => {
        try {
            // Using the service we discussed to fetch based on the logged-in user
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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/students/count`);
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
      <div className="min-h-screen bg-white/75 p-4 pb-20"> {/* Added padding bottom */}
      
        {/* User Profile Header */}
        <div className="flex justify-end mr-10">
          <p className='pt-12 font-["Inter"] text-[#1B1717] font-medium capitalize'>
            {currentTeacher ? `Teacher ${currentTeacher}` : "Guest"}
          </p>
          <img src={profile} alt='Faculty' className='w-30 h-30' />
        </div>

        {/* Enrollment Stats Row */}
        <div className="flex justify-around mt-17 font-['Inter'] font-semibold ">
          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl font-bold text-[#EDEBDD] transition-all duration-500 hover:scale-110">
                {counts.elementary}
            </h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>Elementary Students</p>
          </div>

          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl text-[#EDEBDD] font-bold transition-all duration-500 hover:scale-110">
                {counts.highSchool}
            </h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>High School Enrolled</p>
          </div>

          <div className="bg-[#630000] rounded-xl w-70 h-35 text-center pt-6">
            <h2 className="text-2xl font-bold text-[#EDEBDD] transition-all duration-500 hover:scale-110">
                {counts.seniorHigh}
            </h2>
            <div className='w-55 h-0.5 bg-white mt-5 mb-2 ml-7'></div>
            <p className='text-[20px] text-[#EDEBDD]'>SHS Enrolled</p>
          </div>
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
                         <p className="text-gray-400 text-sm">Please coordinate with the Registrar.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;