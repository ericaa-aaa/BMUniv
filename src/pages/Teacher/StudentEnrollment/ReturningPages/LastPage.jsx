import React from "react";

export default function LastPage() {
    return (
        <>
                <div className="pt-10 pl-12">
                    <p className="text-[#630000] font-['Inter'] text-[25px] font-semibold">Academic Information</p>
                </div>

                <div className="bg-[#EDEBDD] w-370 h-70 ml-12 rounded-2xl">
                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Last School Year Attended</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Elementary School Attended</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">School Year</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">High School Attended</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">School Year</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Senior High School Attended</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">School Year</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">Semester</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 pl-16">
                    <p className='text-[#1B1717] text-[14px] pt-5 pl-7'>Is this student a scholarship recipient? <span className="text-[#630000]">(✓) if yes</span></p>
                    <div className='pt-5'>
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 mr-3 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"></input>
                    </div>
                </div>

                 <button type="submit" className='bg-[#630000] ml-200 text-[#EDEBDD] font-semibold text-[17px] rounded-2xl p-2  w-30 cursor-pointer'>ENROLL</button>
                </>
    )
}