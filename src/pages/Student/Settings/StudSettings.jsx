import { useState } from "react";

export default function Settings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Password updated successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#7B0000] mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#7B0000]"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#7B0000]"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#7B0000]"
          />

          <button
            type="submit"
            className="w-full bg-[#7B0000] text-white py-3 rounded-lg font-semibold hover:bg-red-900 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}