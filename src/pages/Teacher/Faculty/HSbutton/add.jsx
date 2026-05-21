import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Paperclip } from "lucide-react";
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function AddJHS() {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      level: "HighSchool",
      lastname: "",
      firstname: "",
      middlename: "",
      ext: "",
      email_address: "",
      grade_level: "",
      position: "",
      subjects: [],
    },
  });

  const selectedGrade = watch("grade_level");
  const photoFile = watch("photo");

  // Fetch subjects dynamically based on grade level
  useEffect(() => {
    if (selectedGrade) {
      FacultyTeacherService.getSubjectsByGrade(selectedGrade)
        .then((data) => {
          setAvailableSubjects(data);
          const allSubjectIds = data.map((sub) => String(sub.id));
          setValue("subjects", allSubjectIds);
        })
        .catch((err) => console.error("Failed to fetch subjects:", err));
    } else {
      setAvailableSubjects([]);
      setValue("subjects", []);
    }
  }, [selectedGrade, setValue]);

  // Handle local photo file upload preview & memory cleanup
  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const objectUrl = URL.createObjectURL(photoFile[0]);
      setPhotoPreview(objectUrl);

      // Clean up object URL memory leak when component unmounts or file changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [photoFile]);

  // Form submission handler (Runs only when validation passes)
  const onFormSubmit = (data) => {
    setLoading(true);
    toast.promise(
      FacultyTeacherService.addFaculty(data),
      {
        loading: "Processing faculty...",
        success: <b>Faculty added successfully!</b>,
        error: (err) => (
          <b>
            {err.message === "SESSION_EXPIRED"
              ? "Session Expired"
              : "Submission Failed"}
          </b>
        ),
      },
      {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
        position: "top-right",
      }
    )
    .then(() => {
      // Handle post-success logic here if needed (e.g., form reset)
    })
    .catch((error) => {
      if (error.message === "SESSION_EXPIRED") {
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    })
    .finally(() => setLoading(false));
  };

  // Validation error handler (Runs when validation fails)
  const onFormError = (formErrors) => {
    let errorMessage = "Please fill all required fields.";
    
    if (formErrors.photo) {
      errorMessage = "Profile photo is required.";
    } else if (formErrors.email_address) {
      errorMessage = "Email address is required.";
    } else if (formErrors.grade_level) {
      errorMessage = "Grade Level is required.";
    } else if (formErrors.subjects) {
      errorMessage = "At least one subject must be selected.";
    }

    toast.error(errorMessage, {
      position: "top-right",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(onFormSubmit, onFormError)} 
      className="relative h-auto pb-10 font-[Inter]"
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
        <div className="flex gap-5 items-center ml-15">
          <p className="text-[#630000] text-[25px] font-semibold">
            Junior High Faculty Information
          </p>
        </div>

        <div className="relative w-24 h-24">
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
          <p className="text-[#1B1717] text-[14px] invisible">
            Teacher's Name:
          </p>
          <input
            {...register("firstname", { required: true })}
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.firstname ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="First Name"
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] invisible">
            Teacher's Name:
          </p>
          <input
            {...register("middlename")} // Removed required restriction for middle names
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.middlename ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="Middle Name"
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] invisible">
            Teacher's Name:
          </p>
          <input
            {...register("ext")} // Removed required restriction for name extensions
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
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Position</p>
          <input
            {...register("position", { required: true })}
            className={`border shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.position ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="Position"
          />
        </div>
      </div>

      <div className="pl-12 pt-15 ml-15">
        <p className="text-[#630000] text-[25px] font-semibold">
          Subjects To Teach
        </p>
        <p className={`text-[12px] ${errors.subjects ? "text-red-500 font-medium" : "text-gray-500 italic"}`}>
          {errors.subjects 
            ? "At least one subject must be selected." 
            : selectedGrade && `Showing subjects for Grade ${selectedGrade}. All are selected by default.`}
        </p>
      </div>

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
              <p className="text-[#1B1717] text-[18px]">{sub.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic ml-15">
            Please select a grade level to load subjects...
          </p>
        )}
      </div>

      <div className="flex justify-center fixed right-50 bottom-10">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#630000] text-[#EDEBDD] text-[15px] px-6 py-3 rounded-xl font-bold hover:bg-red-800 disabled:bg-gray-400 shadow-lg transition-all"
        >
          {loading ? "Adding..." : "Add JHS Faculty"}
        </button>
      </div>
    </form>
  );
}