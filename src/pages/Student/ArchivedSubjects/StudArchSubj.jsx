export default function ArchSubjects() {
    return (
        <table className="w-full border">
            <thead className="bg-red-800 text-white">
                <tr>
                    <th>Subjects</th>
                    <th>Teacher</th>
                    <th>Schedule</th>
                </tr>
            </thead>

            <body>
                <tr className="text-center border">
                    <td>Math</td>
                    <td>Mr. Cruz</td>
                    <td>MEF 8-9AM</td>
                </tr>
            </body>
        </table>
    )
}