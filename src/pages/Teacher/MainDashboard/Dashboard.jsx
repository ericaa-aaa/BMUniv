import { useState, useEffect } from "react";
import profile from "../../../assets/images/faculty1.png";
import back from "../../../assets/images/bg.jpg";
import { FacultyTeacherService } from "../../../services/facultyteacherservice";

export default function TeacherDashboard() {
  const [firstName, setFirstName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [counts, setCounts] = useState({
    elementary: 0,
    highSchool: 0,
    seniorHigh: 0,
  });

  useEffect(() => {
    // 1. Load the First Name stored during login
    const storedName = localStorage.getItem("activeUser");
    if (storedName) {
      setFirstName(storedName);
    }

    // 2. Fetch Subjects
    const fetchMySubjects = async () => {
      try {
        const data = await FacultyTeacherService.getMySubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Error loading subjects:", error);
      }
    };

    fetchMySubjects();
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token"); // 1. Get the token
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/students/count`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // 2. Add the header
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCounts({
          elementary: data.elementary,
          highSchool: data.highSchool,
          seniorHigh: data.seniorHigh,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section
      className="w-full h-full bg-cover bg-no-repeat bg-fixed bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="w-full h-full bg-white/75">
        {/* User Profile Header */}
        <div className="flex justify-end pt-10 pr-12">
          <div className="flex items-center gap-4 group">
            {/* Text Info: Aligned to the center of the image */}
            <div className="flex flex-col text-right justify-center">
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">
                Faculty
              </p>
              <p className='font-["Inter"] text-[#1B1717] text-xl font-semibold capitalize leading-none'>
                {firstName ? `Teacher ${firstName}` : "Faculty Teacher"}
              </p>
            </div>

            {/* Profile Image: Added a clean border and consistent sizing */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#630000] p-0.5 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img
                src={profile}
                alt="Faculty"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Enrollment Stats Row */}
        {/* border-collapse - merge border para di magkaron ng double line */}
        <table className="mt-15 font-['Inter'] font-semibold border border-collapse mx-auto max-w-7xl w-full mb-10">
          {/* table body pag tbody ay main content pag thead naman ay pang header */}
          <tbody>
            {/* tr ay isang horizontal na row */}
            <tr>
              {/* .map ay loop na nag rereturn ng something. kunware sa code na to, tinitreat nya as a-b-c so instead 
              na magsulat ng <th> na madami, gumamit ng .map para tawagin ang mga label ng sunod-sunod (array). Prang sinasabi ng .map na
              "Take this list and turn each item into <th>" */}
              {[
                "Elementary Students",
                "High School Enrolled",
                "SHS Enrolled",
              ].map((label, index) => (
                // header cell ang th, automatic bold and center the data
                <th
                  // key ay position ng item sa isang array. for example ang high school ang index nya ay 1 dahil nag start ang bilang sa 0.
                  key={index}
                  className="border-2 border-[#edebdd] bg-[#630000] px-6 py-3 text-center text-[#edebdd]"
                >
                  {label}
                </th>
              ))}
            </tr>

            <tr>
              {[counts.elementary, counts.highSchool, counts.seniorHigh].map(
                (count, index) => (
                  // td ay ginagamit sa mga actual values hehe
                  //key ay ginagamit para ma track ang mga element. At ano ang mga element? yung ay yung mga elem etc and numbers.
                  // .map in addition ay parang inuutusan mo na, for each label display "elem" or for each count dispkay "16"
                  // and since the labels and counts are aligned or sinulat ng naayon sa pagkakasunod sunod, nag laline up sila coreesponds sa kanilang
                  // labels and counts. gets?
                  <td
                    key={index}
                    className="border-2 border-[#edebdd] bg-[#810100] px-6 py-2 text-center text-[#edebdd] font-bold text-xl"
                  >
                    {count}
                  </td>
                ),
              )}
            </tr>
          </tbody>
        </table>

        <div className="pt-12 font-['Inter']">
          <div className="max-w-350 mx-auto mt-4">
            <div className="text-[#630000] font-['Inter'] text-[25px] font-bold text-left">
              <p>My Assigned Subjects</p>
            </div>
          </div>

          <div className="max-w-350 mx-auto mt-4 grid grid-cols-3 gap-5">
            {subjects.map((sub, index) => (
              <div
                key={index}
                className="bg-[#edebdd] border-2 border-b-6 rounded-xl p-4 text-left text-[#630000] shadow-sm pl-8 mt-10"
              >
                <div className="text-[17px] font-bold mb-2">
                  {sub.grade ? `Grade ${sub.grade}` : "NA"}
                </div>

                <div className="text-[25px] font-bold mb-2">
                  {sub.name ?? "NA"}
                </div>

                {[11, 12].includes(Number(sub.grade)) && sub.courseCode && (
                  <div className="text-sm mt-2 font-medium">
                    {sub.courseCode}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
