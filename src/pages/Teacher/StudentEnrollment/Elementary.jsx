import SideBar from '../MainDashboard/Sidebar';

export default function Elementary() {
    return (
        <div className='flex h-screen'>
  <div className='w-67'>
  <SideBar />
  </div>
        <section className="flex-1 bg-[url('../../../assets/images/bg.jpg')] bg-cover bg-no-repeat relative bg-position-[50%_25%]">
            <div className="absolute inset-0 bg-white/75">

            <div className="relative p-8"></div>

                <div className="flex justify-center pt-10">
                    <p className="flex justify-center text-[#EDEBDD] font-['Inter'] bg-[#630000] w-130 font-semibold text-[30px] rounded-2xl p-3">Elementary Enrollment Form</p>
                </div>

                <div className="pt-10 pl-12">
                    <p className="text-[#630000] font-['Inter'] text-[25px] font-semibold">Grade Level:</p>
                </div>

                <div className="pt-10 pl-12">
                    <p className="text-[#630000] font-['Inter'] text-[25px] font-semibold">Student Information</p>
                </div>

                <div className="bg-[#EDEBDD] w-370 h-50 ml-12 rounded-2xl">
                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Student Name:</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="First Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Middle Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">Ext.</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">Age:</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-12">Birth Date:</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Place of Birth</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Civil Status</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Gender</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-12">Mother Tounge</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Religion</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Weight</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Height</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>
                </div>

            </div>
        </section>
 </div>
    )
}