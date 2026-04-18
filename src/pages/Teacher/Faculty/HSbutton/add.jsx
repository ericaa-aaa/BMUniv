import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function AddJHS({ setShowAdd }) {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  
  const { register, handleSubmit, watch, trigger, setValue, reset, formState: { errors } } = useForm({
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

  const handleAddFaculty = async () => {
    // 1. Define fields to check
    const fieldsToValidate = ["lastname", "firstname", "email_address", "grade_level", "position"];

    // 2. Trigger validation
    const isFormValid = await trigger(fieldsToValidate);

    if (isFormValid) {
        // 3. Get the clean data directly from the form
        const formData = watch(); 
        
        // 4. Run the submission logic
        toast.promise(
            FacultyTeacherService.addFaculty(formData), 
            {
                loading: 'Adding faculty teacher...',
                success: <b>Faculty added successfully!</b>,
                error: (err) => <b>{err.message === "SESSION_EXPIRED" ? "Session Expired" : "Failed to add"}</b>,
            },
            {
                style: { borderRadius: '10px', background: '#333', color: '#fff' },
                position: "top-right"
            }
        ).then(() => {
            // SUCCESS: 
            setShowAdd(false); // This closes the modal and clears the warning!
            reset();           // Optional: Clears the form fields for next time
        });
    } else {
        toast.error("Please fill all required fields.", {
            position: "top-right",
            style: { borderRadius: '10px', background: '#333', color: '#fff' },
        });
    }
};

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
      const result = await FacultyTeacherService.addFaculty(data);
        return result; 
    } catch (error) {
        if (error.message === "SESSION_EXPIRED") {
            setTimeout(() => { window.location.href = "/"; }, 2000);
        }
        throw error; 
    }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-auto pb-10 font-[Inter]">
      {/* Header */}
      <div className="pl-12 pt-5">
        <p className="text-[#630000] text-[25px] font-semibold">Junior High Faculty Information</p>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-4 gap-y-5 justify-items-center max-w-7xl mx-auto pt-13">
        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Teacher's Name:</p>
          <input {...register("lastname", { required: true })} className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.lastname ? "border-red-500 bg-red-50" : "border-#630000"}`} placeholder="Last Name" />
        </div>
        
        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("firstname", { required: true })} className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.firstname ? "border-red-500 bg-red-50" : "border-#630000"}`} placeholder="First Name"/>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("middlename")} className="border text-[12px] w-40 h-10 p-3 rounded-[5px] bg-white" placeholder="Middle Name" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input {...register("ext")} className="border text-[12px] w-40 h-10 p-3 rounded-[5px] bg-white" placeholder="Ext" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Email Address:</p>
          <input {...register("email_address", { required: true })} type="email" className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.email_address ? "border-red-500 bg-red-50" : "border-#630000"}`} placeholder="Email Address" />
        </div> 

        <div className="flex flex-col gap-1"> 
          <p className="text-[#1B1717] text-[14px] ml-7">Grade Level</p>
          <select {...register("grade_level", { required: true })} className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.grade_level ? "border-red-500 bg-red-50" : "border-#630000"}`}>
            <option value="">Select</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>    
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] ml-7">Position</p>
          <input {...register("position", { required: true })} className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.position ? "border-red-500 bg-red-50" : "border-#630000"}`} placeholder="Position"/>
        </div>
      </div>

      {/* Subject Section */}
      <div className="pl-12 pt-14">
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
      <div className="flex justify-center mt-10"> 
        <button type="submit" onClick={handleAddFaculty} className="flex justify-center mt-46 gap-2 px-6 py-3 bg-[#630000] text-white text-[15px] rounded-xl font-bold hover:bg-red-800 shadow-lg transition-all">
          Add JHS Faculty
        </button>
      </div>
    </form>
  );
}