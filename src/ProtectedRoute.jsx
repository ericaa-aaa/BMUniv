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
// fdshfsao

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     setIsAuthenticated(false);
//     return;
//   }

//   fetch(`${import.meta.env.VITE_BASE_URL}/verify-token`, {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   .then(res => {
//     // If 403 or 401, set to false
//     if (!res.ok) {
//       setIsAuthenticated(false);
//       return;
//     }
//     // Optional: Parse JSON to check role if necessary
//     // res.json().then(data => { if(data.role !== 'teacher') ... })
//     setIsAuthenticated(true);
//   })
//   .catch(() => setIsAuthenticated(false));
// }, []);


// cookies


// import { Navigate, Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function ProtectedRoute() {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BASE_URL}/verify-token`, {
//           method: "GET",
//           credentials: "include", // This sends your cookies automatically
//           // Remove the headers object if you aren't using Bearer tokens manually
//         });


//         if (res.ok) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Verification error:", error);
//         setIsAuthenticated(false);
//       }
//     };

//     verifyToken();
//   }, []);

//   if (isAuthenticated === null) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading session...</p>
//       </div>
//     );
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// }