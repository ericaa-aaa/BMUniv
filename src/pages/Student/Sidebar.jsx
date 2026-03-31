import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="w-64 h-creen bg-red-800 text-white flex flex-col justify-between p-4">
            <div>
                <h1 className="text-xl font-bold mb-6">Student Panel</h1>
                <ul className="space-y-3">
                    <li>
                        <Link to="/student" className="block hover:bg-red-700 p-2 rounded">Student Subjects</Link>
                    </li>
                    <li>
                        <Link to="/student/archived" className="block hover:bg-red-700 p-2 rounded">Archived Subjects</Link>
                    </li>
                    <li>
                        <Link to="/student/settings" className="block hover:bg-red-700 p-2 rounded">Settings</Link>
                    </li>
                </ul>
            </div>
            <button className="bg-red-900 p-2 rounded hover:bg-red-700">Log Out</button>
        </div>
    )
}