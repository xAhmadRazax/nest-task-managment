import { createBrowserRouter } from "react-router";
import { AppLayout } from "./ui/AppLayout";
import { Login } from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
