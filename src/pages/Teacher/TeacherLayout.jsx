import TeacherSidebar from "./MainDashboard/Sidebar";
import { Outlet } from "react-router";

export default function TeacherLayout(){
    return (
        <div className="flex">
            <TeacherSidebar />
            <div className="flex-1 bg-[#f5f5f5]">
                <Outlet />
            </div>
        </div>
    );
}