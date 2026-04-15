import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../assets/images/signin4.png";
import studentsIcon from "../../../assets/images/dashboard1.png";

export default function StudentSidebar() {
  const navigate = useNavigate();
  //const [activeItem, setActiveItem] = useState("dashboard");
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openArchived, setOpenArchived] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeUser");
    navigate("/", { replace: true });
  };

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5">

      <div className='flex gap-4 pt-15 mb-10 pl-3'>
        <img src={logo} alt='logo' className='w-15 h-11' />
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">BMU</h1>
      </div>

      <nav className="flex flex-col gap-6 font-['Inter'] font-medium">

        <div>
          <div onClick={() => { setOpenDashboard(!openDashboard)}} 
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors duration-300 ${openDashboard === "dashboard" ? 'bg-[#EDEBDD]' : 'hover:bg-[#EDEBDD]'}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" 
              stroke={openDashboard === "dashboard" ? "#1B1717" : "#EDEBDD"} 
              strokeWidth={openDashboard === "dashboard" ? "3" : "2"} 
              strokeLinecap="round" strokeLinejoin="round" 
              className="transition-[stroke] duration-300 group-hover:stroke-[#1B1717]">
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            <Link to="/student" className={`transition-colors duration-300 ${openDashboard === "dashboard" ? 'text-[#1B1717] font-extrabold' : 'text-[#EDEBDD] group-hover:text-[#1B1717] font-normal'}`}>
              Dashboard
            </Link>
          </div>
        </div>

        <div>
          <div onClick={() => { setOpenSubjects(!openSubjects); }} 
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors duration-300 ${openSubjects === "subjects" ? 'bg-[#EDEBDD]' : 'hover:bg-[#EDEBDD]'}`}>
            <img src={studentsIcon} alt="subjects" 
              className={`w-7 h-6 transition-all duration-300 ${openSubjects === "subjects" ? 'brightness-0' : 'group-hover:brightness-0'}`} />
            <Link to="/student/studsubj" className={`transition-colors duration-300 ${openSubjects === "subjects" ? 'text-[#1B1717] font-extrabold' : 'text-[#EDEBDD] group-hover:text-[#1B1717] font-normal'}`}>
              Student Subjects
            </Link>
          </div>
        </div>

        <div>
          <div onClick={() => { setOpenArchived(!openArchived); }}
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors ${openArchived ? 'bg-[#EDEBDD]' : 'hover:bg-[#EDEBDD]'}`} >
            <svg 
              xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" 
              fill="none" stroke={openArchived ? "#1B1717" : "#EDEBDD"} strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round" 
              className="transition-[stroke] duration-300 group-hover:stroke-[#1B1717]">
              <rect width="20" height="5" x="2" y="3" rx="1"/>
              <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
              <path d="M10 12h4"/>
            </svg>
            <Link to="/student/archsubj" className={`transition-colors duration-300 ${openArchived ? 'text-[#1B1717] font-extrabold' : 'text-[#EDEBDD] group-hover:text-[#1B1717] font-normal'}`}>
              Archived Subjects
            </Link>
          </div>
        </div>
      </nav>

      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-[#EDEBDD] hover:text-white transition-all group">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-skip-forward group-hover:scale-110 transition-transform">

            <path d="M21 4v16"/>
            <path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/>
          </svg>
          <span className="font-medium">Log Out</span>
        </button>
      </div>

    </div>
  );
}