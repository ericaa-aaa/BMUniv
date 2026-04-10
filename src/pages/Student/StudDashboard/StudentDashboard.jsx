import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Profile from "../../../assets/images/faculty1.png";

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
      alert("Passwords do not match.");
      return;
    }
    alert("Password updated successfully!");
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
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
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                 <img src={Profile} alt="profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Dela Cruz, Juan M.</h2>
            </div>

            <div className="space-y-3 text-lg font-semibold text-[#7B0000]">
              <p>▸ Batangas Metropolitan University</p>
              <p>▸ Grade 1 - Makakalikasan</p>
              <p className="text-green-600">▸ ENROLLED</p>
            </div>

            {/* THREE DOTS MENU */}
            <div className="absolute top-6 right-6 z-20">
              <button onClick={() => setShowMenu(!showMenu)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                <BiDotsHorizontalRounded size={32} className="text-gray-700" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <button 
                    onClick={() => {
                      setShowPasswordModal(true);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors">
                    Update Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PANELS */}
        <div className="bg-[#EDEBDD] h-48 rounded-xl shadow-sm border border-black/5"></div>
        <div className="bg-[#EDEBDD] h-72 rounded-xl p-4 overflow-auto shadow-sm border border-black/5"></div>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
            <button 
              onClick={() => {
                setShowPasswordModal(false);
                setShowPassword(false);
              }} 
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
              <IoClose size={24} />
            </button>

            <h2 className="text-2xl font-bold text-[#7A1C1C] mb-6">Update Password</h2>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              {[
                { name: "currentPassword", placeholder: "Current Password" },
                { name: "newPassword", placeholder: "New Password" },
                { name: "confirmPassword", placeholder: "Confirm Password" }
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
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-500 hover:text-[#7A1C1C] focus:outline-none">
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              ))}

              <button type="submit" className="w-full bg-[#7A1C1C] text-white py-3 rounded-lg font-semibold hover:bg-[#5a1515] transition-all mt-2 active:scale-[0.98]">
                Save Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}