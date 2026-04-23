import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { User as UserIcon } from "lucide-react";
import { TfiAnnouncement } from "react-icons/tfi";
import { AiOutlineSchedule } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export default function StudentDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match.", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    toast.success("Password updated successfully!", {
      duration: 4000,
      style: {
        background: '#7A1C1C',
        color: '#EDEBDD',
        fontWeight: 'bold',
        fontFamily: 'Inter',
        borderRadius: '12px',
        border: '1px solid #5a1515',
      },
      iconTheme: {
        primary: '#EDEBDD',
        secondary: '#7A1C1C',
      },
    });

    setShowPasswordModal(false);
    setShowPassword(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const [student] = useState(() => ({
    name: localStorage.getItem("activeUser") || "Student User",
    grade: localStorage.getItem("studentGrade") || "N/A",
    section: localStorage.getItem("studentSection") || "Unassigned",
    category: localStorage.getItem("studentCategory") || "Student",
    status: localStorage.getItem("studentStatus") || "ENROLLED",
  }));

  return (
    <div className="flex bg-gray-100 overflow-hidden">

      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div
          className="rounded-3xl overflow-hidden h-56 shadow-lg relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/70 flex items-center justify-between px-10">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                <UserIcon size={50} className="text-white" />
              </div>
              <h2 className="font-['Inter'] text-2xl font-semibold text-gray-800 uppercase">
                {student.name}
              </h2>
            </div>
            <div className="m-2 p-2 pr-15">
              <div className="font-['Inter'] space-y-3 text-lg font-semibold text-[#7B0000]">
                <p>▸ Batangas Metropolitan University</p>
                <p>▸ {student.category} - Grade {student.grade}</p>
                <p> ▸ Section: {student.section}</p>
                <p className={student.status === "ENROLLED" ? "text-green-600" : "text-red-500"}>
                  {" "}▸ {student.status}
                </p>
              </div>
            </div>

            <div className="absolute top-2 right-6 z-20">
              <button onClick={() => setShowMenu(!showMenu)} className="p-1 hover:bg-black/10 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                  className="text-black" /> 
                </svg>

              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => {
                      setShowPasswordModal(true);
                      setShowMenu(false);
                    }}
                    className="font-['Inter'] w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors border-2 border-[#630000] rounded-xl"
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showPasswordModal && (
          <div className="font-['Inter'] fixed inset-0 bg-black/50 flex items-center justify-center z-100 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative mx-4">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setShowPassword(false);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
              >
                <IoClose size={28} />
              </button>
              <h2 className="text-2xl font-bold text-[#7A1C1C] mb-6 ">Update Password</h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                {[
                  { name: "currentPassword", placeholder: "Current Password" },
                  { name: "newPassword", placeholder: "New Password" },
                  { name: "confirmPassword", placeholder: "Confirm Password" },
                ].map((field) => (
                  <div key={field.name} className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={passwordForm[field.name]}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#7A1C1C] border-gray-300 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-[#7A1C1C] transition-colors"
                    >
                      {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                      </svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                      </svg>
                      }
                    </button>
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-[#7A1C1C] text-white py-3 rounded-lg font-semibold hover:bg-[#5a1515] transition-all mt-4 active:scale-95 shadow-md"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="bg-[#EDEBDD] font-['Inter'] h-48 rounded-xl shadow-sm border border-black/5 p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[#7B0000] mb-2 uppercase tracking-tight">
            <TfiAnnouncement className="shrink-0 font-bold" />
            <span>Announcements</span>
          </h3>
          <p className="text-gray-500 italic">No new announcements today.</p>
        </div>

        <div className="bg-[#EDEBDD] font-['Inter'] h-102 rounded-xl p-6 overflow-hidden shadow-sm border border-black/5 flex flex-col">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[#7B0000] mb-4 uppercase tracking-tight">
            <AiOutlineSchedule className="shrink-0" />
            <span>Schedule & Tasks</span>
          </h3>
          <div className="flex flex-col items-center justify-center grow opacity-30">
            <p className="text-xl font-semibold">Course Content Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}