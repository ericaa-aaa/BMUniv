import { FaUserCircle } from "react-icons/fa";

export default function Add({ facultyList }) {

  return (
    <div className="p-5">
          <h2 className="text-[#630000] text-3xl font-bold mb-8 ml-10">Senior High School Faculty</h2>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 justify-items-center">
            
            {facultyList.length === 0 && (
              <p className="col-span-full text-gray-500 italic text-xl mt-10">
                No faculty members added yet.
              </p>
            )}
    
            {facultyList.map((faculty, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                
                <div className="mb-4">
                  <FaUserCircle className="text-gray-800 text-[100px]" />
                </div>
    
                <h3 className="text-black font-bold text-xl leading-tight">
                  Teacher {faculty.firstname} {faculty.middlename.charAt(0)}. {faculty.lastname} {faculty.ext}
                </h3>
    
                <p className="text-gray-600 text-lg">
                  {faculty.position || "Grade 1 Teacher"}
                </p>
                
              </div>
            ))}
            
          </div>
        </div>
  );
}
