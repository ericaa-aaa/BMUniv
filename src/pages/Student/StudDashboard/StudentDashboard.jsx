import { useState } from "react";
import { BiSolidRightArrow, BiDotsHorizontalRounded } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Profile from "../../../assets/images/faculty1.png";

export default function StudentDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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
  };

  return (
    <div className="flex h-screen">
      {/* Main */}
      <div className="flex-1 p-6 space-y-6 bg-[#F5F5F5]">
        {/* HEADER */}
        <div className="relative rounded-2xl overflow-hidden h-44 shadow-md">
          {/* Background */}
          <div className="absolute inset-0 bg-[url('/src/assets/images/bg.jpg')] bg-cover bg-center"></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-white/75"></div>

          {/* 3 DOTS */}
          <div className="absolute top-4 right-4 z-20">
            <button onClick={() => setShowMenu(!showMenu)}>
              <BiDotsHorizontalRounded size={28} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border overflow-hidden">
                <button onClick={() => {
                    setShowPasswordModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100">
                  Update Password
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative grid grid-cols-2 items-center h-full px-8">
            {/* Left */}
            <div className="flex items-center gap-4">
              <img src={Profile} alt="profile"className="w-16 h-16 rounded-full object-cover"/>
              <p className="text-[#1B1717] font-medium text-xl">
                Dela Cruz, Llyne Say
              </p>
            </div>

            {/* Right */}
            <div className="items-end space-y-2 text-[#7A1C1C] font-medium">
              <p className="flex items-center gap-2">
                <BiSolidRightArrow />
                Batangas Metropolitan University
              </p>
              <p className="flex items-center gap-2">
                <BiSolidRightArrow />
                Grade 12 - STEM
              </p>
              <p className="flex items-center gap-2 text-green-600 font-semibold">
                <BiSolidRightArrow />
                ENROLLED
              </p>
            </div>
          </div>
        </div>

        {/* TOP PANEL */}
        <div className="bg-[#EDEBDD] h-48 rounded-xl shadow-sm"></div>

        {/* BOTTOM PANEL */}
        <div className="bg-[#EDEBDD] h-72 rounded-xl p-4 overflow-auto shadow-sm"></div>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4">
              <IoClose size={24} />
            </button>

            <h2 className="text-2xl font-bold text-[#7A1C1C] mb-6">
              Update Password
            </h2>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <input type="password" name="currentPassword" placeholder="Current Password" onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#7A1C1C]"/>

              <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#7A1C1C]"/>

              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#7A1C1C]"/>

              <button type="submit" className="w-full bg-[#7A1C1C] text-white py-3 rounded-lg font-semibold hover:opacity-90">
                Save Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}