import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function AddSHS({ setShowAdd }) {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
        level: "SeniorHigh", // Matches your DB level column
        lastname: "",
        firstname: "",
        middlename: "",
        ext: "",
        email_address: "",
        grade_level: "", // This maps to the 'shs' select in your UI
        position: "",
        subjects: [],    // Holds the IDs of checked subjects
    }
  });

  const selectedGrade = watch("grade_level");

  // Fetch SHS subjects dynamically based on Grade 11 or 12
  useEffect(() => {
    if (selectedGrade) {
        // We strip the "Grade " prefix if your API expects just numbers (e.g., "11")
        const gradeValue = selectedGrade.replace("Grade ", "");
        FacultyTeacherService.getSubjectsByGrade(gradeValue)
            .then(data => {
                setAvailableSubjects(data);
                // For SHS, we usually DON'T auto-check all because teachers are specialized
                setValue("subjects", []); 
            })
            .catch(err => console.error("Failed to fetch SHS subjects:", err));
    } else {
        setAvailableSubjects([]);
        setValue("subjects", []);
    }
  }, [selectedGrade, setValue]);

  const onSubmit = async (data) => {
    try {
      await FacultyTeacherService.addFaculty(data);
      alert("Senior High Faculty Record Saved Successfully!");

      if (typeof setShowAdd === 'function') {
        setShowAdd(false); 
      } else {
        window.location.reload(); 
      }
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
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-auto pb-10 font-[Inter] H-100">
      <div className="pl-12 pt-5">
        <p className="text-[#630000] text-[25px] font-semibold">Senior High Teacher's Information</p>
      </div>

      <div className="grid grid-cols-4 gap-y-5 justify-items-center max-w-7xl mx-auto  pt-12">
        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Teacher's Name:</p>
          <input {...register("lastname")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Last Name" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("firstname")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="First Name" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("middlename")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Middle Name" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("ext")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Ext" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Email Address:</p>
          <input {...register("email_address")} type="email" className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Email Address" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Grade Level</p>
          <select {...register("grade_level")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-2 rounded-[5px] w-40" >
            <option value="">Select</option>
            <option value="7">Grade 11</option>
            <option value="8">Grade 12</option>    
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Strand</p>
          <select {...register("grade_level")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-2 rounded-[5px] w-40" >
            <option value="">Select</option>
            <option value="7">HUMMS</option>
            <option value="8">STEM</option>    
            <option value="8">ABM</option> 
            <option value="8">GAS</option> 
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] ">Position</p>
          <input {...register("position")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Position"/>
        </div>
      </div>

      <div className="pl-12 pt-15">
        <p className="text-[#630000] text-[25px] font-semibold">Subjects To Teach</p>
        <p className="text-[12px] text-gray-500 italic">Select the specific subjects this teacher will handle.</p>
      </div>

      {/* DYNAMIC CHECKBOX SECTION */}
      <div className="grid grid-cols-3 gap-8 px-24 mt-10 font-medium">
        {availableSubjects.length > 0 ? (
          availableSubjects.map((sub) => (
            <div key={sub.id} className="flex items-center gap-5">
              <input 
                {...register("subjects")} 
                type="checkbox" 
                value={String(sub.id)} 
                className="w-5 h-5 accent-[#630000]" 
              />
              <p className='text-[#1B1717] text-[18px]'>{sub.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">Please select Grade 11 or 12 to see subjects...</p>
        )}
      </div>

      <div className="flex justify-center mt-50"> 
        <button type="submit" className="bg-[#630000] text-[#EDEBDD] text-[15px] px-6 py-3 rounded-xl font-bold hover:bg-red-800 shadow-lg transition-all">
          Add Senior High Faculty
        </button>
      </div>
    </form>
  );
}