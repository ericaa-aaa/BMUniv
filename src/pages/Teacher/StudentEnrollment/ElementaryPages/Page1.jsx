import { useState, useEffect } from "react";
import toast from "react-hot-toast";
//library para sa mga forms
//hindi na need gumawa ng state per input
import { useForm } from "react-hook-form";
import { Paperclip, Save, ArrowRight, ArrowLeft } from "lucide-react";
import { ElementaryStudentService } from "../../../../services/elementarystudentservice";

export default function EnrollmentForm() {
  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      grade_level: "",
      lastname: "",
      firstname: "",
      middlename: "",
      ext: "",
      age: "",
      birthdate: "",
      place_of_birth: "",
      civil_status: "",
      gender: "",
      citizenship: "",
      mother_tongue: "",
      religion: "",
      weight: "",
      height: "",
      is_ip_community: false,
      contact_number: "",
      email_address: "",
      curr_house_no: "",
      curr_street: "",
      curr_barangay: "",
      curr_municipality: "",
      curr_province: "",
      is_permanent_same: false,
      perm_house_no: "",
      perm_street: "",
      perm_barangay: "",
      perm_municipality: "",
      perm_province: "",
      // Page 2 fields
      father_last_name: "",
      father_first_name: "",
      father_middle_name: "",
      father_ext: "",
      father_contact: "",
      father_occupation: "",
      f_house_no: "",
      f_street: "",
      f_barangay: "",
      f_municipality: "",
      f_province: "",
      mother_last_name: "",
      mother_first_name: "",
      mother_middle_name: "",
      mother_ext: "",
      mother_contact: "",
      mother_occupation: "",
      m_house_no: "",
      m_street: "",
      m_barangay: "",
      m_municipality: "",
      m_province: "",
      guardian_last_name: "",
      guardian_first_name: "",
      guardian_middle_name: "",
      guardian_ext: "",
      guardian_contact: "",
      guardian_relationship: "",
      g_house_no: "",
      g_street: "",
      g_barangay: "",
      g_municipality: "",
      g_province: "",
      is_transferee: false,
    },
  });

  const handleNext = async () => {
    let fieldsToValidate = [];

    if (step === 1) {
      fieldsToValidate = [
        "lastname",
        "firstname",
        "age",
        "civil_status",
        "gender",
        "grade_level",
        "email_address",
        "birthdate",
        "citizenship",
        "place_of_birth",
        "mother_tongue",
        "religion",
        "weight",
        "height",
        "curr_house_no",
        "curr_street",
        "curr_barangay",
        "curr_municipality",
        "curr_province",
      ];

      if (!isPermanentSame) {
        fieldsToValidate = [
          ...fieldsToValidate,
          "perm_house_no",
          "perm_street",
          "perm_barangay",
          "perm_municipality",
          "perm_province",
        ];
      }
    }

    // ONLY check Step 2 fields
    else if (step === 2) {
      fieldsToValidate = [
        "father_first_name",
        "father_last_name",
        "father_contact",
        "father_occupation",
        "f_house_no",
        "f_street",
        "f_barangay",
        "f_municipality",
        "f_province",
        "mother_lastname",
        "mother_first_name",
        "mother_contact",
        "mother_occupation",
        "m_house_no",
        "m_street",
        "m_barangay",
        "m_municipality",
        "m_province",
        "guardian_last_name",
        "guardian_first_name",
        "guardian_contact",
        "guardian_relationship",
        "g_house_no",
        "g_street",
        "g_barangay",
        "g_municipality",
        "g_province",
      ];
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      if (step === 2) {
        const dataToSend = getValues();
        toast.promise(
          onSubmit(dataToSend),
          {
            loading: "Processing enrollment...",
            success: <b>Enrollment submitted successfully!</b>,
            error: (err) => (
              <b>
                {err.message === SESSION_EXPIRED
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
      } else {
        setStep((prev) => prev + 1);
      }
    } else {
      let errorMessage = "Please fill all required fields.";

      if (errors.grade_level) {
        errorMessage =
          "Please enter a valid grade (1-6) and fill all required fields.";
      }

      toast.error(errorMessage, {
        position: "top-right",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  const isPermanentSame = watch("is_permanent_same");
  const currhouseno = watch("curr_house_no");
  const currStreet = watch("curr_street");
  const currBarangay = watch("curr_barangay");
  const currMunicipality = watch("curr_municipality");
  const currProvince = watch("curr_province");
  const photoFile = watch("photo");

  useEffect(() => {
    if (isPermanentSame) {
      setValue("perm_house_no", currhouseno);
      setValue("perm_street", currStreet);
      setValue("perm_barangay", currBarangay);
      setValue("perm_municipality", currMunicipality);
      setValue("perm_province", currProvince);
    }
  }, [
    isPermanentSame,
    currStreet,
    currBarangay,
    currMunicipality,
    currProvince,
    setValue,
  ]);

  useEffect(() => {
    if (photoFile && photoFile[0]) {
      setPhotoPreview(URL.createObjectURL(photoFile[0]));
    }
  }, [photoFile]);

  const onSubmit = async (data) => {
    try {
      const result = await ElementaryStudentService.enrollStudent(data);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative h-100 font-['Inter'] "
    >
      {/* PAGE 1: STUDENT INFORMATION */}
      {step === 1 && (
        <>
          {/* Hidden Photo Input */}
          <input
            type="file"
            id="p-input"
            className="hidden"
            {...register("photo")}
            accept="image/*"
          />

          {/* Attachment Button & Preview */}
          <div className="flex items-center justify-between w-full pl-12 pr-12 pt-2">
            <div className="flex gap-5 items-center">
              <p className="text-[#630000] text-[25px] font-semibold">
                Grade Level:
              </p>
              <input
                {...register("grade_level", {
                  required: "Grade Level is required",
                  min: 1,
                  max: 6,
                  valueAsNumber: true,
                })}
                type="number"
                onKeyDown={(e) => {
                  if (
                    e.currentTarget.value.length >= 1 &&
                    e.key.length === 1 &&
                    e.key !== "e"
                  ) {
                    e.preventDefault();
                  }
                }}
                className={`border border-[#630000] shadow-sm text-[12px] w-13 h-8 p-3 rounded-[5px] ${errors.grade_level ? "border-red-500 bg-red-50" : "border-#630000"}`}
              />
            </div>

            {/* Photo*/}
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

          <div className="pl-25 pb-3">
            <p className="text-[#630000] text-[25px] font-semibold">
              Student Information
            </p>
          </div>

          {/* Student Info Box */}
          <div className="grid grid-cols-5 gap-y-5 justify-items-center max-w-7xl mx-auto ">
            {/* Row 1: Names, Suffix, Age */}
            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Student Name:</p>
              {/* // bakit naka true ang required? 
                required: true means that the field is required and must be filled out before the form can be submitted. */}
              <input
                {...register("lastname", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.lastname ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Last Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible text-[14px]">First Name</p>
              <input
                {...register("firstname", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.firstname ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="First Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible text-[14px]">Middle Name</p>
              <input
                {...register("middlename")}
                type="text"
                className="border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40"
                placeholder="Middle Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Suffix:</p>
              <input
                {...register("ext")}
                type="text"
                className="border border-[#630000] shadow-sm text-[12px] h-10 p-3 rounded-[5px] w-40"
                placeholder="Jr/Sr"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Age:</p>
              <input
                {...register("age", { required: true })}
                type="number"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.age ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Age"
              />
            </div>

            {/* Row 2: Birth Details, Gender, Status */}
            <div className="flex flex-col gap-1 col-span-2">
              <p className="text-[#1B1717] text-[14px]">Place of Birth:</p>
              <input
                {...register("place_of_birth", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-104 ${errors.place_of_birth ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="City/Province"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Birth Date:</p>
              <input
                {...register("birthdate", { required: true })}
                type="date"
                className={`border border-[#630000] shadow-sm text-[12px] h-10 p-3 rounded-[5px] w-40 ${errors.birthdate ? "border-red-500 bg-red-50" : "border-#630000"}`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Gender:</p>
              <select
                {...register("gender", { required: true })}
                className={`border border-[#630000] text-[12px] shadow-sm h-10 p-2 rounded-[5px] w-40 ${errors.gender ? "border-red-500 bg-red-50" : "border-#630000"}`}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Civil Status:</p>
              <select
                {...register("civil_status", { required: true })}
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-2 rounded-[5px] w-40 ${errors.civil_status ? "border-red-500 bg-red-50" : "border-#630000"}`}
              >
                <option value="">Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>

            {/* Row 3: Citizenship, Tongue, Religion, Measurements */}
            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Citizenship:</p>
              <input
                {...register("citizenship", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.citizenship ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Citizenship"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Mother Tongue:</p>
              <input
                {...register("mother_tongue", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.mother_tongue ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Language"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Religion:</p>
              <input
                {...register("religion", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.religion ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Religion"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Weight (kg):</p>
              <input
                {...register("weight", { required: true })}
                type="number"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.weight ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="kg"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Height (cm):</p>
              <input
                {...register("height", { required: true })}
                type="number"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.height ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="cm"
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pl-43 mt-6">
            <p className="text-[#1B1717] text-[14px]">
              Indigenous Peoples (IP) Community?{" "}
              <span className="text-[#630000]">(Check if yes)</span>
            </p>
            <input
              {...register("is_ip_community")}
              type="checkbox"
              className="w-5 h-5 accent-[#630000]"
            />
          </div>

          {/* Contact INfo */}
          <div
            className="pl-25 pt-3"
          >
            <p className="text-[#630000] text-[25px] font-semibold">
              Contact Information
            </p>
          </div>

          <div className="grid grid-cols-5 gap-y-5 justify-items-center max-w-7xl mx-auto mt-3">
            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px] ">Contact Number</p>
              <input
                {...register("contact_number")}
                type="tel"
                maxLength={11}
                className="border border-[#630000] shadow-sm text-[12px] w-40 h-10 p-3 rounded-[5px]"
                placeholder="09XXXXXXXXX"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-1">
              <p className="text-[#1B1717] text-[14px] ">Email Address</p>
              <input
                {...register("email_address", { required: true })}
                type="email"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-40 ${errors.email_address ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="email@example.com"
              />
            </div>

            <div className="flex flex-col gap-1 col-start-1 ml-9">
              <p className="text-[#1B1717] text-[14px]">Current Address</p>
              <input
                {...register("curr_house_no", { required: true })}
                type="number"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.curr_house_no ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="HouseNo"
              />
            </div>

            <div className="flex flex-col gap-1 ml-10">
              <p className="invisible text-[#1B1717] text-[14px] ">
                Current Address
              </p>
              <input
                {...register("curr_street", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.curr_street ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Street"
              />
            </div>

            <div className="flex flex-col gap-1 ml-10">
              <p className="invisible text-[#1B1717] text-[14px]">
                Current Address
              </p>
              <input
                {...register("curr_barangay", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.curr_barangay ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Barangay"
              />
            </div>

            <div className="flex flex-col gap-1 ml-10">
              <p className="invisible text-[#1B1717] text-[14px]">
                Current Address
              </p>
              <input
                {...register("curr_municipality", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.curr_municipality ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="City/Municipality"
              />
            </div>

            <div className="flex flex-col gap-1 ml-10">
              <p className="invisible text-[#1B1717] text-[14px]">
                Current Address
              </p>
              <input
                {...register("curr_province", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.curr_province ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Province"
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pl-43 mt-6">
            <p className="text-[#1B1717] text-[14px]">
              Current address is the same as permanent?{" "}
              <span className="text-[#630000]">(Check if yes)</span>
            </p>
            <input
              {...register("is_permanent_same", { required: true })}
              type="checkbox"
              className="w-5 h-5 accent-[#630000]"
            />
          </div>

          {!isPermanentSame && (
            <div className="grid grid-cols-5 gap-y-5 justify-items-center max-w-7xl mx-auto m-4">
              <div className="flex flex-col gap-1 ml-9">
                <p className="text-[#1B1717] text-[14px]">Permanent Address</p>
                <input
                  {...register("perm_house_no", { required: true })}
                  type="number"
                  className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.perm_house_no ? "border-red-500 bg-red-50" : "border-#630000"}`}
                  placeholder="HouseNo"
                />
              </div>

              <div className="flex flex-col gap-1 ml-10">
                <p className="invisible text-[#1B1717] text-[14px]">
                  Permanent Address
                </p>
                <input
                  {...register("perm_street", { required: true })}
                  type="text"
                  className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.perm_street ? "border-red-500 bg-red-50" : "border-#630000"}`}
                  placeholder="Street"
                />
              </div>

              <div className="flex flex-col gap-1 ml-10">
                <p className="invisible text-[#1B1717] text-[14px]">
                  Permanent Address
                </p>
                <input
                  {...register("perm_barangay", { required: true })}
                  type="text"
                  className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.perm_barangay ? "border-red-500 bg-red-50" : "border-#630000"}`}
                  placeholder="Barangay"
                />
              </div>

              <div className="flex flex-col gap-1 ml-10">
                <p className="invisible text-[#1B1717] text-[14px]">
                  Permanent Address
                </p>
                <input
                  {...register("perm_municipality", { required: true })}
                  type="text"
                  className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.perm_municipality ? "border-red-500 bg-red-50" : "border-#630000"}`}
                  placeholder="City/Municipality"
                />
              </div>

              <div className="flex flex-col gap-1 ml-10">
                <p className="invisible text-[#1B1717] text-[14px]">
                  Permanent Address
                </p>
                <input
                  {...register("perm_province", { required: true })}
                  type="text"
                  className={`border border-[#630000] shadow-sm text-[13px] tracking-wider h-10 p-3 rounded-[5px] w-50 ${errors.perm_province ? "border-red-500 bg-red-50" : "border-#630000"}`}
                  placeholder="Province"
                />
              </div>
            </div>
          )}

          <div className="fixed right-10 bottom-10">
            <button
              type="button"
              onClick={handleNext}
              className="flex justify-end items-center ml-auto gap-2 px-6 py-3 bg-[#630000] text-white text-[13px] rounded-xl font-bold hover:bg-red-800 shadow-lg transition-all"
            >
              <ArrowRight size={20} />
              NEXT
            </button>
          </div>
        </>
      )}

      {/* --- PAGE 2: PARENT INFORMATION --- */}
      {step === 2 && (
        <>
          <div className="pt-2 pl-25">
            <p className="text-[#630000] text-[25px] font-semibold">
              Parent/Guardian Information
            </p>
          </div>

          {/* Father Section */}
          <div className="grid grid-cols-5 gap-y-5 justify-items-center max-w-7xl mx-auto mt-3 ">
            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px] w-32">Father's Name</p>
              <input
                {...register("father_last_name", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.father_last_name ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Last Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Father's Name
              </p>
              <input
                {...register("father_first_name", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.father_first_name ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="First Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Father's Name
              </p>
              <input
                {...register("father_middle_name", { required: true })}
                type="text"
                className="border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px]"
                placeholder="Middle Name"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-2 mr-65">
              <p className="text-[#1B1717] text-[14px]">Suffix</p>
              <input
                {...register("father_ext")}
                type="text"
                className="border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px]"
                placeholder="Jr/Sr"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Contact Number</p>
              <input
                {...register("father_contact", { required: true })}
                type="tel"
                maxLength={11}
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.father_contact ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Contact #"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-4 mr-193">
              <p className="text-[#1B1717] text-[14px]">Occupation</p>
              <input
                {...register("father_occupation", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.father_occupation ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Occupation"
              />
            </div>

            {/* Father's Address */}
            <div className="flex flex-col gap-1 ml-9">
              <p className="text-[#1B1717] text-[14px] w-32">Current Address</p>
              <input
                {...register("f_house_no", { required: true })}
                type="number"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.f_house_no ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="HouseNo"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Current Address
              </p>
              <input
                {...register("f_street", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.f_street ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Street"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Current Address
              </p>
              <input
                {...register("f_barangay", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.f_barangay ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Barangay"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Current Address
              </p>
              <input
                {...register("f_municipality", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.f_municipality ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="City"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Current Address
              </p>
              <input
                {...register("f_province", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.f_province ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Province"
              />
            </div>

            {/* Mother's */}
            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Mother's Name</p>
              <input
                {...register("mother_last_name", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.mother_last_name ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Last Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible text-[#1B1717] text-[14px]">
                Mother's Name
              </p>
              <input
                {...register("mother_first_name", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.mother_first_name ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="First Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible text-[#1B1717] text-[14px]">
                Mother's Name
              </p>
              <input
                {...register("mother_middle_name", { required: true })}
                type="text"
                className="border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px]"
                placeholder="Middle Name"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-2 mr-64">
              <p className="text-[#1B1717] text-[14px] ">Suffix</p>
              <input
                {...register("mother_ext")}
                type="text"
                className="border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px]"
                placeholder="Jr/Sr"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <p className="text-[#1B1717] text-[14px]">Contact Number</p>
              <input
                {...register("mother_contact", { required: true })}
                type="tel"
                maxLength={11}
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.mother_contact ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Contact #"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-4 mr-193">
              <p className="text-[#1B1717] text-[14px]">Occupation</p>
              <input
                {...register("mother_occupation", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.mother_occupation ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Occupation"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="text-[#1B1717] text-[14px]">Current Address</p>
              <input
                {...register("m_house_no", { required: true })}
                type="number"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.m_house_no ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="HouseNo"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px]">
                Current Address
              </p>
              <input
                {...register("m_street", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.m_street ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Street"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px]">
                Current Address
              </p>
              <input
                {...register("m_barangay", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.m_barangay ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Barangay"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px]">
                Current Address
              </p>
              <input
                {...register("m_municipality", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.m_municipality ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="City"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px]">
                Current Address
              </p>
              <input
                {...register("m_province", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.m_province ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Province"
              />
            </div>

            {/* Guardian Section */}
            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Guardian's Name</p>
              <input
                {...register("guardian_last_name", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.guardian_last_name ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Last Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible text-[#1B1717] text-[14px]">
                Guardian's Name
              </p>
              <input
                {...register("guardian_first_name", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.guardian_first_name ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="First Name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible text-[#1B1717] text-[14px]">
                Guardian's Name
              </p>
              <input
                {...register("guardian_middle_name", { required: true })}
                type="text"
                className="border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px]"
                placeholder="Middle Name"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-2 mr-64">
              <p className="text-[#1B1717] text-[14px]">Suffix</p>
              <input
                {...register("guardian_ext")}
                type="text"
                className="border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px]"
                placeholder="Jr/Sr"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#1B1717] text-[14px]">Contact Number</p>
              <input
                {...register("guardian_contact", { required: true })}
                type="tel"
                maxLength={11}
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.guardian_contact ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Contact #"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-4 mr-193">
              <p className="text-[#1B1717] text-[14px]">Relationship</p>
              <input
                {...register("guardian_relationship", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-40 h-10 p-3 rounded-[5px] ${errors.guardian_relationship ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Relationship"
              />
            </div>

            {/* Guardian's Address */}
            <div className="flex flex-col gap-1 ml-9">
              <p className="text-[#1B1717] text-[14px] w-32">
                Guardian Address
              </p>
              <input
                {...register("g_house_no", { required: true })}
                type="number"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.g_house_no ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="HouseNo"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Guardian Address
              </p>
              <input
                {...register("g_street", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.g_street ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Street"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Guardian Address
              </p>
              <input
                {...register("g_barangay", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.g_barangay ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Barangay"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Guardian Address
              </p>
              <input
                {...register("g_municipality", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.g_municipality ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="City"
              />
            </div>

            <div className="flex flex-col gap-1 ml-9">
              <p className="invisible text-[#1B1717] text-[14px] w-32">
                Guardian Address
              </p>
              <input
                {...register("g_province", { required: true })}
                type="text"
                className={`border border-[#630000] shadow-sm text-[13px] tracking-wider w-50 h-10 p-3 rounded-[5px] ${errors.g_province ? "border-red-500 bg-red-50" : "border-#630000"}`}
                placeholder="Province"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-5 pl-42 mt-10">
              <p className="text-[#1B1717] text-[14px]">
                Is this student a transferee?{" "}
                <span className="text-[#630000]">(✓) if yes</span>
              </p>
              <input
                {...register("is_transferee")}
                type="checkbox"
                className="w-5 h-5 accent-[#630000] "
              />
            </div>

            <div className="fixed right-10 bottom-10 flex gap-4 text-[13px] ">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-4 py-3 bg-[#1B1717] text-white rounded-xl font-bold hover:bg-gray-600 transition-all shadow-md"
              >
                <ArrowLeft size={20} />
                BACK
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-[#630000] text-white rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95"
              >
                <Save size={20} />
                ENROLL
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
