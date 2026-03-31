export default function JHS() {
    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Students Enrolled</h2>
                <input placeholder="Search..." className="border p-2" />
            </div>
                <table className="w-full border">
                    <thead className="bg-red-800 text-white">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Section</th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>File</th>
                        </tr>
                    </thead>
                    <body>
                        <tr className="text-center border">
                            <td>1</td>
                            <td>Juan Dela Cruz</td>
                            <td>Section A</td>
                            <td className="text-green-600">Enrolled</td>
                            <td>IMG</td>
                            <td>View</td>
                        </tr>
                    </body>
                </table>
        </div>
    )
}