import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../assets/images/signin4.png";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { FaArchive } from "react-icons/fa";

export default function StudentSidebar() {
  const navigate = useNavigate();
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
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors duration-300 
            ${openDashboard === "dashboard" ? 'bg-[#EDEBDD]' : 'hover:bg-[#EDEBDD]'}`}>
            <TbLayoutDashboardFilled className={`w-6 h-5 transition-all duration-300 
              ${openSubjects === "subjects" ? 'brightness-0' : 'group-hover:brightness-0'}`} />
              <Link to="/student" className={`transition-colors duration-300 
                ${openDashboard === "dashboard" ? 'text-[#1B1717] font-extrabold' : 'text-[#EDEBDD] group-hover:text-[#1B1717] font-normal'}`}>
                Dashboard
              </Link>
          </div>
        </div>

        <div>
          <div onClick={() => { setOpenSubjects(!openSubjects); }} 
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors duration-300 
            ${openSubjects === "subjects" ? 'bg-[#EDEBDD]' : 'hover:bg-[#EDEBDD]'}`}>
            <IoIosPeople className={`w-6 h-5 transition-all duration-300 
              ${openSubjects === "subjects" ? 'brightness-0' : 'group-hover:brightness-0'}`} />
              <Link to="/student/studsubj" className={`transition-colors duration-300 
                ${openSubjects === "subjects" ? 'text-[#1B1717] font-extrabold' : 'text-[#EDEBDD] group-hover:text-[#1B1717] font-normal'}`}>
                Student Subjects
              </Link>
          </div>
        </div>

        <div>
          <div onClick={() => { setOpenArchived(!openArchived); }}
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors 
            ${openArchived ? 'bg-[#EDEBDD]' : 'hover:bg-[#EDEBDD]'}`} >
            <FaArchive className={`w-6 h-5 transition-all duration-300 
              ${openSubjects === "subjects" ? 'brightness-0' : 'group-hover:brightness-0'}`}  />
              <Link to="/student/archsubj" className={`transition-colors duration-300 
                ${openArchived ? 'text-[#1B1717] font-extrabold' : 'text-[#EDEBDD] group-hover:text-[#1B1717] font-normal'}`}>
                Archived Subjects
              </Link>
          </div>
        </div>

      </nav>

        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-[#EDEBDD] hover:text-white transition-all group">
          <RiLogoutBoxLine className='text-4xl'/>
            <span className="font-medium">Log Out</span>
          </button>
        </div>

    </div>
  );
}