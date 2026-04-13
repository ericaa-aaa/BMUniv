import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from "../../../assets/images/signin4.png";
import logout from "../../../assets/images/dashboard5.png";
import students from "../../../assets/images/dashboard1.png";
import { FaFolderClosed } from "react-icons/fa6";
import { RiDashboardLine } from "react-icons/ri";

export default function StudentSidebar() {
  const location = useLocation();
  const [openArchivedSubjects, setOpenArchSubjects] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItemStyles = (path) => `
    group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors duration-300
    ${isActive(path) ? 'bg-[#EDEBDD]' : 'hover:bg-[#EDEBDD]'}`;

  const textStyles = (path) => `
    transition-colors duration-300 font-medium
    ${isActive(path) ? 'text-[#1B1717]' : 'text-[#EDEBDD] group-hover:text-[#1B1717]'}`;

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5 shadow-xl">

      <div className='flex gap-4 pt-15 mb-10'>
        <img src={logo} alt='logo' className='w-15 h-11' />
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">BMU</h1>
      </div>

      <nav className="flex flex-col gap-4 font-['Inter']">

        <Link to="/student" className={navItemStyles("/student")}>
          <div className="flex items-center gap-5">
            <RiDashboardLine size={23} 
              className={`transition-colors duration-300 ${isActive("/student") ? 'text-[#1B1717]' : 'text-[#EDEBDD] group-hover:text-[#1B1717]'}`}/>
            <span className={textStyles("/student")}>Dashboard</span>
          </div>
        </Link>

        <Link to="/student/studsubj" className={navItemStyles("/student/studsubj")}>
          <div className="flex items-center gap-5">
            <img src={students} alt="subjects" 
              className={`w-7 h-6 transition-all duration-300 ${isActive("/student/studsubj") ? 'brightness-0' : 'group-hover:brightness-0'}`}/>
            <span className={textStyles("/student/studsubj")}>Student Subjects</span>
          </div>
        </Link>

        <Link to="/student/archsubj" onClick={() => setOpenArchSubjects(!openArchivedSubjects)} 
          className={navItemStyles("/student/archsubj")} >
          <div className="flex items-center gap-5">
            <FaFolderClosed size={20} className={`transition-colors duration-300 ${isActive("/student/archsubj") ? 'text-[#1B1717]' : 'text-[#EDEBDD] group-hover:text-[#1B1717]'}`}/>
            <span className={textStyles("/student/archsubj")}>Archived Subjects</span>
          </div>
        </Link>
        
      </nav>

      <div className="mt-auto pt-10">
        <button className="group flex items-center gap-5 py-2 px-7 w-full rounded hover:bg-[#EDEBDD] transition-colors duration-300">
          <img src={logout} alt="logout" className='w-8 h-8 group-hover:brightness-0 transition-all'/>
          <span className="text-[#EDEBDD] group-hover:text-[#1B1717] font-medium transition-colors">Log Out</span>
        </button>
      </div>

    </div>
  );
}