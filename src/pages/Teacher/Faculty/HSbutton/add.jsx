import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function AddJHS({ setShowAdd }) {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
        // This 'level' matches your MySQL ENUM/Column name
        level: "HighSchool", 
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

  // Fetch subjects whenever the grade level changes
  useEffect(() => {
    if (selectedGrade) {
        FacultyTeacherService.getSubjectsByGrade(selectedGrade)
            .then(data => {
                setAvailableSubjects(data);

                // AUTO-SELECT LOGIC: 
                // For JHS, typically we want to auto-check everything for that grade
                const allSubjectIds = data.map(sub => String(sub.id));
                setValue("subjects", allSubjectIds); 
            })
            .catch(err => console.error("Failed to fetch subjects:", err));
    } else {
        setAvailableSubjects([]);
        setValue("subjects", []);
    }
  }, [selectedGrade, setValue]);

  const onSubmit = async (data) => {
    try {
      // The service uses FormData, so 'data' will be appended correctly
      await FacultyTeacherService.addFaculty(data);
      alert("Junior High Faculty Record Saved Successfully!");

      if (typeof setShowAdd === 'function') {
        setShowAdd(false); 
      } else {
        // If not in a modal, refresh to see the list
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
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-auto pb-10 font-[Inter]">
      {/* Header */}
      <div className="pl-12 pt-5">
        <p className="text-[#630000] text-[25px] font-semibold">Junior High Faculty Information</p>
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
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>    
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] ">Position</p>
          <input {...register("position")} className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40" placeholder="Position"/>
        </div>
      </div>

      {/* Subject Section */}
      <div className="pl-12 pt-10">
        <p className="text-[#630000] text-[25px] font-semibold">Subjects To Teach</p>
        {selectedGrade && (
            <p className="text-[12px] text-gray-500 italic">
                Showing subjects for Grade {selectedGrade}. All are selected by default.
            </p>
        )}
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
          <p className="text-gray-400 italic">Please select a grade level to load subjects...</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-50"> 
        <button type="submit" className="bg-[#630000] text-[#EDEBDD] text-[15px] px-6 py-3 rounded-xl font-bold hover:bg-red-800 shadow-lg transition-all">
          Add JHS Faculty
        </button>
      </div>
    </form>
  );
}
