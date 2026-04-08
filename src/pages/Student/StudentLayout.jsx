import StudentSidebar from "./StudDashboard/StudentSidebar";
import { Outlet } from "react-router";

export default function StudentLayout(){
    return (
        <div className="flex h-screen">
            <StudentSidebar />
            <div className="flex-1 p-6 bg-[#f5f5f5]">
                <Outlet />
            </div>
        </div>
    );
}