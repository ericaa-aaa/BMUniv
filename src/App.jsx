import './index.css';
import LoginPage from "./pages/LoginPage";
import ElementaryRecords from "./pages/Teacher/Records/Elementary"
import JHSRecords from "./pages/Teacher/Records/JHS"
import SHSRecords from "./pages/Teacher/Records/SHS"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StudentDashboard from './pages/Student/StudDashboard/StudentDashboard';
import Dashboard from './pages/Teacher/MainDashboard/Dashboard';
import ElementaryEnrollment from './pages/Teacher/StudentEnrollment/Elementary';
import HighSchool from './pages/Teacher/StudentEnrollment/HighSchool';
import SHS from './pages/Teacher/StudentEnrollment/SHS';
import RL from './pages/Teacher/StudentEnrollment/RL';
// import StudSubj from './pages/Student/Subjects';
// import ArchSubj from './pages/Student/ArchivedSubjects';
import Sidebar from './pages/Teacher/MainDashboard/Sidebar.jsx';

function AppContent() {
  const location = useLocation();

  // Hide sidebar if path is EXACTLY "/" (the login page)
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />} 
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher/*" element={<Dashboard/>} />
          <Route path="/elem" element={<ElementaryEnrollment/>} />
          <Route path="/hs" element={<HighSchool/>} />
          <Route path="/shs" element={<SHS/>} />
          <Route path="/rl" element={<RL/>} />
          <Route path="/student/*" element={<StudentDashboard/>} />
          <Route path="/elemrec/*" element={<ElementaryRecords />} />
          <Route path="/jhsrec/*" element={<JHSRecords />} />
          <Route path="/shsrec/*" element={<SHSRecords />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
