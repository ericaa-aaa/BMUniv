import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Paperclip } from "lucide-react";
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function AddSHS() {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const { 
    register, 
    watch, 
    setValue, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
        level: "SeniorHigh", 
        lastname: "",
        firstname: "",
        middlename: "",
        ext: "",
        email_address: "",
        grade_level: "", 
        strand: "",
        position: "",
        subjects: [],    
    }
  });

  const selectedGrade = watch("grade_level");
  const selectedStrand = watch("strand");
  const photoFile = watch("photo");

  useEffect(() => {
      if (selectedGrade && selectedStrand) {
          const gradeValue = selectedGrade.replace("Grade", "");
          FacultyTeacherService.getSubjectsByGradeSHS(gradeValue, selectedStrand)
              .then(data => {
                  setAvailableSubjects(data);
                  setValue("subjects", []); 
              })
              .catch(err => console.error(err));
      } else {
          setAvailableSubjects([]);
          setValue("subjects", []);
      }
  }, [selectedGrade, selectedStrand, setValue]);

  useEffect(() => {
    if (photoFile && photoFile[0]) {
      setPhotoPreview(URL.createObjectURL(photoFile[0]));
    }
  }, [photoFile]);

  // Unified toast.promise implementation triggered via standard onSubmit pipeline
  const onFormSubmit = async (data) => {
    toast.promise(
      FacultyTeacherService.addFaculty(data), 
      {
        loading: 'Processing faculty...',
        success: <b>Faculty added successfully!</b>,
        error: (err) =>
          <b>{err.message === "SESSION_EXPIRED" ? "Session Expired" : "Submission Failed"}</b>,
      },
      {
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
        position: "top-right"
      }
    ).catch((error) => {
      if (error.message === "SESSION_EXPIRED") {
        setTimeout(() => { window.location.href = "/"; }, 2000);
      }
    });
  };

  // Replaces fallback block checks with localized UI trigger messaging
  const onFormError = () => {
    toast.error("Please fill all required fields, including the profile photo.", {
      position: "top-right",
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(onFormSubmit, onFormError)} 
      className="relative h-auto pb-10 font-[Inter] H-100"
    >
      <input
        type="file"
        id="p-input"
        className="hidden"
        {...register("photo", { 
          required: true,
          validate: (value) => value && value.length > 0
        })}
        accept="image/*"
      />
      <div className="flex items-center justify-between w-full pl-12 pr-12 pt-2">
        <div className="flex gap-5 items-center">
          <p className="text-[#630000] text-[25px] font-semibold">Senior High Teacher's Information</p>
        </div>
        <div className="relative w-24 h-24">
          {/* Photo Validation Circle Layout */}
          <div className={`w-full h-full bg-[#EDEBDD] rounded-full border-2 flex items-center justify-center overflow-hidden transition-colors ${errors.photo ? "border-red-500 bg-red-50" : "border-[#630000]"}`}>
            {photoPreview ? (
              <img
                src={photoPreview}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              <span className={`text-[10px] text-center ${errors.photo ? "text-red-500 font-medium" : "text-gray-400"}`}>
                {errors.photo ? "Photo Required" : "No Photo"}
              </span>
            )}
          </div>

          <div className="absolute bottom-0 right-0 translate-x-1 translate-y-1">
            <label
              htmlFor="p-input"
              className={`p-2 text-white rounded-full block cursor-pointer transition-colors shadow-md border-2 border-white ${errors.photo ? "bg-red-500 hover:bg-red-600" : "bg-[#630000] hover:bg-red-900"}`}
            >
              <Paperclip size={18} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-y-5 justify-items-center max-w-7xl mx-auto pt-12">
        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Teacher's Name:</p>
          <input 
            {...register("lastname", { required: true })} 
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.lastname ? "border-red-500 bg-red-50" : "border-[#630000]"}`} 
            placeholder="Last Name" 
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input 
            {...register("firstname", { required: true })} 
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.firstname ? "border-red-500 bg-red-50" : "border-[#630000]"}`} 
            placeholder="First Name" 
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input 
            {...register("middlename")} 
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.middlename ? "border-red-500 bg-red-50" : "border-[#630000]"}`} 
            placeholder="Middle Name" 
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input 
            {...register("ext")} 
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.ext ? "border-red-500 bg-red-50" : "border-[#630000]"}`} 
            placeholder="Ext" 
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Email Address:</p>
          <input 
            {...register("email_address", { required: true })} 
            type="email" 
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.email_address ? "border-red-500 bg-red-50" : "border-[#630000]"}`} 
            placeholder="Email Address" 
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Grade Level</p>
          <select 
            {...register("grade_level", { required: true })} 
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.grade_level ? "border-red-500 bg-red-50" : "border-[#630000]"}`} 
          >
            <option value="">Select</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>    
          </select>
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Strand</p>
          <select 
            {...register("strand", { required: true })} 
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.strand ? "border-red-500 bg-red-50" : "border-[#630000]"}`} 
          >
            <option value="">Select</option>
            <option value="HUMSS">HUMMS</option>
            <option value="STEM">STEM</option>    
            <option value="ABM">ABM</option> 
            <option value="GAS">GAS</option> 
          </select>
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] ">Position</p>
          <input 
            {...register("position", { required: true })} 
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.position ? "border-red-500 bg-red-50" : "border-[#630000]"}`} 
            placeholder="Position"
          />
        </div>
      </div>

      <div className="pl-12 pt-15">
        <p className="text-[#630000] text-[25px] font-semibold">Subjects To Teach</p>
        <p className={`text-[12px] ${errors.subjects ? "text-red-500 font-medium" : "text-black-500 italic"}`}>
          {errors.subjects ? "At least one subject must be selected." : "Select the specific subjects this teacher will handle."}
        </p>
      </div>

      {/* Dynamic Subjects Selection Grid Container */}
      <div className={`grid grid-cols-3 gap-8 px-24 mt-10 font-medium p-4 rounded-xl transition-colors ${errors.subjects ? "bg-red-50 border border-red-200" : ""}`}>
        {availableSubjects.length > 0 ? (
          availableSubjects.map((sub) => (
            <div key={sub.id} className="flex items-center gap-5">
              <input 
                {...register("subjects", { required: true })} 
                type="checkbox" 
                value={String(sub.id)} 
                className="w-5 h-5 accent-[#630000]" 
              />
              <p className='text-[#1B1717] text-[18px]'>{sub.name}</p>
            </div>
          ))
        ) : (
          <p className="text-black-400 italic">Please select Grade 11 or 12 alongside a Strand to see subjects...</p>
        )}
      </div>

      <div className="flex justify-center fixed right-200 bottom-10"> 
        {/* Changed button type to "submit" to trigger the useForm native lifecycle hooks */}
        <button 
          type="submit" 
          className="bg-[#630000] text-[#EDEBDD] text-[15px] px-6 py-3 rounded-xl font-bold hover:bg-red-800 shadow-lg transition-all"
        >
          Add Senior High Faculty
        </button>
      </div>
    </form>
  );
}