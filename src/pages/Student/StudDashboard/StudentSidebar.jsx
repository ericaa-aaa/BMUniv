import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from "../../../assets/images/signin4.png";
import { RiLogoutBoxLine, RiDashboardLine } from "react-icons/ri";
import { FaArchive } from "react-icons/fa";
import studentsIcon from "../../../assets/images/dashboard1.png";

export default function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openArchivedSubjects, setOpenArchSubjects] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    navigate("/");
  };
  const navItemClasses = (path) => `
    group flex items-center gap-5 py-2 px-7 rounded transition-all duration-200 outline-none
    ${isActive(path) 
      ? 'bg-[#EDEBDD] text-[#1B1717]' 
      : 'text-[#EDEBDD] hover:bg-[#EDEBDD] hover:text-[#1B1717] focus:bg-transparent'}
  `;

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5 shadow-xl">

      <div className='flex gap-4 pt-15 mb-10'>
        <img src={logo} alt='logo' className='w-15 h-11' />
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">BMU</h1>
      </div>

      <nav className="flex flex-col gap-4 font-['Inter']">
        
        <Link to="/student" className={navItemClasses("/student")}>
          <RiDashboardLine size={23} className="transition-colors duration-200" />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link to="/student/studsubj" className={navItemClasses("/student/studsubj")}>
          <img 
            src={studentsIcon} 
            alt="subjects" 
            className={`w-7 h-6 transition-all duration-200 ${isActive("/student/studsubj") ? 'brightness-0' : 'group-hover:brightness-0'}`}/>
          <span className="font-medium">Student Subjects</span>
        </Link>

        <Link 
          to="/student/archsubj" 
          onClick={() => setOpenArchSubjects(!openArchivedSubjects)} 
          className={navItemClasses("/student/archsubj")}>
          <FaArchive size={20} className="transition-colors duration-200" />
          <span className="font-medium">Archived Subjects</span>
        </Link>
        
      </nav>

      <div className="mt-auto pt-10">
        <button onClick={handleLogout}
          className="group flex items-center gap-5 py-2 px-7 w-full rounded transition-all duration-200 outline-none hover:bg-[#EDEBDD] focus:bg-transparent" >
          <RiLogoutBoxLine size={20} className="text-[#EDEBDD] group-hover:text-[#1B1717] transition-colors duration-200"/>
            <span className="text-[#EDEBDD] group-hover:text-[#1B1717] font-medium transition-colors">
              Log Out
            </span>
        </button>
      </div>

    </div>
  );
}