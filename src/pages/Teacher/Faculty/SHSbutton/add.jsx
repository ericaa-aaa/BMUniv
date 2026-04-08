import { useForm } from "react-hook-form";


export default function Add({ setShowAdd }) {
  const { register, handleSubmit} = useForm({
    defaultValues: {
        lastname: "",
        firstname: "",
        middlename: "",
        ext: "",
        email_address: "",
        grade_level: "",
        position: "",
    }
  });

  // what happens when the form is valid
  const onSubmit = async (data) => {
    try {
      // You can also add setShowAdd(false) here if you want it to close on success
      await ElementaryStudentService.enrollStudent(data);
      alert("Student Record Saved Successfully!");
      setShowAdd(false); 
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
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-100 font-[Inter]">
      
      <div className="pl-12 pt-5">
        <p className="text-[#630000] text-[25px] font-semibold">Teacher's Information</p>
      </div>

    <div className="bg-[#EDEBDD] w-230 py-7 px-4 mx-auto mt-5 rounded-2xl flex flex-col gap-8">
        <div className="flex gap-7 items-center ml-7">
            <p className="text-[#1B1717] text-[14px] ml-7 mt-2">Teacher's Name:</p>
            <input {...register("lastname")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Last Name" required />
            <input {...register("firstname")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Middle Name" required />
            <input {...register("middlename")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="First Name" required />
            <input {...register("ext")} type="text" className="border text-[12px] w-20 h-10 p-3 rounded-[5px] bg-white" placeholder="Ext" required />
        </div>
        <div className="flex gap-7 items-center ml-7">
            <p className="text-[#1B1717] text-[14px] ml-7">EmailAdress:</p>
            <input {...register("email_address")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Email Address" required />
            <p className="text-[#1B1717] text-[14px] ml-7">Grade Levels</p>
            <select {...register("gender")} className="border text-[12px] w-30 h-10 p-2 rounded-[5px]" required>
                                <option value="">Select</option>
                                <option value="Grade 1">Grade 1</option>
                                <option value="Grade 2">Grade 2</option>
                                <option value="Grade 3">Grade 3</option>
                                <option value="Grade 4">Grade 4</option>
                                <option value="Grade 5">Grade 5</option>
                                <option value="Grade 6">Grade 6</option>    
                            </select>
            <p className="text-[#1B1717] text-[14px] ml-7">Position</p>
            <input {...register("position")} type="text" className="border text-[12px] w-30 h-10 p-3 rounded-[5px] bg-white" placeholder="Position" required />
        </div>
    </div>

    <div className="pl-12 pt-10">
        <p className="text-[#630000] text-[25px] font-['Inter'] font-semibold">Subject To Teach</p>
    </div>

    <div className="flex justify-center font-['Inter'] text-[20px] gap-12 mt-10 font-medium">
        <div>
            <div className="flex items-center gap-5 pl-22 mt-4">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>Language</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>Reading and Literary</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>Mathematics</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>Makabansa</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>GMRC</p>
            </div>
        </div>

        <div>
            <div className="flex items-center gap-5 pl-22 mt-4">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>Filipino</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>English</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>Science</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>Araling Panlipunan</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>MAPEH</p>
            </div>
        </div>

        <div>
            <div className="flex items-center gap-5 pl-22 mt-4">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>EPP</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>English</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>Science</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>TLE</p>
            </div>
            <div className="flex items-center gap-5 pl-22 mt-6">
                <input type="checkbox" className="w-5 h-5 accent-[#630000]" />
                <p className='text-[#1B1717]'>ESP</p>
            </div>
        </div>
    </div>

      

      <div className="flex justify-center mt-35 gap-4"> 
          <button 
            type="submit" 
            className="bg-[#630000] text-[#EDEBDD] text-[20px] px-6 py-3 rounded-xl font-bold"
          >
            Add Faculty
          </button>
        </div>
    </form>
  );
}