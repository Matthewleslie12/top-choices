// import {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";

// function ProtectedRoute({children}) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check for the presence of an authentication cookie
//     const authenticationCookie = getCookie("authenticationToken");

//     if (authenticationCookie) {
//       // User is authenticated
//       setIsAuthenticated(true);
//     } else {
//       // User is not authenticated, redirect to the login page
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Utility function to get a specific cookie by name
//   function getCookie(name) {
//     const cookieValue = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith(name + "="));

//     if (cookieValue) {
//       return cookieValue.split("=")[1];
//     }

//     return null;
//   }

//   return isAuthenticated ? children : null;
// }

// export default ProtectedRoute;
