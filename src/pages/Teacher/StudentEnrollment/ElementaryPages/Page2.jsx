import React from "react";

export default function Page1() {
    return (
        <>
        <div className="pt-9 pl-12 flex gap-5">
                    <p className="text-[#630000] font-['Inter'] text-[25px] font-semibold">Grade Level:</p>
                    <input type="text" className="border text-[12px] w-20 h-9 p-3 rounded-[5px] font-['Inter']" required />
                </div>

                <div className="pt-10 pl-12">
                    <p className="text-[#630000] font-['Inter'] text-[25px] font-semibold">Parent/Guardian Information</p>
                </div>

                <div className="bg-[#EDEBDD] w-370 h-50 ml-12 rounded-2xl">
                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Father's Name</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="First Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Middle Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">Ext.</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-12">Contact Number</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Occupation</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-12">Current Address</p>
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                    </div>
                </div>

                <div className="bg-[#EDEBDD] w-370 h-50 ml-12 mt-5 rounded-2xl">
                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Mother's Name</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="First Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Middle Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">Ext.</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-12">Contact Number</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Occupation</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-12">Current Address</p>
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-4 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                    </div>
                </div>

                <div className="bg-[#EDEBDD] w-370 h-37 ml-12 mt-5 rounded-2xl">
                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Guardian's Name</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="First Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Middle Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">Ext.</p>
                        <div className="pt-6.5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-12">Contact Number</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-7 pl-7">Relationship</p>
                        <div className="pt-4">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 pl-16">
                    <p className='text-[#1B1717] text-[14px] pt-5 pl-7'>Is this student a transferee? <span className="text-[#630000]">(✓) if yes</span></p>
                    <div className='pt-5'>
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 mr-3 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"></input>
                    </div>
                </div>

                 <button type="submit" className='bg-[#630000] ml-200 text-[#EDEBDD] font-semibold text-[17px] rounded-2xl p-2  w-30 cursor-pointer'>ENROLL</button>
                </>
    )
}