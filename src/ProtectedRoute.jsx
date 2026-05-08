// import { Navigate, Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function ProtectedRoute() {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     setIsAuthenticated(false);
//     return;
//   }

//   fetch(`${import.meta.env.VITE_BASE_URL}/verify-token`,
//           {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   .then(res => setIsAuthenticated(res.ok))
//   .catch(() => setIsAuthenticated(false));
// }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// }
// fdshfsao




import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// Accept 'allowedRoles' as a prop
export default function ProtectedRoute({ allowedRoles }) {
  const [auth, setAuth] = useState({ isAuthenticated: null, roles: [] });

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   setAuth({ isAuthenticated: false, roles: [] });
    //   return;
    // }

    // fetch(`${import.meta.env.VITE_BASE_URL}/verify-token`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
      fetch(`${import.meta.env.VITE_BASE_URL}/verify-token`, {
      method: "GET",
      // CRITICAL: This allows the browser to send the cookie to the backend
      credentials: "include",   
      headers: {
        "Content-Type": "application/json",
      }
      })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setAuth({ isAuthenticated: true, roles: data.roles });
      })
      .catch(() => setAuth({ isAuthenticated: false, roles: [] }));
  }, []);

  if (auth.isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }


  const hasRole = auth.roles.some(role => allowedRoles.includes(role));
  

  if (!hasRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
