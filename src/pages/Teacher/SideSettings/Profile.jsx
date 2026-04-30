// import { CgProfile } from "react-icons/cg";
import React from "react";
import { useState } from "react";
import profile from "../../../assets/images/faculty1.png"

export default function Profile() {


    const [teacher] = useState(() => ({
    fullname: localStorage.getItem("teacherFullName") || "N/A",
    Email: localStorage.getItem("teacherEmail") || "N/A",
    Position: localStorage.getItem("teacherTitle") || "Unassigned",

  }));  
    return(
        <div className="bg-white/30 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
          <div className="flex justify-center">
            {/* <CgProfile className="w-25 h-25 text-[#630000]/80" /> */}
            <img src="{profile}" alt="Faculty" className="w-25 h-25 text-[#630000]/80" />
          </div>

          <div>
            <label className="block text-[17px] font-semibold text-[#630000] mb-1">
              Teacher's Name
            </label>
            <div className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000]">
             {teacher.fullname}
            </div>
          </div>

          <div>
            <label className="block text-[17px] font-semibold text-[#630000] mb-1">
              Title
            </label>
            <div className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000]">
              {teacher.Position}
            </div>
          </div>


          <div>
            <label className="block text-[17px] font-semibold text-[#630000] mb-1">
              Email Address
            </label>
            <div className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000]">
             {teacher.Email}
            </div>
          </div>
        </div>
    );
};
