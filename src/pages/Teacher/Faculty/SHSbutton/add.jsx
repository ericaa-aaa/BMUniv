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
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-auto pb-10 font-[Inter]">
      <div className="pl-12 pt-5">
        <p className="text-[#630000] text-[25px] font-semibold">Senior High Teacher's Information</p>
      </div>

      <div className="bg-[#EDEBDD] w-full py-7 px-4 ml-12 mt-5 rounded-2xl flex flex-col gap-8 max-w-[90%]">
        <div className="flex gap-7 items-center ml-7">
          <p className="text-[#1B1717] text-[14px]">Teacher's Name:</p>
          <input {...register("lastname")} className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Last Name" required />
          <input {...register("firstname")} className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="First Name" required />
          <input {...register("middlename")} className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Middle Name" />
          <input {...register("ext")} className="border text-[12px] w-20 h-10 p-3 rounded-[5px] bg-white" placeholder="Ext" />
        </div>

        <div className="flex gap-7 items-center ml-7">
          <p className="text-[#1B1717] text-[14px]">Email Address:</p>
          <input {...register("email_address")} type="email" className="border text-[12px] w-50 h-10 p-3 rounded-[5px] bg-white" placeholder="Email Address" required />
          
          <p className="text-[#1B1717] text-[14px] ml-7">Grade Level</p>
          <select {...register("grade_level")} className="border text-[12px] w-30 h-10 p-2 rounded-[5px]" required>
            <option value="">Select</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>

          <p className="text-[#1B1717] text-[14px] ml-7">Position</p>
          <input {...register("position")} className="border text-[12px] w-40 h-10 p-3 rounded-[5px] bg-white" placeholder="Position" required />
        </div>
      </div>

      <div className="pl-12 pt-10">
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

      <div className="flex justify-center mt-20"> 
        <button type="submit" className="bg-[#630000] text-[#EDEBDD] text-[20px] px-10 py-3 rounded-xl font-bold">
          Add Senior High Faculty
        </button>
      </div>
    </form>
  );
}