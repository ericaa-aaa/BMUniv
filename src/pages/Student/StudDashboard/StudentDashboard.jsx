import { useState, useEffect } from "react"; // Added useEffect
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

  // State for student data (initialized with empty/loading values)
  const [student, setStudent] = useState({
    name: "Loading...",
    grade: "",
    section: "",
    category: "",
    status: "",
    photo: null
  });

  // Fetch student profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/profile/student`, {
          credentials:"include"

        });

        const data = await res.json();
        if (res.ok) {
          setStudent({
            name: data.display_name,
            grade: data.extra_data.grade,
            section: data.extra_data.section,
            category: data.extra_data.category,
            status: data.extra_data.status,
            strand: data.extra_data.strand,
            photo: data.profile_photo 
          });
        } else {
          toast.error(data.error || "Failed to load profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/change-password`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");

      toast.success("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const statusColors = {
    Enrolled: "text-green-600",
    Dropped: "text-red-500",
  };

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
              {/* Profile Photo Logic */}
              {student.photo ? (
                <img 
                  src={student.photo} 
                  alt="Profile" 
                  className="size-32 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-32 text-gray-400">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
              )}
              <h2 className="font-['Inter'] text-2xl font-semibold text-gray-800 uppercase">
                {student.name}
              </h2>
            </div>
            
            <div className="m-2 p-2 pr-15">
              <div className="font-['Inter'] space-y-3 text-lg font-semibold text-[#7B0000]">
                <p>▸ Batangas Metropolitan University</p>
                <p>▸ {student.category} - Grade {student.grade} </p>
                <p> ▸ Section: {student.section}</p>
                {student.strand && (
                  <p> ▸ Strand: {student.strand}</p>
                )}
                <p className={statusColors[student.status] || " "}> ▸ {student.status}</p>
              </div>
            </div>
              
            <div className="absolute top-2 right-6 z-20">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    className="text-black"
                  />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-[#7A1C1C] mb-6 ">
                Update Password
              </h2>
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
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fill-rule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6"
                        >
                          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                        </svg>
                      )}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
              />
            </svg>

            <span>Announcements</span>
          </h3>
          <p className="text-gray-500 italic">No new announcements today.</p>
        </div>

        <div className="bg-[#EDEBDD] font-['Inter'] h-102 rounded-xl p-6 overflow-hidden shadow-sm border border-black/5 flex flex-col">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[#7B0000] mb-4 uppercase tracking-tight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
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
// const handlePasswordUpdate = async (e) => {
//   e.preventDefault();

//   if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//     toast.error("Passwords do not match.", {
//       style: {
//         borderRadius: "10px",
//         background: "#333",
//         color: "#fff",
//       },
//     });
//     return;
//   }

//   try {
//     const token = localStorage.getItem("access_token"); // make sure you store this on login

//     const res = await fetch("http://localhost:5000/change-password", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Failed to update password");
//     }

//     // ✅ success toast (your existing style preserved)
//     toast.success(data.message || "Password updated successfully!", {
//       duration: 4000,
//       style: {
//         background: "#7A1C1C",
//         color: "#EDEBDD",
//         fontWeight: "bold",
//         fontFamily: "Inter",
//         borderRadius: "12px",
//         border: "1px solid #5a1515",
//       },
//       iconTheme: {
//         primary: "#EDEBDD",
//         secondary: "#7A1C1C",
//       },
//     });

//     setShowPasswordModal(false);
//     setShowPassword(false);
//     setPasswordForm({
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     });

//   } catch (err) {
//     toast.error(err.message, {
//       style: {
//         borderRadius: "10px",
//         background: "#333",
//         color: "#fff",
//       },
//     });
//   }
// };