import { useState } from "react";
import back from "../../../assets/images/bg.jpg"
import { Eye, EyeOff } from "lucide-react";
import Profile from "../SideSettings/Profile"

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password Change Request:", passwords);
  };

  const toggleCurrent = () => setShowCurrent(!showCurrent);
  const toggleNew = () => setShowNew(!showNew);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  return (
    <section
      className="h-screen bg-cover bg-no-repeat bg-fixed bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="min-h-screen bg-white/90 p-4 flex items-center justify-center gap-x-20 font-[Inter]">
        <Profile />
        <div className="bg-white/20 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#630000] text-center mb-6">
            Change Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-[#630000] mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000] focus:outline-none focus:ring-1 focus:ring-[#810100] placeholder-gray-400"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={toggleCurrent}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#630000]"
                >
                  {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#630000] mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000] focus:outline-none focus:ring-1 focus:ring-[#810100] placeholder-gray-400"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={toggleNew}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#630000]"
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#630000] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#810100] text-[#630000] focus:outline-none focus:ring-1 focus:ring-[#810100] placeholder-gray-400"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirm}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#630000]"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#630000] hover:bg-[#810100] text-[#edebdd] font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
