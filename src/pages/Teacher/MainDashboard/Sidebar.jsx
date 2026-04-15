//import b from '../../../assets/images/dashboard2.png'
//import d from '../../../assets/images/dashboard5.png'
import e from '../../../assets/images/signin4.png'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const [openFaculty, setOpenFaculty] = useState(false);
  const [openRecords, setOpenRecords] = useState(false);
  const [openEnrollment, setOpenEnrollment]= useState(false);
  const [activeItem, setActiveItem] = useState("");

const [activeMenu, setActiveMenu] = useState(""); 

const toggleEnrollment = () => {
  setActiveMenu(activeMenu === "enrollment" ? "" : "enrollment");
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeUser");
    navigate("/", { replace: true }); 
  };

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5">
      
      <div className='flex gap-4 pt-15 mb-10 pl-3'>
        <img img src={e} alt='students' className='w-15 h-11'></img>
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">BMU</h1>
      </div>

      <nav className="flex flex-col gap-6 font-['Inter'] font-medium">
        <div>
            <div onClick={() => setActiveItem("dashboard")} className="group flex items-center gap-3 cursor-pointer py-2 px-7 rounded mb-6 relative hover:bg-[#EDEBDD]">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth={`${activeItem === "dashboard" ? "3" : "2"}`}  strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard transition-colors group-hover:text-[#1B1717]">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
          <Link to="/teacher" className={`transition-colors after:absolute after:inset-0 text-[#EDEBDD] hover:text-[#1B1717]
            ${activeItem === "dashboard" 
              ? 'font-extrabold'
              : 'font-normal'
            }`}>Dashboard</Link>
        </div>

      <div onClick={() => setOpenEnrollment(!openEnrollment)}
        className="group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors hover:bg-[#EDEBDD]">

        <div className="flex items-center gap-3 cursor-pointer">

        <svg xmlns="http://w3.org" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke= "#EDEBDD"
          strokeWidth={`${openEnrollment ? "3" : "2"}`} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard transition-[stroke] duration-300 group-hover:stroke-[#1B1717]">
          <path d="M18 21a8 8 0 0 0-16 0" /><circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
        </svg>
    
        <a className={`whitespace-nowrap transition-colors duration-300 text-[#EDEBDD] group-hover:text-[#1B1717] ${openEnrollment
            ? 'font-extrabold' 
            : 'font-normal'}`}>Student Enrollment </a>
      </div>
    </div>

          {openEnrollment && (
            <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#EDEBDD]" 
                  : "bg-[#1B1717]"}`}></span>
                <Link to="/elem" className={`cursor-pointer ${activeItem === "elementary" 
                ? 'underline'
                : 'hover:underline'} 
                `}>Elementary Enrollment</Link>
              </div>
              <div onClick={() => setActiveItem("highschool")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "highschool" 
                  ? "bg-[#EDEBDD] " 
                  : "bg-[#1B1717]"}`}></span>
                <Link to="/hs" className={`cursor-pointer ${activeItem === "highschool"
                  ? 'underline'
                  : 'hover:underline'}
                  `}>HS Enrollment</Link>
              </div>
              <div onClick={() => setActiveItem("seniorhighschool")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "seniorhighschool" 
                  ? "bg-[#EDEBDD]" 
                  : "bg-[#1B1717]"}`}></span>
                <Link to="/shs" className={` ${activeItem === "seniorhighschool"
                  ? 'underline'
                  : 'hover:underline'}`}>SHS Enrollment</Link>
              </div>
            </div>
          )}
        </div>
        
        
       <div>
        <div onClick={() => setOpenRecords(!openRecords)}
          className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors ${openRecords 
            ? 'bg-[#EDEBDD]' 
            : 'hover:bg-[#EDEBDD]'}`}>
          <div className="flex items-center gap-5 cursor-pointer">
            <svg 
              xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" 
              fill="none" stroke={openRecords ? "#1B1717" : "#EDEBDD"}  strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round" 
              className="transition-[stroke] duration-300 group-hover:stroke-[#1B1717]">
                
              <path d="M15.5 2H11a2 2 0 0 0-2 2v1" />
              <path d="M7 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7.5L17 4.5" />
              <path d="M11 7h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
              <path d="M17 7v4a2 2 0 0 0 2 2h1" />
            </svg>

            <a className={`transition-colors duration-300 ${openRecords 
                ? 'text-[#1B1717]' 
                : 'text-[#EDEBDD] group-hover:text-[#1B1717]' }`}>Student Records
            </a>
          </div>
        </div>

         {openRecords && (
          <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
            <div onClick={() => setActiveItem("elementary")} className="flex items-center gap-3 cursor-pointer rounded transition">
              <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" ? "bg-[#EDEBDD]" : "bg-[#1B1717]"}`}></span>
              <Link to="/elemrec" className={`cursor-pointer ${activeItem === "elementary" ? 'underline' : 'hover:underline'}`}>
                Elementary Records
              </Link>
            </div>
            <div onClick={() => setActiveItem("jhs")} className="flex items-center gap-3 cursor-pointer rounded transition">
              <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "jhs" ? "bg-[#EDEBDD]" : "bg-[#1B1717]"}`}></span>
              <Link to="/jhsrec" className={`cursor-pointer ${activeItem === "jhs" ? 'underline' : 'hover:underline'}`}>
                Junior High School Records
              </Link>
            </div>
            <div onClick={() => setActiveItem("shs")} className="flex items-center gap-3 cursor-pointer rounded transition">
              <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "shs" ? "bg-[#EDEBDD]" : "bg-[#1B1717]"}`}></span>
              <Link to="/shsrec" className={`cursor-pointer ${activeItem === "shs" ? 'underline' : 'hover:underline'}`}>
                Senior High School Records
              </Link>
            </div>
          </div>
         )}
       </div>


        <div>
          <div onClick={() => setOpenFaculty(!openFaculty)} 
            className="group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors hover:bg-[#EDEBDD]">

          <svg xmlns="http://w3.org" width="23" height="23" viewBox="0 0 24 24" 
          fill= "none"
          stroke="currentColor" 
          strokeWidth={`${openFaculty ? "3" : "2"}`} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="lucide lucide-user-round-plus group-hover:stroke-[#1B1717]">
          <path d="M2 21a8 8 0 0 1 13.292-6" />
          <circle cx="10" cy="8" r="5" />
          <path d="M19 16v6" />
          <path d="M22 19h-6" />
          </svg>
          <a className={`whitespace-nowrap transition-colors duration-300 text-[#EDEBDD] group-hover:text-[#1B1717] ${openFaculty
            ? 'font-extrabold' 
            : 'font-normal'}`}>Faculty</a>
        </div>

        {openFaculty && (
          <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
            <div onClick={() => setActiveItem("elementary-faculty")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
              <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary-faculty" 
                ? "bg-[#EDEBDD]" 
                : "bg-[#1B1717] "}`}></span>
              <Link to="/elemfaculty" className={`cursor-pointer ${activeItem === "elementary-faculty" 
                ? 'underline'
                : 'hover:underline'}
                `}>Elementary Faculty</Link>
            </div>

            <div onClick={() => setActiveItem("hsfaculty")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
              <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "hsfaculty" 
                ? "bg-[#EDEBDD] " 
                : "bg-[#1B1717]"}`}></span>
              <Link to="/hsfaculty" className={`cursor-pointer ${activeItem === "hsfaculty"
                ? 'underline'
                : 'hover:underline'}`}>HS Faculty</Link>
            </div>

            <div onClick={() => setActiveItem("shsfaculty")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
              <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "shsfaculty" 
                ? "bg-[#EDEBDD]" 
                : "bg-[#1B1717]"}`}></span>
              <Link to="/shsfaculty" className={`cursor-pointer ${activeItem === "shsfaculty"
                ? 'underline'
                : 'hover:underline'}`}>SHS Faculty</Link>
            </div>
          </div>
        )}
      </div>  
    </nav>

<div className="mt-auto">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 cursor-pointer hover:text-white transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="#1B1717" 
            stroke="currentColor" 
            strokeWidth="2" // Changed from stroke-width
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-skip-forward"
          >
            <path d="M21 4v16"/>
            <path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/>
          </svg>
          Log Out
        </button>
      </div>

    </div>
  );
};

export default Sidebar;