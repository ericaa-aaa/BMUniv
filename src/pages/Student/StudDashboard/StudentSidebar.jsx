import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from "../../../assets/images/signin4.png";

export default function StudentSidebar() {

  const [openSettings, setOpenSettings] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openArchivedSubjects, setOpenArchSubjects]= useState(false);
  const [activeItem, setActiveItem] = useState("");

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5">
      
      <div className='flex gap-4 pt-15 mb-10'>
        <img img src={logo} alt='logo' className='w-15 h-11'></img>
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">Dashboard</h1>
      </div>

      <nav className="flex flex-col gap-6 font-['Inter'] font-medium">
        <div>
          <div onClick={() => setOpenSubjects(!openSubjects)} className='flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded'>
            <div className="flex items-center gap-5 cursor-pointer">
              <a className='text-[#EDEBDD] hover:text-[#1B1717]'>Student Subjects</a>
            </div>
          </div>

          {openSubjects && (
            <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
              <div onClick={() => setActiveItem("elementary")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "elementary" 
                  ? "bg-[#1B1717]" 
                  : "hover:bg-[#EDEBDD]"}`}></span>
                <Link to="/studsubj" className='cursor-pointer hover:underline'>Student Subjects</Link>
              </div>
            </div>
          )}
        </div>
        
        
       <div>
         <div onClick={() => setOpenArchSubjects(!openArchivedSubjects)} className='flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded'>
           <div className="flex items-center gap-5 cursor-pointer">
             {/*<img src={b} alt='students' className='w-7 h-6'></img>*/}
             <a className='text-[#EDEBDD] hover:text-[#1B1717]'>Archived Subjects</a>
           </div>
         </div>

         {openArchivedSubjects && (
           <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
               <div onClick={() => setActiveItem("archsubj")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                 <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "archsubj"
                   ? "bg-[#1B1717]"
                   : "hover:bg-[#EDEBDD]"}`}></span>
                   <Link to="/archsubj" className='cursor-pointer hover:underline'>Archived Subjects</Link>
              </div>
           </div>
         )}
       </div>

         <div>
         <div onClick={() => setOpenSettings(!openSettings)} className='flex items-center gap-3 cursor-pointer hover:bg-[#EDEBDD] p-2 rounded'>
           <div className="flex items-center gap-5 cursor-pointer">
             {/*<img src={b} alt='students' className='w-7 h-6'></img>*/}
             <a className='text-[#EDEBDD] hover:text-[#1B1717]'>Settings</a>
           </div>
         </div>

         {openSettings && (
           <div className='ml-6 mt-2 flex flex-col gap-2 text-sm'>
               <div onClick={() => setActiveItem("settings")} className={`flex items-center gap-3 cursor-pointer rounded transition`}>
                 <span className={`w-3 h-3 rounded-full border-2 ${activeItem === "settings"
                   ? "bg-[#1B1717]"
                   : "hover:bg-[#EDEBDD]"}`}></span>
                   <Link to="/settings" className='cursor-pointer hover:underline'>Settings</Link>
              </div>
           </div>
         )}
       </div>
        
      </nav>

      <div className="mt-auto ">
        <button className="flex items-center gap-2 cursor-pointer">
          Log Out
        </button>
      </div>

    </div>
  );
};
