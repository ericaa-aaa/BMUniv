import { CgProfile } from "react-icons/cg";

export default function Profile() {
    return(
        <div className="bg-white/30 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
          <div className="flex justify-center">
            <CgProfile className="w-25 h-25 text-[#630000]/80" />
          </div>

          <div>
            <label className="block text-[17px] font-semibold text-[#630000] mb-1">
              Teacher's Name
            </label>
            <div className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000]">
              Dr. Jane Doe
            </div>
          </div>

          <div>
            <label className="block text-[17px] font-semibold text-[#630000] mb-1">
              Title
            </label>
            <div className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000]">
              Senior Lecturer
            </div>
          </div>


          <div>
            <label className="block text-[17px] font-semibold text-[#630000] mb-1">
              Email Address
            </label>
            <div className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000]">
              jane.doe@university.edu
            </div>
          </div>
        </div>
    );
};
