import SideBar from "../MainDashboard/Sidebar";

export default function Elementary() {
  return (
    <div className="flex min-h-screen">

      <div className="w-64">
        <SideBar />
      </div>

      <section className="flex-1 bg-[url('/home/dev/Desktop/BMU/BMUniv/src/assets/images/bg.jpg')] bg-cover bg-no-repeat bg-position-[50%_25%] relative">
        
        <div className="absolute inset-0 bg-white/80 px-6 py-8">

          <div className="flex justify-center mb-6">
            <h1 className="bg-red-800 text-white px-10 py-3 rounded-xl text-lg md:text-xl font-semibold shadow-md">
              Elementary Students Records
            </h1>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
            <h2 className="text-lg font-semibold text-gray-700">
              Students Enrolled
            </h2>

            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Search:</label>
              <input
                type="text"
                className="border border-red-800 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">

            <table className="w-full text-sm text-center">
              
              <thead className="bg-red-800 text-white">
                <tr>
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Student Name</th>
                  <th className="py-3 px-2">Grade Level</th>
                  <th className="py-3 px-2">Section</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Image</th>
                  <th className="py-3 px-2">Student File</th>
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4].map((item) => (
                  <tr key={item} className="border-t hover:bg-gray-50">
                    <td className="py-3">{item}</td>
                    <td className="py-3">Dela Cruz, Juan M.</td>
                    <td className="py-3">1</td>
                    <td className="py-3">CpE-2304</td>
                    <td className="py-3 text-green-600 font-medium">
                      Enrolled
                    </td>
                    <td className="py-3">jpg</td>
                    <td className="py-3">
                      <button className="text-blue-600 hover:underline">
                        View Form
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      </section>
    </div>
  );
}