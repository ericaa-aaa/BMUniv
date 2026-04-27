import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsAuthenticated(false);
    return;
  }

  fetch(`${import.meta.env.VITE_BASE_URL}/verify-token`,
          {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setIsAuthenticated(res.ok))
  .catch(() => setIsAuthenticated(false));
}, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
