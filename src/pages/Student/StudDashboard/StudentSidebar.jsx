import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from "../../../assets/images/signin4.png";
import logout from "../../../assets/images/dashboard5.png";
import students from "../../../assets/images/dashboard1.png";
import { FaFolderClosed } from "react-icons/fa6";
//import dash from "../../../assets/images/dash.png";
import { RiDashboardLine } from "react-icons/ri";

export default function StudentSidebar() {

  const [openSubjects, setOpenSubjects] = useState(false);
  const [openArchivedSubjects, setOpenArchSubjects]= useState(false);

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5">
      
      <div className='flex gap-4 pt-15 mb-10'>
        <img img src={logo} alt='logo' className='w-15 h-11'></img>
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">Dashboard</h1>
      </div>

      <nav className="flex flex-col gap-6 font-['Inter'] font-medium">

        <div>
            <div className="flex items-center gap-5 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded">
              {/*<img src={dash} alt='students' className='w-7 h-6'></img>*/}
              <RiDashboardLine />
              <Link to="/student" className='text-[#EDEBDD] hover:text-[#1B1717]'>Dashboard</Link>
            </div>
        </div>

        <div>
          <div onClick={() => setOpenSubjects(!openSubjects)} className='flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded'>
            <div className="flex items-center gap-5 cursor-pointer">
              <img src={students} alt="logongstud" className='w-7 h-6'/>
              <Link to="/student/studsubj" className='cursor-pointer hover:text-[#1B1717] hover:underline'>Student Subjects</Link>
            </div>
          </div>
        </div>
        
       <div>
         <div onClick={() => setOpenArchSubjects(!openArchivedSubjects)} className='flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded'>
           <div className="flex items-center gap-5 cursor-pointer">
             <FaFolderClosed />
             <Link to="/student/archsubj" className='cursor-pointer hover:text-[#1B1717] hover:underline'>Archived Subjects</Link>
           </div>
         </div>
       </div>
        
      </nav>

      <div className="mt-auto ">
        <button className="flex items-center gap-2 cursor-pointer">
          <img src={logout} alt="lagawt" className='w-8 h-8'/>Log Out
        </button>
      </div>

    </div>
  );
};
