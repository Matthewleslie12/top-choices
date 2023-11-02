import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {useAuth} from "../provider/authProvider";
import {ProtectedRoute} from "./ProtectedRoute";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Account from "../pages/Account/Account";
import Saved from "../pages/Saved/Saved";
import Login from "../pages/Login/Login";
import PlaceDetails from "../components/Places/PlaceDetails";

const Routes = () => {
  const {token} = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/places/:id",
          element: <PlaceDetails />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
