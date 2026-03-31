import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-64 h-creen bg-red-800 text-white flex flex-col justify-between p-4">
            <div>
                <h1 className="text-xl font-bold mb-6">Dashboard</h1>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/teacher" className="block hover:bg-red-700 p-2 rounded">Dashboard</Link>
                        </li>
                        <li className="mt-4 font-semibold">Student Records</li>
                        <li>
                            <Link to="/teacher/elementary" className="block hover:bg-red-700 p-2 rounded">Elementary Records</Link>
                        </li>
                        <li>
                            <Link to="/teacher/jhs" className="block hover:bg-red-700 p-2 rounded">JHS Records</Link>
                        </li>
                        <li>
                            <Link to="/teacher/shs" className="block hover:bg-red-700 p-2 rounded">SHS Records</Link>
                        </li>
                        <li className="mt-4">
                            <Link to="/teacher/enrollment" className="block hover:bg-red-700 p-2 rounded">Student Enrollment</Link>
                        </li>
                        <li>
                            <Link to="/teacher/faculty" className="block hover:bg-red-700 p-2 rounded">Faculty</Link>
                        </li>
                    </ul>
            </div>
            <button className="bg-red-900 p-2 rounded hover:bg-red-700">Log Out</button>
        </div>
    )
}