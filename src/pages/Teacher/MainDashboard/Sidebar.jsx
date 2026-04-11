
import b from '../../../assets/images/dashboard2.png'
import d from '../../../assets/images/dashboard5.png'
import e from '../../../assets/images/signin4.png'
import f from '../../../assets/images/dash.png'

import { Link } from 'react-router-dom'

import { useState } from 'react'

function Sidebar() {

  const [openFaculty, setOpenFaculty] = useState(false);
  const [openRecords, setOpenRecords] = useState(false);
  const [openEnrollment, setOpenEnrollment]= useState(false);
  const [activeItem, setActiveItem] = useState("");

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5">
      
      <div className='flex gap-4 pt-15 mb-10'>
        <img img src={e} alt='students' className='w-15 h-11'></img>
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">BMU</h1>
      </div>

      <nav className="flex flex-col gap-6 font-['Inter'] font-medium">
        <div>
            <div onClick={() => setActiveItem("dashboard")} className="flex items-center gap-5 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded mb-6">
              <img src={f} alt='students' className='w-7 h-6'></img>
              <Link to="/teacher" className='text-[#EDEBDD] hover:text-[#1B1717]'>Dashboard</Link>
            </div>

          <div onClick={() => setOpenEnrollment(!openEnrollment)} className={`flex items-center gap-3 cursor-pointer p-2 rounded transition-colors ${openEnrollment ? 'bg-[#EDEBDD]' : 'hover:bg-[#EDEBDD]'}`}>
            <div className="flex items-center gap-4 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={openEnrollment ? "#1B1717" : "#EDEBDD"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round-icon lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
              <a className={`transition-colors ${openEnrollment 
                    ? 'text-[#1B1717]' 
                    : 'text-[#EDEBDD] hover:text-[#1B1717]' }`}>Student Enrollment</a>
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
              <div onClick={() => setActiveItem("returninglearners")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "returninglearners" 
                  ? "bg-[#EDEBDD]" 
                  : "bg-[#1B1717]"}`}></span>
                <Link to="/rl" className={`cursor-pointer ${activeItem === "returninglearners"
                  ? 'underline'
                  : 'hover:underline'
                }`}>RL Enrollment</Link>
              </div>
            </div>
          )}
        </div>
        
        
       <div>
         <div onClick={() => setOpenRecords(!openRecords)} className='flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded'>
           <div className="flex items-center gap-5 cursor-pointer">
             <img src={b} alt='students' className='w-7 h-6'></img>
             <a className='text-[#EDEBDD] hover:text-[#1B1717]'>Student Records</a>
           </div>
         </div>

         {openRecords && (
           <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
               <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                 <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary"
                   ? "bg-[#1B1717]"
                   : "hover:bg-[#EDEBDD]"}`}></span>
                   <Link to="/elemrec">Elementary Records</Link>
              </div>

                <div onClick={() => setActiveItem("jhs")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                 <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "jhs"
                   ? "bg-[#1B1717]"
                   : "hover:bg-[#EDEBDD]"}`}></span>
                   <Link to="/jhsrec">Junior High School Records</Link>
              </div>

              <div onClick={() => setActiveItem("jhs")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                 <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "jhs"
                   ? "bg-[#1B1717]"
                   : "hover:bg-[#EDEBDD]"}`}></span>
                   <Link to="/shsrec">Senior High School Records</Link>
              </div>
           </div>
         )}
       </div>


        <div>
          <div onClick={() => setOpenFaculty(!openFaculty)} className={`flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded ${openFaculty ? "bg-[#EDEBDD]" : "hover:bg-[#EDEBDD]"}`}>
            <div className="flex items-center gap-5 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={openFaculty? "#1B1717" : "#EDEBDD"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-plus-icon lucide-user-round-plus"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/></svg>
              <a className={`transition-colors ${openFaculty
                  ? 'text-[#1B1717]'
                  : 'text-[#EDEBDD]'
              }`} >Faculty</a>
            </div>
          </div>

          {openFaculty && (
            <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elemfaculty" 
                  ? "bg-[#1B1717]" 
                  : "hover:bg-[#EDEBDD]"}`}></span>
                <Link to="/elemfaculty" className='cursor-pointer hover:underline'>Elementary Faculty</Link>
              </div>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "hsfaculty" 
                  ? "bg-[#1B1717] " 
                  : "bg-black group-hover:bg-[#EDEBDD]"}`}></span>
                <Link to="/hsfaculty" className='cursor-pointer hover:underline'>HS Faculty</Link>
              </div>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "shsfaculty" 
                  ? "bg-[#1B1717]" 
                  : "bg-black group-hover:bg-[#EDEBDD]"}`}></span>
                <Link to="/shsfaculty" className='cursor-pointer hover:underline'>SHS Faculty</Link>
              </div>
            </div>
          )}
        </div>
        
      </nav>

      <div className="mt-auto ">
        <button className="flex items-center gap-2 cursor-pointer">
          <img src={d} alt='students' className='w-8 h-8' />Log Out
        </button>
      </div>

    </div>
  );
};

export default Sidebar;