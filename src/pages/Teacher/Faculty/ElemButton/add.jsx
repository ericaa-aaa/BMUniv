import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function AddElementary({ setShowAdd }) {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
        // --- ADDED LEVEL KEY ---
        level: "Elementary", 
        lastname: "",
        firstname: "",
        middlename: "",
        ext: "",
        email_address: "",
        grade_level: "", 
        position: "",
        subjects: [],    
    }
  });

  const selectedGrade = watch("grade_level");

  useEffect(() => {
    if (selectedGrade) {
        FacultyTeacherService.getSubjectsByGrade(selectedGrade)
            .then(data => {
                setAvailableSubjects(data);

                // --- ELEMENTARY SPECIFIC AUTO-CHECK LOGIC ---
                // Automatically select all subjects for Grades 1, 2, and 3
                if (["1", "2", "3"].includes(selectedGrade)) {
                    const allSubjectIds = data.map(sub => String(sub.id));
                    setValue("subjects", allSubjectIds); 
                } else {
                    // For Grades 4-6, leave empty for manual selection or clear previous
                    setValue("subjects", []);
                }
            })
            .catch(err => console.error("Failed to fetch subjects:", err));
    } else {
        setAvailableSubjects([]);
        setValue("subjects", []);
    }
  }, [selectedGrade, setValue]);

  const onSubmit = async (data) => {
    try {
      // Data now includes 'level: "Elementary"' automatically from defaultValues
      await FacultyTeacherService.addFaculty(data);
      alert("Elementary Faculty Record Saved Successfully!");

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
        console.error("Submission Error:", error);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-100 font-[Inter]">
      <div className="pl-12 pt-5">
        <p className="text-[#630000] text-[25px] font-semibold">Elementary Teacher's Information</p>
      </div>

      <div className="grid grid-cols-4 gap-y-5 justify-items-center max-w-7xl mx-auto  pt-12">
        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Teacher's Name:</p>
          <input {...register("lastname")} type="text" className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Last Name"/>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("firstname")} type="text" className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="First Name" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("middlename")} type="text" className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Middle Name" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("ext")} type="text" className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Ext" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Email Address:</p>
          <input {...register("email_address")} type="email" className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Email Address" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] ">Grade Level</p>
            <select {...register("grade_level")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40">
                <option value="">Select</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>    
            </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Position</p>
          <input {...register("position")} type="text" className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Position"/>
        </div>
      </div>

      <div className="pl-12 pt-15">
        <p className="text-[#630000] text-[25px] font-semibold">Subjects To Teach</p>
        <p className="text-[12px] text-gray-500">
            {selectedGrade && ["1", "2", "3"].includes(selectedGrade) 
                ? `All subjects for Grade ${selectedGrade} are auto-selected.` 
                : `Available subjects for ${selectedGrade || "selected grade"}`}
        </p>
      </div>

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
          <p className="text-gray-400 italic">Please select a grade level first...</p>
        )}
      </div>

      <div className="flex justify-center mt-50 gap-4"> 
        <button type="submit" className="bg-[#630000] text-[#EDEBDD] text-[15px] px-6 py-3 rounded-xl font-bold hover:bg-red-800 shadow-lg transition-all">
          Add Elementary Faculty
        </button>
      </div>
    </form>
  );
}