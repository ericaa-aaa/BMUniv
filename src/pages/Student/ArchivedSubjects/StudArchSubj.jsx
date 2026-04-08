export default function ArchivedSubjects() {
  const archived = [
    {
      subject: "Computer",
      teacher: "Mendoza, Ayan L.",
      schoolYear: "2024-2025",
    },
    {
      subject: "Values Education",
      teacher: "Villanueva, Precy Z.",
      schoolYear: "2024-2025",
    },
    {
      subject: "Music",
      teacher: "Ramos, Merly K.",
      schoolYear: "2023-2024",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#7B0000] text-white px-6 py-4 text-xl font-bold">
          Archived Subjects
        </div>

        <table className="w-full">
          <thead className="bg-[#ECE9DF]">
            <tr>
              <th className="py-4">Subject</th>
              <th>Teacher</th>
              <th>School Year</th>
            </tr>
          </thead>

          <tbody>
            {archived.map((item, index) => (
              <tr
                key={index}
                className="text-center border-b border-gray-200"
              >
                <td className="py-5">{item.subject}</td>
                <td>{item.teacher}</td>
                <td>{item.schoolYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}