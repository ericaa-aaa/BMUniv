import React, { useState, useRef } from "react";
import { Paperclip, Save } from "lucide-react";

export default function Page1() {
    const fileInputRef = useRef(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    // Initial state matching your Flask model fields
    const [formData, setFormData] = useState({
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
        curr_street: "",
        curr_barangay: "",
        curr_municipality: "",
        curr_province: "",
        is_permanent_same: false,
        perm_street: "",
        perm_barangay: "",
        perm_municipality: "",
        perm_province: "",
    });

    // Handle text and checkbox changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        
        setFormData(prev => {
            const updated = { ...prev, [name]: val };
            // If "same as permanent" is checked, sync the address fields
            if (name === "is_permanent_same" && checked) {
                updated.perm_street = prev.curr_street;
                updated.perm_barangay = prev.curr_barangay;
                updated.perm_municipality = prev.curr_municipality;
                updated.perm_province = prev.curr_province;
            }
            return updated;
        });
    };

    // Handle Photo selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file)); // For UI preview
        }
    };

    // Submit to Backend
const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (photoFile) data.append("photo", photoFile);

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:5000/students", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: data, 
        });

        // 🚨 ADD THIS CHECK HERE
        if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "/";
            return;
        }

        if (response.ok) {
            alert("Student Record Saved Successfully!");
        } else {
            const err = await response.json();
            alert("Error: " + err.error);
        }
    } catch (error) {
        alert("Server connection failed.");
    }
};

    return (
        <form onSubmit={handleSubmit} className="relative min-h-screen bg-white pb-20 font-['Inter']"> 
            
            {/* Hidden Photo Input */}
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />

            {/* Attachment Button & Preview */}
            <div className="absolute top-9 right-12 flex flex-col items-center gap-1">
                <div className="w-24 h-24 mb-2 bg-[#EDEBDD] rounded-full border-2 border-[#630000] flex items-center justify-center overflow-hidden">
                    {photoPreview ? <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" /> : <span className="text-[10px] text-gray-400">No Photo</span>}
                </div>
                <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="p-3 bg-[#630000] text-white rounded-full hover:bg-red-900 transition-colors shadow-md"
                >
                    <Paperclip size={24} />
                </button>
                <span className="text-[10px] text-[#630000] font-bold">ATTACH PHOTO</span>
            </div>

            {/* Grade Level */}
            <div className="pt-9 pl-12 flex gap-5 items-center">
                <p className="text-[#630000] text-[25px] font-semibold">Grade Level:</p>
                <input name="grade_level" onChange={handleChange} type="text" className="border text-[12px] w-20 h-9 p-3 rounded-[5px]" required />
            </div>

            <div className="pt-10 pl-12">
                <p className="text-[#630000] text-[25px] font-semibold">Student Information</p>
            </div>

            {/* Student Info Box */}
            <div className="bg-[#EDEBDD] w-275 p-8 ml-12 rounded-2xl flex flex-col gap-6">
                <div className="flex gap-5 items-center">
                    <p className="text-[#1B1717] text-[14px]">Student Name:</p>
                    <input name="lastname" onChange={handleChange} type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px]" placeholder="Last Name" required />
                    <input name="firstname" onChange={handleChange} type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px]" placeholder="First Name" required />
                    <input name="middlename" onChange={handleChange} type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px]" placeholder="Middle Name" />
                    <p className="text-[#1B1717] text-[14px]">Ext.</p>
                    <input name="ext" onChange={handleChange} type="text" className="border text-[12px] w-20 h-10 p-3 rounded-[5px]" placeholder="Jr/Sr" />
                    <p className="text-[#1B1717] text-[14px]">Age:</p>
                    <input name="age" onChange={handleChange} type="number" className="border text-[12px] w-20 h-10 p-3 rounded-[5px]" placeholder="Age" required />
                </div>

                <div className="flex gap-5 items-center">
                    <p className="text-[#1B1717] text-[14px]">Birth Date:</p>
                    <input name="birthdate" onChange={handleChange} type="date" className="border text-[12px] w-50 h-10 p-3 rounded-[5px]" required />
                    <p className="text-[#1B1717] text-[14px]">Place of Birth</p>
                    <input name="place_of_birth" onChange={handleChange} type="text" className="border text-[12px] w-50 h-10 p-3 rounded-[5px]" placeholder="City/Province" required />
                    <p className="text-[#1B1717] text-[14px]">Civil Status</p>
                    <select name="civil_status" onChange={handleChange} className="border text-[12px] w-40 h-10 p-2 rounded-[5px]">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                    <p className="text-[#1B1717] text-[14px]">Gender</p>
                    <select name="gender" onChange={handleChange} className="border text-[12px] w-40 h-10 p-2 rounded-[5px]" required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="flex gap-5 items-center">
                    <p className="text-[#1B1717] text-[14px]">Mother Tongue</p>
                    <input name="mother_tongue" onChange={handleChange} type="text" className="border text-[12px] w-40 h-10 p-3 rounded-[5px]" placeholder="Language" />
                    <p className="text-[#1B1717] text-[14px]">Religion</p>
                    <input name="religion" onChange={handleChange} type="text" className="border text-[12px] w-40 h-10 p-3 rounded-[5px]" placeholder="Religion" />
                    <p className="text-[#1B1717] text-[14px]">Weight</p>
                    <input name="weight" onChange={handleChange} type="number" step="0.1" className="border text-[12px] w-24 h-10 p-3 rounded-[5px]" placeholder="kg" />
                    <p className="text-[#1B1717] text-[14px]">Height</p>
                    <input name="height" onChange={handleChange} type="number" step="0.1" className="border text-[12px] w-24 h-10 p-3 rounded-[5px]" placeholder="cm" />
                </div>
            </div>

            {/* IP Community */}
            <div className="flex items-center gap-5 pl-16 mt-4">
                <p className='text-[#1B1717] text-[14px]'>Indigenous Peoples (IP) Community? <span className="text-[#630000]">(Check if yes)</span></p>
                <input name="is_ip_community" type="checkbox" onChange={handleChange} className="w-5 h-5 accent-[#630000]" />
            </div>

            {/* Contact Info */}
            <div className="pt-5 pl-12">
                <p className="text-[#630000] text-[25px] font-semibold">Contact Information</p>
            </div>

            <div className="bg-[#EDEBDD] w-275 p-8 ml-12 rounded-2xl flex flex-col gap-6">
                <div className="flex gap-5 items-center">
                    <p className="text-[#1B1717] text-[14px]">Contact Number</p>
                    <input name="contact_number" onChange={handleChange} type="text" className="border text-[12px] w-64 h-10 p-3 rounded-[5px]" placeholder="09XXXXXXXXX" required />
                    <p className="text-[#1B1717] text-[14px]">Email Address</p>
                    <input name="email_address" onChange={handleChange} type="email" className="border text-[12px] w-64 h-10 p-3 rounded-[5px]" placeholder="email@example.com" />
                </div>

                <div className="flex gap-4 items-center">
                    <p className="text-[#1B1717] text-[14px] w-32">Current Address</p>
                    <input name="curr_street" onChange={handleChange} type="text" className="border text-[12px] flex-1 h-10 p-3 rounded-[5px]" placeholder="Street" required />
                    <input name="curr_barangay" onChange={handleChange} type="text" className="border text-[12px] flex-1 h-10 p-3 rounded-[5px]" placeholder="Barangay" required />
                    <input name="curr_municipality" onChange={handleChange} type="text" className="border text-[12px] flex-1 h-10 p-3 rounded-[5px]" placeholder="City/Municipality" required />
                    <input name="curr_province" onChange={handleChange} type="text" className="border text-[12px] flex-1 h-10 p-3 rounded-[5px]" placeholder="Province" required />
                </div>
            </div>

            {/* Permanent Address Toggle */}
            <div className="flex items-center gap-5 pl-16 mt-4">
                <p className='text-[#1B1717] text-[14px]'>Same as permanent address? <span className="text-[#630000]">(Check if yes)</span></p>
                <input name="is_permanent_same" type="checkbox" checked={formData.is_permanent_same} onChange={handleChange} className="w-5 h-5 accent-[#630000]" />
            </div>

            {!formData.is_permanent_same && (
                <div className="bg-[#EDEBDD] w-275 p-8 ml-12 rounded-2xl mt-5 flex gap-4 items-center">     
                    <p className="text-[#1B1717] text-[14px] w-32">Permanent Address</p>
                    <input name="perm_street" onChange={handleChange} type="text" className="border text-[12px] flex-1 h-10 p-3 rounded-[5px]" placeholder="Street" required />
                    <input name="perm_barangay" onChange={handleChange} type="text" className="border text-[12px] flex-1 h-10 p-3 rounded-[5px]" placeholder="Barangay" required />
                    <input name="perm_municipality" onChange={handleChange} type="text" className="border text-[12px] flex-1 h-10 p-3 rounded-[5px]" placeholder="City" required />
                    <input name="perm_province" onChange={handleChange} type="text" className="border text-[12px] flex-1 h-10 p-3 rounded-[5px]" placeholder="Province" required />
                </div>
            )}

            {/* Submit Button */}
            <div className="mt-10 ml-12">
                <button 
                    type="submit"
                    className="flex items-center gap-2 px-10 py-4 bg-[#630000] text-white rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95"
                >
                    <Save size={20} />
                    SAVE STUDENT RECORD
                </button>
            </div>
        </form>
    );
}