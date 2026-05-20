import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Paperclip } from "lucide-react";
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function AddElementary() {
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
      level: "Elementary",
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

  // Dynamic Subject Loader Pipeline
  useEffect(() => {
    if (selectedGrade) {
      FacultyTeacherService.getSubjectsByGrade(selectedGrade)
        .then((data) => {
          setAvailableSubjects(data);

          if (["1", "2", "3"].includes(selectedGrade)) {
            const allSubjectIds = data.map((sub) => String(sub.id));
            setValue("subjects", allSubjectIds);
          } else {
            setValue("subjects", []);
          }
        })
        .catch((err) => console.error("Failed to fetch subjects:", err));
    } else {
      setAvailableSubjects([]);
      setValue("subjects", []);
    }
  }, [selectedGrade, setValue]);

  // Object URL Engine + Cleanup
  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const objectUrl = URL.createObjectURL(photoFile[0]);
      setPhotoPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [photoFile]);

  // Handler for successful react-hook-form submission operations
  const onFormSubmit = (data) => {
    setLoading(true);
    toast.promise(
      FacultyTeacherService.addFaculty(data),
      {
        loading: "Processing faculty and files...",
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
    ).finally(() => setLoading(false));
  };

  // Handler for custom error messaging UI triggers
  const onFormError = (errors) => {
    let errorMessage = "Please fill all required fields correctly.";
    
    if (errors.photo) {
      errorMessage = "Photo is required.";
    } else if (errors.subjects) {
      errorMessage = "At least one subject must be selected.";
    }

    toast.error(errorMessage, {
      id: "form-error",
      position: "top-right",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(onFormSubmit, onFormError)} 
      className="relative h-100 font-[Inter]"
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
            Elementary Teacher's Information
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

      <div className="grid grid-cols-4 gap-y-5 justify-items-center max-w-7xl mx-auto pt-5">
        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Teacher's Name:</p>
          <input
            {...register("lastname", { required: true })}
            type="text"
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.lastname ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="Last Name"
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input
            {...register("firstname", { required: true })}
            type="text"
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.firstname ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="First Name"
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input
            {...register("middlename")}
            type="text"
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.middlename ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="Middle Name"
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px] invisible">Teacher's Name:</p>
          <input
            {...register("ext")}
            type="text"
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.ext ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="Ext"
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Email Address:</p>
          <input
            {...register("email_address", { required: true })}
            type="email"
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.email_address ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="Email Address"
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Grade Level</p>
          <select
            {...register("grade_level", { required: true })}
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.grade_level ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
          >
            <option value="">Select</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 col-span-1 ml-9">
          <p className="text-[#1B1717] text-[14px]">Title</p>
          <input
            {...register("position", { required: true })}
            type="text"
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-60 ${errors.position ? "border-red-500 bg-red-50" : "border-[#630000]"}`}
            placeholder="Title"
          />
        </div>
      </div>

      <div className="pl-12 pt-15 ml-15">
        <p className="text-[#630000] text-[25px] font-semibold ">
          Subjects To Teach
        </p>
        <p className={`text-[12px] ${errors.subjects ? "text-red-500 font-medium" : "text-black-500"}`}>
          {errors.subjects 
            ? "At least one subject registration is required." 
            : selectedGrade && ["1", "2", "3"].includes(selectedGrade)
              ? `All subjects for Grade ${selectedGrade} are auto-selected.`
              : `Available subjects for ${selectedGrade || "selected grade"}`}
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
          <p className="text-black-400 italic ml-15">
            Please select a grade level first...
          </p>
        )}
      </div>

      <div className="flex justify-center fixed right-200 bottom-10 gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#630000] text-[#EDEBDD] text-[15px] px-6 py-3 rounded-xl font-bold hover:bg-red-800 disabled:bg-gray-400 shadow-lg transition-all"
        >
          {loading ? "Adding..." : "Add Elementary Faculty"}
        </button>
      </div>
    </form>
  );
}