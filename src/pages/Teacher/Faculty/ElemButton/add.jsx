import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function Add({ setShowAdd }) {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
        lastname: "",
        firstname: "",
        middlename: "",
        ext: "",
        email_address: "",
        grade_level: "", // Linked to the select
        position: "",
        subjects: [],    // Array to hold checked IDs
    }
  });

  // Watch the grade level to refresh subjects
const selectedGrade = watch("grade_level");

useEffect(() => {
    if (selectedGrade) {
        FacultyTeacherService.getSubjectsByGrade(selectedGrade)
            .then(data => {
                setAvailableSubjects(data);

                // --- AUTO-CHECK LOGIC ---
                // If grade is 1, 2, or 3, select all IDs immediately
                if (["1", "2", "3"].includes(selectedGrade)) {
                    const allSubjectIds = data.map(sub => String(sub.id));
                    setValue("subjects", allSubjectIds); 
                } else {
                    // For Grades 4-6, maybe clear them or leave them empty for manual pick
                    setValue("subjects", []);
                }
            })
            .catch(err => console.error("Failed to fetch:", err));
    } else {
        setAvailableSubjects([]);
        setValue("subjects", []);
    }
}, [selectedGrade, setValue]);

const onSubmit = async (data) => {
    try {
      await FacultyTeacherService.addFaculty(data);
      alert("Faculty Record Saved Successfully!");

      // 1. Check if setShowAdd was passed as a prop
      if (typeof setShowAdd === 'function') {
        setShowAdd(false); 
      } else {
        // 2. If it's not a function (standalone page), refresh to show new data
        window.location.reload(); 
      }
      
    } catch (error) {
      if (error.message === "SESSION_EXPIRED") {
        alert("Session expired. Please log in again.");
        window.location.href = "/";
      } else {
        // Log the actual error for debugging
        console.error("Submission Error:", error);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-100 font-[Inter]">
      <div className="pl-12 pt-5">
        <p className="text-[#630000] text-[25px] font-semibold">Teacher's Information</p>
      </div>

      <div className="bg-[#EDEBDD] w-full py-7 px-4 ml-12 mt-5 rounded-2xl flex flex-col gap-8 max-w-[90%]">
        <div className="flex gap-7 items-center ml-7">
          <p className="text-[#1B1717] text-[14px]">Teacher's Name:</p>
          <input {...register("lastname")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Last Name" required />
          <input {...register("firstname")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="First Name" required />
          <input {...register("middlename")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Middle Name" />
          <input {...register("ext")} type="text" className="border text-[12px] w-20 h-10 p-3 rounded-[5px] bg-white" placeholder="Ext" />
        </div>

        <div className="flex gap-7 items-center ml-7">
          <p className="text-[#1B1717] text-[14px]">Email Address:</p>
          <input {...register("email_address")} type="email" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Email Address" required />
          
          <p className="text-[#1B1717] text-[14px] ml-7">Grade Level</p>
            <select 
            {...register("grade_level")} 
            className="border text-[12px] w-30 h-10 p-2 rounded-[5px]" 
            required
            >
            <option value="">Select</option>
            {/* We use the number as the value so the API can read it easily */}
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>    
            </select>

          <p className="text-[#1B1717] text-[14px] ml-7">Position</p>
          <input {...register("position")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Position" required />
        </div>
      </div>

      <div className="pl-12 pt-10">
        <p className="text-[#630000] text-[25px] font-semibold">Subjects To Teach</p>
        <p className="text-[12px] text-gray-500">Available subjects for {selectedGrade || "selected grade"}</p>
      </div>

      {/* DYNAMIC CHECKBOX SECTION */}
      <div className="grid grid-cols-3 gap-8 px-24 mt-10 font-medium">
        {availableSubjects.length > 0 ? (
          availableSubjects.map((sub) => (
            <div key={sub.id} className="flex items-center gap-5">
              <input 
                {...register("subjects")} 
                type="checkbox" 
                value={sub.id} 
                className="w-5 h-5 accent-[#630000]" 
              />
              <p className='text-[#1B1717] text-[18px]'>{sub.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">Please select a grade level first...</p>
        )}
      </div>

      <div className="flex justify-center mt-20 gap-4"> 
        <button type="submit" className="bg-[#630000] text-[#EDEBDD] text-[20px] px-10 py-3 rounded-xl font-bold hover:bg-[#800000] transition-colors">
          Add Faculty
        </button>
      </div>
    </form>
  );
}