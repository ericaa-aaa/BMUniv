import './index.css';
import LoginPage from "./pages/LoginPage";
import ElementaryRecords from "./pages/Teacher/Records/Elementary"
import JHSRecords from "./pages/Teacher/Records/JHS"
import SHSRecords from "./pages/Teacher/Records/SHS"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/Student/StudDashboard/StudentDashboard';

import Dashboard from './pages/Teacher/MainDashboard/Dashboard';
import ElementaryEnrollment from './pages/Teacher/StudentEnrollment/Elementary';
import HighSchool from './pages/Teacher/StudentEnrollment/HighSchool';



export default function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher/*" element={<Dashboard/>} />
          <Route path="/elem" element={<ElementaryEnrollment/>} />
          <Route path="/hs" element={<HighSchool/>} />
          <Route path="/student/*" element={<StudentDashboard/>} />
          <Route path="/elemrec/*" element={<ElementaryRecords />} />
          <Route path="/jhsrec/*" element={<JHSRecords />} />
          <Route path="/shsrec/*" element={<SHSRecords />} />
        </Routes>
      </Router>
    </>
  );
}
