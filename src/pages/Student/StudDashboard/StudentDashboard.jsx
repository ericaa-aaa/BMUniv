import { Routes } from "react-router";
import { Route } from 'react-router-dom';
import StudentSidebar from "./StudentSidebar";
import Subjects from "../Subjects/StudentSubjectsTable";
import Archived from "../ArchivedSubjects/StudArchSubj";

export default function StudentDashboard() {
    return (
        <div className="flex">
            <StudentSidebar />
                <div className="flex-1 p-6">
                    <Routes>
                        <Route path="/studsubj/*" element={<Subjects />} />
                        <Route path="/archsubj/*" element={<Archived />} />
                    </Routes>
                </div>
        </div>
    )
}