import StudentSidebar from "./StudDashboard/StudentSidebar";
import { Outlet } from "react-router";

export default function StudentLayout(){
    return (
        <div className="flex h-full">
            <StudentSidebar />
            <div className="flex-1 bg-[#f5f5f5]">
                <Outlet />
            </div>
        </div>
    );
}