import "./index.css";
import LoginPage from "./pages/LoginPage";
import ElementaryRecords from "./pages/Teacher/Records/Elementary";
import JHSRecords from "./pages/Teacher/Records/JHS";
import SHSRecords from "./pages/Teacher/Records/SHS";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";  
import StudentDashboard from "./pages/Student/StudDashboard/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/MainDashboard/Dashboard";
import ElementaryEnrollment from "./pages/Teacher/StudentEnrollment/Elementary";
import HighSchool from "./pages/Teacher/StudentEnrollment/HighSchool";
import SHS from "./pages/Teacher/StudentEnrollment/SHS";
import StudSubj from "./pages/Student/Subjects/StudentSubjectsTable.jsx";
import ArchSubj from "./pages/Student/ArchivedSubjects/StudArchSubj.jsx";
import Sidebar from "./pages/Teacher/MainDashboard/Sidebar.jsx";
import StudentLayout from "./pages/Student/StudentLayout.jsx";
import Settings from "./pages/Teacher/Settings.jsx";
import TeacherLayout from "./pages/Teacher/TeacherLayout.jsx";

//Faculty imports
import ElemFaculty from "./pages/Teacher/Faculty/ElemFaculty.jsx";
import HSFaculty from "./pages/Teacher/Faculty/HSfaculty.jsx";
import SHSFaculty from "./pages/Teacher/Faculty/SHSfaculty.jsx";

import { Toaster } from "react-hot-toast";

function AppContent() {
  const location = useLocation();

  // Hide yung sidebar kapag yung path ay "/" OR if it starts with "/student"
  //const hideSidebar =
  location.pathname === "/" || location.pathname.startsWith("/student");

  return (
    <>
      
      <Toaster />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="/student/studsubj/*" element={<StudSubj />} />
          <Route path="/student/archsubj/*" element={<ArchSubj />} />
        </Route>
        </Route>
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="/teacher/elem/*" element={<ElementaryEnrollment />} />
          <Route path="/teacher/hs/*" element={<HighSchool />} />
          <Route path="/teacher/shs/*" element={<SHS />} />
          <Route path="/teacher/elemfaculty/*" element={<ElemFaculty />} />
          <Route path="/teacher/hsfaculty/*" element={<HSFaculty />} />
          <Route path="/teacher/shsfaculty/*" element={<SHSFaculty />} />
          <Route path="/teacher/elemrec/*" element={<ElementaryRecords />} />
          <Route path="/teacher/jhsrec/*" element={<JHSRecords />} />
          <Route path="/teacher/shsrec/*" element={<SHSRecords />} />
          <Route path="/teacher/settings/*" element={<Settings />} />
        </Route>
        </Route>  
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
