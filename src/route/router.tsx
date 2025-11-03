import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import HomePage from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router";
import { PATH } from "./path";


const router = createBrowserRouter([
  {
    path: PATH.ROOT.name,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: PATH.LOGIN.name,
        element: <Login />
      },
      {
        path: PATH.SIGNUP.name,
        element: <SignUp />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PATH.DASHBOARD.name,
            element: <Dashboard />
          }
        ]
      }
    ]
  },
])

export {
  router
};
