import React from "react";

export default function Page1() {
    return (
        <>
        <div className="pt-9 pl-12 flex gap-5">
                    <p className="text-[#630000] font-['Inter'] text-[25px] font-semibold">Grade Level:</p>
                    <input type="text" className="border text-[12px] w-20 h-9 p-3 rounded-[5px] font-['Inter']" required />
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

                <div className="flex gap-5 pl-16">
                    <p className='text-[#1B1717] text-[14px] pt-5 pl-7'>Belonging to any Indigenous Peoples (IP) Community/Indigenous Cultural Community?</p>
                    <div className='pt-5'>
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 mr-3 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"></input>
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"></input>
                    </div>
                </div>

                <div className="pt-5 pl-12">
                    <p className="text-[#630000] font-['Inter'] text-[25px] font-semibold">Contact Information</p>
                </div>

                <div className="bg-[#EDEBDD] w-370 h-36 ml-12 rounded-2xl">
                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Contact Number</p>
                        <div className="pt-6.5 flex gap-5">
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                        </div>
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-7">Email Address</p>
                        <div className="pt-6.5">
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

                <div className="flex gap-5 pl-16">
                    <p className='text-[#1B1717] text-[14px] pt-5 pl-7'>Current address is the same as permanent address? </p>
                    <div className='pt-5'>
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 mr-3 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"></input>
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"></input>
                    </div>
                </div>

                <div className="bg-[#EDEBDD] w-370 h-22 ml-12 rounded-2xl mt-5">     

                    <div className="flex gap-5">
                        <p className="text-[#1B1717] text-[14px] pt-9 pl-12">Current Address</p>
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-7 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-7 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-7 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-7 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                            <input type="text" className="border text-[12px] w-50 h-10 p-3 mt-7 rounded-[5px] font-['Inter']" placeholder="Last Name" required />
                    </div>
                </div>
                </>
    )
}