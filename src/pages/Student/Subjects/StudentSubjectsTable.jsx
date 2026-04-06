import { FaBook, FaArchive, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function StudentSubjects() {
    const subjects = [
        {name: "Filipino", teacher: "Dela Cruz, Juan M.", schedule: "MWF"},
        {name: "English", teacher: "Dela Cruz, Juan M.", schedule: "MWF"},
        {name: "Mathematics", teacher: "Dela Cruz, Juan M.", schedule: "MWF"},
        {name: "Science", teacher: "Dela Cruz, Juan M.", schedule: "MWF"},
        {name: "Araling Panlipunan", teacher: "Dela Cruz, Juan M.", schedule: "MWF"},
        {name: "MAPEH", teacher: "Dela Cruz, Juan M.", schedule: "MWF"},
        {name: "EPP", teacher: "Dela Cruz, Juan M.", schedule: "MWF"},
        {name: "GMRC", teacher: "Dela Cruz, Juan M.", schedule: "MWF"},
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/*//SideBar
            <div className="w-67 bg-[#8b0000] text-white flex flex-col justify-between">
                <div>
                    <div className="p-6 text-xl font-bold bg-[#7A0000]">Dashboard</div>
                        <nav className="mt-2">
                            <button className="w-full text-left px-6 py-3 bg-gray-200 text-black">
                                Students Subject
                            </button>
                            <button className="w-full text-left px-6 py-3 bg-gray-200 text-black">
                                Archived Subjects
                            </button>
                            <button className="w-full text-left px-6 py-3 bg-gray-200 text-black">
                                Settings
                            </button>
                        </nav>
                </div>

                <button className="px-6 py-4 hover:bg-[#7A0000] flex items-center gap-2">
                    <FasignOutAlt /> Log Out
                </button>
            </div>*/}
            {/*cownteynt*/}
            <div className="flex-1 p-6">
                <div className="bg-white/70 backdrop-blur rounded p-6">
                    <div className="grid grid-cols-3 bg-[#8B0000] text-white font-semibold">
                        <div className="p-3">Subjects</div>
                        <div className="p-3">Teacher</div>
                        <div className="p-3">Schedule</div>
                    </div>

                    {subjects.map((subj, i) => (
                        <div key={i} className="grid grid-cols-3 border-t bg-white/80"> 
                            <div className="p-3">{subj.name}</div>
                            <div className="p-3">{subj.teacher}</div>
                            <div className="p-3">{subj.schedule}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}