import { Routes } from "react-router";
import Sidebar from "./Sidebar";

export default function StudentDashboard() {
    return (
        <div className="flex">
            <Sidebar />
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