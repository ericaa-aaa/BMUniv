import { useState } from 'react';
import back from '../../../assets/images/bg.jpg';
import { Eye, EyeOff } from 'lucide-react';
import Profile from '../SideSettings/Profile';
import { toast } from 'react-hot-toast'; // Ensure toast is imported

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {

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

      toast.success(data.message || "Password updated successfully!");
      
      // Reset form
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section 
      className="h-screen bg-cover bg-no-repeat bg-fixed bg-center" 
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="min-h-screen bg-white/90 p-4 flex items-center justify-center gap-x-20 font-[Inter]">
        <Profile />
        <div className="bg-white/20 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-2xl w-full max-w-md max-h-full overflow-y-auto">
          <h2 className="text-3xl font-bold text-[#630000] text-center mb-6">Change Password</h2>
          
          <form onSubmit={handlePasswordUpdate} className="space-y-6 flex flex-col">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-[#630000] mb-1">Current Password</label>
              <div className="relative">
                <input 
                  type={showCurrent ? "text" : "password"} 
                  name="currentPassword"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000] focus:outline-none focus:ring-1 focus:ring-[#810100] placeholder-gray-400"
                  value={passwordForm.currentPassword}
                  onChange={handleChange}
                  required 
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#630000]">
                  {showCurrent ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-[#630000] mb-1">New Password</label>
              <div className="relative">
                <input 
                  type={showNew ? "text" : "password"} 
                  name="newPassword"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000] focus:outline-none focus:ring-1 focus:ring-[#810100]"
                  value={passwordForm.newPassword}
                  onChange={handleChange}
                  required 
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#630000]">
                  {showCurrent ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#630000] mb-1">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirm ? "text" : "password"} 
                  name="confirmPassword"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000] focus:outline-none focus:ring-1 focus:ring-[#810100]"
                  value={passwordForm.confirmPassword}
                  onChange={handleChange}
                  required 
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#630000]">
                  {showCurrent ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#630000] hover:bg-[#810100] text-[#edebdd] font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
