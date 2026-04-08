import { User } from "lucide-react";

export default function StudentSubjects() {
  const subjects = [
    {
      subject: "Filipino",
      teacher: "Dela Cruz, Juan M.",
      schedule: "MWF",
    },
    {
      subject: "English",
      teacher: "Reyes, Carlo C.",
      schedule: "TTH",
    },
    {
      subject: "Science",
      teacher: "Mendoza, Ayan L.",
      schedule: "MWF",
    },
    {
      subject: "Mathematics",
      teacher: "Balabo, Maine M.",
      schedule: "MWF",
    },
    {
      subject: "Araling Panlipunan",
      teacher: "Villanueva, Precy Z.",
      schedule: "TTH",
    },
    {
      subject: "MAPEH",
      teacher: "Ramos, Merly K.",
      schedule: "F",
    },
    {
      subject: "EPP",
      teacher: "Atienza, Princess R.",
      schedule: "MWF",
    },
    {
      subject: "GMRC",
      teacher: "Mancil, Clarish P.",
      schedule: "TTH",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* STUDENT INFO CARD */}
      <div className="rounded-3xl overflow-hidden h-56 shadow-lg relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>

        <div className="absolute inset-0 bg-white/70 flex items-center justify-between px-10">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
              <User size={50} className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold">Dela Cruz, Juan M.</h2>
          </div>

          <div className="space-y-3 text-lg font-semibold text-[#7B0000]">
            <p>▸ Batangas Metropolitan University</p>
            <p>▸ Grade 1 - Makakalikasan</p>
            <p className="text-green-600">▸ ENROLLED</p>
          </div>
        </div>
      </div>

      {/* SUBJECT TABLE */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#7B0000] text-white">
            <tr>
              <th className="py-4">Subjects</th>
              <th>Teacher</th>
              <th>Schedule</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((item, index) => (
              <tr key={index} className="bg-[#ECE9DF] border-b border-white text-center">
                <td className="py-5">{item.subject}</td>
                <td>{item.teacher}</td>
                <td>{item.schedule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}