import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Paperclip } from "lucide-react";
import { FacultyTeacherService } from "../../../../services/facultyteacherservice";

export default function AddJHS() {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    watch,
    setValue,
    getValues,
    trigger,
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

  const handleNext = async () => {
    let fieldsToValidate = [
      "lastname",
      "firstname",
      "email_address",
      "grade_level",
      "position",
    ];

    const isValid = await trigger(fieldsToValidate);
    if (!isValid) {
      toast.error("Please fill all required fields.", {
        position: "top-right",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      return;
    }

    const dataToSend = getValues();
    toast.promise(
      onSubmit(dataToSend),
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
      },
    );
  };

  const selectedGrade = watch("grade_level");
  const photoFile = watch("photo");

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

  useEffect(() => {
    if (photoFile && photoFile[0]) {
      setPhotoPreview(URL.createObjectURL(photoFile[0]));
    }
  }, [photoFile]);

  const onSubmit = async (data) => {
    try {
      const result = await FacultyTeacherService.addFaculty(data);
      return result;
    } catch (error) {
      if (error.message === "SESSION_EXPIRED") {
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
      throw error;
    }
  };

  return (
    <form className="relative h-auto pb-10 font-[Inter]">
      <input
        type="file"
        id="p-input"
        className="hidden"
        {...register("photo")}
        accept="image/*"
      />
      <div className="flex items-center justify-between w-full pl-12 pr-12 pt-2">
        <div className="flex gap-5 items-center">
          <p className="text-[#630000] text-[25px] font-semibold">
            Junior High Faculty Information
          </p>
        </div>

        <div className="relative w-24 h-24">
          {/* Photo Circle */}
          <div className="w-full h-full bg-[#EDEBDD] rounded-full border-2 border-[#630000] flex items-center justify-center overflow-hidden">
            {photoPreview ? (
              <img
                src={photoPreview}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              <span className="text-[10px] text-gray-400 text-center">
                No Photo
              </span>
            )}
          </div>

          {/* Overlapping Icon Button */}
          <div className="absolute bottom-0 right-0 translate-x-1 translate-y-1">
            <label
              htmlFor="p-input"
              className="p-2 bg-[#630000] text-white rounded-full block cursor-pointer hover:bg-red-900 transition-colors shadow-md border-2 border-white"
            >
              <Paperclip size={18} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-y-5 justify-items-center max-w-7xl mx-auto  pt-12">
        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Teacher's Name:</p>
          <input
            {...register("lastname", { required: true })}
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.lastname ? "border-red-500 bg-red-50" : "border-#630000"}`}
            placeholder="Last Name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">
            Teacher's Name:
          </p>
          <input
            {...register("firstname", { required: true })}
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.firstname ? "border-red-500 bg-red-50" : "border-#630000"}`}
            placeholder="First Name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">
            Teacher's Name:
          </p>
          <input
            {...register("middlename")}
            className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40"
            placeholder="Middle Name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] invisible">
            Teacher's Name:
          </p>
          <input
            {...register("ext")}
            className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40"
            placeholder="Ext"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Email Address:</p>
          <input
            {...register("email_address", { required: true })}
            type="email"
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.email_address ? "border-red-500 bg-red-50" : "border-#630000"}`}
            placeholder="Email Address"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px]">Grade Level</p>
          <select
            {...register("grade_level", { required: true })}
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.grade_level ? "border-red-500 bg-red-50" : "border-#630000"}`}
          >
            <option value="">Select</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#1B1717] text-[14px] ">Position</p>
          <input
            {...register("position", { required: true })}
            className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.position ? "border-red-500 bg-red-50" : "border-#630000"}`}
            placeholder="Position"
          />
        </div>
      </div>

      {/* Subject Section */}
      <div className="pl-12 pt-15">
        <p className="text-[#630000] text-[25px] font-semibold">
          Subjects To Teach
        </p>
        {selectedGrade && (
          <p className="text-[12px] text-gray-500 italic">
            Showing subjects for Grade {selectedGrade}. All are selected by
            default.
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
              <p className="text-[#1B1717] text-[18px]">{sub.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">
            Please select a grade level to load subjects...
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center fixed right-200 bottom-10">
        <button
          type="button"
          onClick={handleNext}
          className="bg-[#630000] text-[#EDEBDD] text-[15px] px-6 py-3 rounded-xl font-bold hover:bg-red-800 shadow-lg transition-all"
        >
          Add JHS Faculty
        </button>
      </div>
    </form>
  );
}
