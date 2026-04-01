import './index.css';
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';

export default function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher/*" element={<TeacherDashboard/>} />
          <Route path="/student/*" element={<StudentDashboard/>} />
        </Routes>
      </Router>
    </>
  );
}
