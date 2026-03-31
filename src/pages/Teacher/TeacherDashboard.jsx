import {Routes, Route} from "react-router-dom";
import Sidebar from "./Sidebar"
import Elementary from './Records/Elementary';
import JHS from './Records/JHS';
import SHS from './Records/SHS';

export default function TeacherDashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
                <Routes>
                    <Route path="/" element={<h1>welcome Teacher</h1>}/>
                    <Route path="elementary" element={<Elementary />} />
                    <Route path="JHS" element={<JHS />} />
                    <Route path="SHS" element={<SHS />} />
                </Routes>
            </div>
        </div>
    );
}