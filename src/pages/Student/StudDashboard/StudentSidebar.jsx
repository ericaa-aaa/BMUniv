import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../assets/images/signin4.png";

export default function StudentSidebar() {
  const navigate = useNavigate();
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openArchived, setOpenArchived] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeUser");
    navigate("/", { replace: true });
  };

  return (
    <div className="w-67 bg-[#630000] text-[#EDEBDD] flex flex-col p-6 min-h-screen pr-5">
      <div className="flex gap-4 pt-15 mb-10 pl-3">
        <img src={logo} alt="logo" className="w-15 h-11" />
        <h1 className="text-[25px] font-['Inter'] font-bold pt-1">BMU</h1>
      </div>

      <nav className="flex flex-col gap-6 font-['Inter'] font-medium">
        <div>
          <div
            onClick={() => {
              setOpenDashboard(!openDashboard);
            }}
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors duration-300 
            ${openDashboard === "dashboard" ? "bg-[#EDEBDD]" : "hover:bg-[#EDEBDD]"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-7"
            >
              <path
                fill-rule="evenodd"
                d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                clip-rule="evenodd"
                className={`text-2xl transition-all duration-300 
                ${openSubjects === "subjects" ? "brightness-0" : "group-hover:brightness-0"}`}
              />
            </svg>
            <Link
              to="/student"
              className={`transition-colors duration-300 
                ${openDashboard === "dashboard" ? "text-[#1B1717] font-extrabold" : "text-[#EDEBDD] group-hover:text-[#1B1717] font-normal"}`}
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div>
          <div
            onClick={() => {
              setOpenSubjects(!openSubjects);
            }}
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors duration-300 
            ${openSubjects === "subjects" ? "bg-[#EDEBDD]" : "hover:bg-[#EDEBDD]"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                className={`text-2xl transition-all duration-300 
              ${openSubjects === "subjects" ? "brightness-0" : "group-hover:brightness-0"}`}
              />{" "}
            </svg>
            <Link
              to="/student/studsubj"
              className={`transition-colors duration-300 
                ${openSubjects === "subjects" ? "text-[#1B1717] font-extrabold" : "text-[#EDEBDD] group-hover:text-[#1B1717] font-normal"}`}
            >
              Student Subjects
            </Link>
          </div>
        </div>

        <div>
          <div
            onClick={() => {
              setOpenArchived(!openArchived);
            }}
            className={`group flex items-center gap-3 cursor-pointer py-2 px-7 rounded transition-colors duration-300 
            ${openArchived === "archives" ? "bg-[#EDEBDD]" : "hover:bg-[#EDEBDD]"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                className={`text-2xl transition-all duration-300 
              ${openSubjects === "subjects" ? "brightness-0" : "group-hover:brightness-0"}`}
              />
            </svg>

            <Link
              to="/student/archsubj"
              className={`transition-colors duration-300 
                ${openArchived === "archives" ? "text-[#1B1717] font-extrabold" : "text-[#EDEBDD] group-hover:text-[#1B1717] font-normal"}`}
            >
              Archived Subjects
            </Link>
          </div>
        </div>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="font-['Inter'] flex items-center gap-2 cursor-pointer text-[#EDEBDD] hover:text-white transition-all group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}