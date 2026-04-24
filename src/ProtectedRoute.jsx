import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

export default function ProtectedRoute() {
  const [isAuthenticated, ] = useState(null);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setIsAuthenticated(!!user);
    // });

    // return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

// setIsAuthenticated