import './index.css';
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/Student/StudentDashboard';

import Dashboard from './pages/Teacher/MainDashboard/Dashboard';
import SideBar from './pages/Student/Sidebar';

export default function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher/*" element={<Dashboard/>} />
          <Route path="/student/*" element={<StudentDashboard/>} />
        </Routes>
      </Router>
    </>
  );
}
