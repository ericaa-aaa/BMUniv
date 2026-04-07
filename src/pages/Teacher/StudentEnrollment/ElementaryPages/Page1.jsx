import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Paperclip, Save, ArrowRight, ArrowLeft } from "lucide-react";
import { ElementaryStudentService } from "../../../../services/elementarystudentservice"

export default function EnrollmentForm() {
    const [step, setStep] = useState(1); // 1 for Student Information, 2 for Parent/Guardian
    const [photoPreview, setPhotoPreview] = useState(null);

    // Initialize React Hook Form with your exact default values + new address fields
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            grade_level: "",
            lastname: "",
            firstname: "",
            middlename: "",
            ext: "",
            age: "",
            birthdate: "",
            place_of_birth: "",
            civil_status: "Single",
            gender: "",
            mother_tongue: "",
            religion: "",
            weight: "",
            height: "",
            is_ip_community: false,
            contact_number: "",
            email_address: "",
            curr_house_no: "",
            curr_street: "",
            curr_barangay: "",
            curr_municipality: "",
            curr_province: "",
            is_permanent_same: false,
            perm_house_no: "",
            perm_street: "",
            perm_barangay: "",
            perm_municipality: "",
            perm_province: "",
            // Page 2 fields
            father_last_name: "", father_first_name: "", father_middle_name: "", father_ext: "",
            father_contact: "", father_occupation: "",
            f_house_no: "", f_street: "", f_barangay: "", f_municipality: "", f_province: "",
            mother_lastname: "", mother_first_name: "", mother_middle_name: "", mother_ext: "",
            mother_contact: "", mother_occupation: "",
            m_house_no: "", m_street: "", m_barangay: "", m_municipality: "", m_province: "",
            guardian_last_name: "", guardian_first_name: "", guardian_middle_name: "", guardian_ext: "",
            guardian_contact: "", guardian_relationship: "",
            g_house_no: "", g_street: "", g_barangay: "", g_municipality: "", g_province: "",
            is_transferee: false
        }
    });

    // Watchers for Address Syncing
    const isPermanentSame = watch("is_permanent_same");
    const currhouseno = watch("curr_house_no")
    const currStreet = watch("curr_street");
    const currBarangay = watch("curr_barangay");
    const currMunicipality = watch("curr_municipality");
    const currProvince = watch("curr_province");
    const photoFile = watch("photo");

    // Effect to sync address
    useEffect(() => {
        if (isPermanentSame) {
            setValue("perm_house_no", currhouseno);
            setValue("perm_street", currStreet);
            setValue("perm_barangay", currBarangay);
            setValue("perm_municipality", currMunicipality);
            setValue("perm_province", currProvince);
        }
    }, [isPermanentSame, currStreet, currBarangay, currMunicipality, currProvince, setValue]);

    // Handle Photo Preview
    useEffect(() => {
        if (photoFile && photoFile[0]) {
            setPhotoPreview(URL.createObjectURL(photoFile[0]));
        }
    }, [photoFile]);

    // Submission Logic
    const onSubmit = async (data) => {
        try {
            await ElementaryStudentService.enrollStudent(data);
            alert("Student Record Saved Successfully!");
            // Optional: redirect or reset form here
        } catch (error) {
            if (error.message === "SESSION_EXPIRED") {
                alert("Session expired. Please log in again.");
                window.location.href = "/";
            } else {
                alert("Error: " + error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative h-100 font-['Inter']">
            
            {/*  PAGE 1: STUDENT INFORMATION */}
            {step === 1 && (
                <>
                    {/* Hidden Photo Input */}
                    <input type="file" id="p-input" className="hidden" {...register("photo")} accept="image/*" />

                    {/* Attachment Button & Preview */}
                    <div className="flex items-center justify-between w-full pl-12 pr-12 pt-5">
    
                        <div className="flex gap-5 items-center">
                            <p className="text-[#630000] text-[25px] font-semibold whitespace-nowrap">Grade Level:</p>
                            <input {...register("grade_level")} type="text" className="border text-[12px] w-15 h-9 p-3 rounded-[5px]" required />
                        </div>

                        {/* Photo*/}
                        <div className="relative w-24 h-24">
                            {/* Photo Circle */}
                            <div className="w-full h-full bg-[#EDEBDD] rounded-full border-2 border-[#630000] flex items-center justify-center overflow-hidden">
                                {photoPreview ? (
                                    <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <span className="text-[10px] text-gray-400 text-center">No Photo</span>
                                )}
                            </div>

                        {/* Overlapping Icon Button */}
                        <div className="absolute bottom-0 right-0 translate-x-1 translate-y-1">
                            <label 
                                htmlFor="p-input" 
                                className="p-2 bg-[#630000] text-white rounded-full block cursor-pointer hover:bg-red-900 transition-colors shadow-md border-2 border-white"
                            >
                                <Paperclip size={18} />
                            </label>
                        </div>
                    </div>
                    </div>

                        <div className="pl-12 pt-5">
                            <p className="text-[#630000] text-[25px] font-semibold">Student Information</p>
                        </div>

                    {/* Student Info Box */}
                    <div className="bg-[#EDEBDD] w-351 py-7 px-4 ml-12 rounded-2xl flex flex-col gap-7">
                        <div className="flex gap-5 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px]">Student Name:</p>
                            <input {...register("lastname")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Last Name" required />
                            <input {...register("firstname")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="First Name" required />
                            <input {...register("middlename")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Middle Name" />
                            <p className="text-[#1B1717] text-[14px]">Ext.</p>
                            <input {...register("ext")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Jr/Sr" />
                            <p className="text-[#1B1717] text-[14px]">Age:</p>
                            <input {...register("age")} type="number" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Age" required />
                            <p className="text-[#1B1717] text-[14px]">Civil Status</p>
                            <select {...register("civil_status")} className="border text-[12px] w-30 h-10 p-2 rounded-[5px]">
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                            <p className="text-[#1B1717] text-[14px]">Gender</p>
                            <select {...register("gender")} className="border text-[12px] w-30 h-10 p-2 rounded-[5px]" required>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="flex gap-5 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px]">Birth Date:</p>
                            <input {...register("birthdate")} type="date" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" required />
                            <p className="text-[#1B1717] text-[14px]">Place of Birth</p>
                            <input {...register("place_of_birth")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="City/Province" required />
                            <p className="text-[#1B1717] text-[14px]">Mother Tongue</p>
                            <input {...register("mother_tongue")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Language" />
                            <p className="text-[#1B1717] text-[14px]">Religion</p>
                            <input {...register("religion")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Religion" />
                            <p className="text-[#1B1717] text-[14px]">Weight</p>
                            <input {...register("weight")} type="number" step="0.1" className="border text-[12px] w-20 h-10 p-3 rounded-[5px]" placeholder="kg" />
                            <p className="text-[#1B1717] text-[14px]">Height</p>
                            <input {...register("height")} type="number" step="0.1" className="border text-[12px] w-20 h-10 p-3 rounded-[5px]" placeholder="cm" />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 pl-22 mt-4">
                        <p className='text-[#1B1717] text-[14px]'>Indigenous Peoples (IP) Community? <span className="text-[#630000]">(Check if yes)</span></p>
                        <input {...register("is_ip_community")} type="checkbox" className="w-5 h-5 accent-[#630000]" />
                    </div>

                    <div className="pt-5 pl-12">
                        <p className="text-[#630000] text-[25px] font-semibold">Contact Information</p>
                    </div>

                    <div className="bg-[#EDEBDD] w-351 py-7 px-4 ml-12 rounded-2xl flex flex-col gap-7">
                        <div className="flex gap-5 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px]">Contact Number</p>
                            <input {...register("contact_number")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="09XXXXXXXXX" required />
                            <p className="text-[#1B1717] text-[14px]">Email Address</p>
                            <input {...register("email_address")} type="email" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="email@example.com" />
                        </div>

                        <div className="flex gap-7 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px]">Current Address</p>
                            <input {...register("curr_house_no")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="HouseNo" />
                            <input {...register("curr_street")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Street" required />
                            <input {...register("curr_barangay")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Barangay" required />
                            <input {...register("curr_municipality")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="City/Municipality" required />
                            <input {...register("curr_province")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Province" required />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 pl-16 mt-4">
                        <p className='text-[#1B1717] text-[14px]'>Same as permanent address? <span className="text-[#630000]">(Check if yes)</span></p>
                        <input {...register("is_permanent_same")} type="checkbox" className="w-5 h-5 accent-[#630000]" />
                    </div>

                    {!isPermanentSame && (
                        <div className="bg-[#EDEBDD] w-351 p-8 ml-12 rounded-2xl mt-5 flex gap-7 items-center">     
                            <p className="text-[#1B1717] text-[14px] w-32">Permanent Address</p>
                            <input {...register("perm_house_no")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="HouseNo" />
                            <input {...register("perm_street")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Street" required />
                            <input {...register("perm_barangay")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Barangay" required />
                            <input {...register("perm_municipality")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="City" required />
                            <input {...register("perm_province")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Province" required />
                        </div>
                    )}

                    <div className="mt-10 ml-12">
                        <button 
                            type="button" 
                            onClick={() => setStep(2)} 
                            className="flex items-center gap-2 px-10 py-4 bg-[#630000] text-white rounded-xl font-bold hover:bg-red-800 shadow-lg transition-all"
                        >
                            <ArrowRight size={20} />
                            NEXT: PARENT INFORMATION
                        </button>
                    </div>
                </>
            )}

            {/* --- PAGE 2: PARENT INFORMATION --- */}
            {step === 2 && (
                <>
                    <div className="pt-10 pl-12">
                        <p className="text-[#630000] text-[25px] font-semibold">Parent/Guardian Information</p>
                    </div>

                    {/* Father Section */}
                    <div className="bg-[#EDEBDD] w-351 p-8 ml-12 rounded-2xl flex flex-col gap-7 mt-5">
                        <div className="flex gap-5 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px] w-32">Father's Name</p>
                            <input {...register("father_last_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Last Name" required />
                            <input {...register("father_first_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="First Name" required />
                            <input {...register("father_middle_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Middle Name" />
                            <p className="text-[#1B1717] text-[14px]">Ext.</p>
                            <input {...register("father_ext")} type="text" className="border text-[12px] w-20 h-10 p-3 rounded-[5px]" placeholder="Jr/Sr" />
                            <p className="text-[#1B1717] text-[14px]">Contact Number</p>
                            <input {...register("father_contact")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Contact #" required />
                            <p className="text-[#1B1717] text-[14px]">Occupation</p>
                            <input {...register("father_occupation")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Occupation" required />
                        </div>

                        {/* Father's Address */}
                        <div className="flex gap-7 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px] w-32">Current Address</p>
                            <input {...register("f_house_no")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="HouseNo" />
                            <input {...register("f_street")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Street" />
                            <input {...register("f_barangay")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Barangay" />
                            <input {...register("f_municipality")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="City" />
                            <input {...register("f_province")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Province" />
                        </div>
                    </div>

                    {/* Mother Section */}
                    <div className="bg-[#EDEBDD] w-351 p-8 ml-12 rounded-2xl flex flex-col gap-6 mt-10">
                        <div className="flex gap-5 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px]">Mother's Name</p>
                            <input {...register("mother_last_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Last Name" required />
                            <input {...register("mother_first_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="First Name" required />
                            <input {...register("mother_middle_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Middle Name" />
                            <p className="text-[#1B1717] text-[14px]">Ext.</p>
                            <input {...register("mother_ext")} type="text" className="border text-[12px] w-20 h-10 p-3 rounded-[5px]" placeholder="Jr/Sr" />
                            <p className="text-[#1B1717] text-[14px]">Contact Number</p>
                            <input {...register("mother_contact")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Contact #" required />
                            <p className="text-[#1B1717] text-[14px]">Occupation</p>
                            <input {...register("mother_occupation")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Occupation" required />
                        </div>

                        {/* Mother's Address */}
                        <div className="flex gap-7 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px]">Current Address</p>
                            <input {...register("m_house_no")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="HouseNo" />
                            <input {...register("m_street")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Street" />
                            <input {...register("m_barangay")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Barangay" />
                            <input {...register("m_municipality")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="City" />
                            <input {...register("m_province")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Province" />
                        </div>
                    </div>

                    {/* Guardian Section */}
                    <div className="bg-[#EDEBDD] w-351 p-8 ml-12 rounded-2xl flex flex-col gap-6 mt-10">
                        <div className="flex gap-5 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px]">Guardian's Name</p>
                            <input {...register("guardian_last_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Last Name" required />
                            <input {...register("guardian_first_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="First Name" required />
                            <input {...register("guardian_middle_name")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Middle Name" />
                            <p className="text-[#1B1717] text-[14px]">Ext.</p>
                            <input {...register("guardian_ext")} type="text" className="border text-[12px] w-20 h-10 p-3 rounded-[5px]" placeholder="Jr/Sr" />
                            <p className="text-[#1B1717] text-[14px]">Contact Number</p>
                            <input {...register("guardian_contact")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Contact #" required />
                            <p className="text-[#1B1717] text-[14px]">Relationship</p>
                            <input {...register("guardian_relationship")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Relationship" required />
                        </div>
                        {/* Guardian's Address */}
                        <div className="flex gap-7 items-center ml-7">
                            <p className="text-[#1B1717] text-[14px] w-32">Guardian Address</p>
                            <input {...register("g_house_no")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="HouseNo" />
                            <input {...register("g_street")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Street" />
                            <input {...register("g_barangay")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Barangay" />
                            <input {...register("g_municipality")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="City" />
                            <input {...register("g_province")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px]" placeholder="Province" />
                        </div>
                    </div>

                    <div className="flex gap-5 pl-16 mt-6">
                        <p className='text-[#1B1717] text-[14px]'>Is this student a transferee? <span className="text-[#630000]">(✓) if yes</span></p>
                        <input {...register("is_transferee")} type="checkbox" className="w-5 h-5 accent-[#630000]" />
                    </div>

                    <div className="mt-16 ml-12 flex gap-4">
                        <button 
                            type="button" 
                            onClick={() => setStep(1)} 
                            className="flex items-center gap-2 px-8 py-4 bg-[#1B1717] text-white rounded-xl font-bold hover:bg-gray-600 transition-all shadow-md"
                        >
                            <ArrowLeft size={20} />
                            BACK
                        </button>
                        <button 
                            type="submit" 
                            className="flex items-center gap-2 px-10 py-4 bg-[#630000] text-white rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95"
                        >
                            <Save size={20} />
                            ENROLL & SAVE RECORD
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}