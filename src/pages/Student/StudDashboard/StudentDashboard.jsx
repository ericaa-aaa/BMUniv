import { Routes } from "react-router";
import StudentSidebar from "./StudentSidebar";

export default function StudentDashboard() {
    return (
        <div className="flex">
            <StudentSidebar />
                <div className="flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<Subjects />} />
                        <Route path="archived" element={<Archived />} />
                        <Route path="settings" element={<Settings />} />
                    </Routes>
                </div>
        </div>
    )
}