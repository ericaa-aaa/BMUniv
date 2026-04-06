import { Routes } from "react-router";
import { Route } from 'react-router-dom';
import StudentSidebar from "./StudentSidebar";
import Subjects from "../Subjects/StudentSubjectsTable";
import Archived from "../ArchivedSubjects/StudArchSubj";
import Settings from "../Settings/StudSettings";

export default function StudentDashboard() {
    return (
        <div className="flex">
            <StudentSidebar />
                <div className="flex-1 p-6">
                    <Routes>
                        <Route path="/studsubj/*" element={<Subjects />} />
                        <Route path="/archsubj/*" element={<Archived />} />
                        <Route path="/settings/*" element={<Settings />} />
                    </Routes>
                </div>
        </div>
    )
}