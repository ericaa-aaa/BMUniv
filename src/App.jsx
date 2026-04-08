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
import StudSubj from "./pages/Student/Subjects/StudentSubjectsTable.jsx";
import ArchSubj from './pages/Student/ArchivedSubjects/StudArchSubj.jsx';
import Settings from "./pages/Student/Settings/StudSettings.jsx";
import Sidebar from './pages/Teacher/MainDashboard/Sidebar.jsx';
import StudentLayout from './pages/Student/StudentLayout.jsx';

//Faculty imports
import ElemFaculty from './pages/Teacher/Faculty/ElemFaculty.jsx';

function AppContent() {
  const location = useLocation();

  // Hide yung sidebar kapag yung path ay "/" OR if it starts with "/student"
  const hideSidebar = 
    location.pathname === "/" || 
    location.pathname.startsWith("/student");

  return (
    <div className="flex">
      {/* mag shoshow ang sidebar pag nag false*/}
      {!hideSidebar && <Sidebar />} 
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher/*" element={<Dashboard/>} />
          <Route path="/elem" element={<ElementaryEnrollment/>} />
          <Route path="/hs" element={<HighSchool/>} />
          <Route path="/shs" element={<SHS/>} />
          <Route path="/rl" element={<RL/>} />
          <Route path="/elemfaculty" element={<ElemFaculty/>} />
          <Route path="/elemrec/*" element={<ElementaryRecords />} />
          <Route path="/jhsrec/*" element={<JHSRecords />} />
          <Route path="/shsrec/*" element={<SHSRecords />} />

            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentDashboard/>} />
              <Route path="/student/studsubj/*" element={<StudSubj />}/>
              <Route path="/student/archsubj/*" element={<ArchSubj />}/>
              <Route path="/student/settings/*" element={<Settings />}/>
            </Route>
            
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
