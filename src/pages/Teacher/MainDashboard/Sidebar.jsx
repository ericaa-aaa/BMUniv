import a from '../../../assets/images/dashboard1.png'
import b from '../../../assets/images/dashboard2.png'
import c from '../../../assets/images/dashboard3 (1).png'
import d from '../../../assets/images/dashboard5.png'
import e from '../../../assets/images/signin4.png'

import { Link } from 'react-router-dom'

import { useState } from 'react'

function Sidebar() {

  const [openRecords, setOpenRecords] = useState(false);
  const [openEnrollment, setOpenEnrollment]= useState(false);
  const [activeItem, setActiveItem] = useState("");

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5">
      
      <div className='flex gap-4 pt-15 mb-10'>
        <img img src={e} alt='students' className='w-15 h-11'></img>
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">Dashboard</h1>
      </div>

      <nav className="flex flex-col gap-6 font-['Inter'] font-medium">
        <div>
          <div onClick={() => setOpenEnrollment(!openEnrollment)} className='flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded'>
            <div className="flex items-center gap-5 cursor-pointer">
              <img src={a} alt='students' className='w-7 h-6'></img>
              <a className='text-[#EDEBDD] hover:text-[#1B1717]'>Student Enrollment</a>
            </div>
          </div>

          {openEnrollment && (
            <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717]" 
                  : "hover:bg-[#EDEBDD]"}`}></span>
                <Link to="/elem" className='cursor-pointer hover:underline'>Elementary Enrollment</Link>
              </div>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717] " 
                  : "bg-black group-hover:bg-[#EDEBDD]"}`}></span>
                <Link to="/hs" className='cursor-pointer hover:underline'>HS Enrollment</Link>
              </div>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717]" 
                  : "bg-black group-hover:bg-[#EDEBDD]"}`}></span>
                <p className='cursor-pointer hover:underline'>SHS Enrollment</p>
              </div>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717]" 
                  : "bg-black group-hover:bg-[#EDEBDD]"}`}></span>
                <p className='cursor-pointer hover:underline'>RL Enrollment</p>
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
                   <Link to="/shsrec">Junior High School Records</Link>
              </div>
           </div>
         )}
       </div>


        <div>
          <div onClick={() => setOpenEnrollment(!openEnrollment)} className='flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded'>
            <div className="flex items-center gap-5 cursor-pointer">
              <img src={c} alt='students' className='w-8 h-8'></img>
              <a className='text-[#EDEBDD] hover:text-[#1B1717]'>Faculty</a>
            </div>
          </div>

          {openEnrollment && (
            <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717]" 
                  : "hover:bg-[#EDEBDD]"}`}></span>
                <p className='cursor-pointer hover:underline'>Elementary Enrollment</p>
              </div>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717] " 
                  : "bg-black group-hover:bg-[#EDEBDD]"}`}></span>
                <p className='cursor-pointer hover:underline'>HS Enrollment</p>
              </div>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717]" 
                  : "bg-black group-hover:bg-[#EDEBDD]"}`}></span>
                <p className='cursor-pointer hover:underline'>SHS Enrollment</p>
              </div>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717]" 
                  : "bg-black group-hover:bg-[#EDEBDD]"}`}></span>
                <p className='cursor-pointer hover:underline'>RL Enrollment</p>
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