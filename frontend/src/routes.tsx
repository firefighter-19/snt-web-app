import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Unauthorized } from "./components/Unauthorized";
import { Bills } from "./pages/Bills/Bills";
import { Home } from "./pages/Home/Home";
import { Info } from "./pages/Info/Info";

export interface Routes {
  id: string;
  element: ReactNode;
  path: string;
}

export const routes: Routes[] = [
  {
    id: "1",
    path: "home",
    element: <Home />,
  },
  {
    id: "2",
    path: "bills",
    element: <Bills />,
  },
  {
    id: "3",
    path: "info",
    element: <Info />,
  },
  {
    id: "4",
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    id: "5",
    path: "login",
    element: <Login />,
  },
  {
    id: "6",
    path: "plans",
    element: <Home />,
  },
  {
    id: "7",
    path: "data",
    element: <Home />,
  },
  {
    id: "8",
    path: "gates",
    element: <Home />,
  },
  {
    id: "9",
    path: "contacts",
    element: <Home />,
  },
  {
    id: "10",
    path: "areas",
    element: <Home />,
  },
  {
    id: "11",
    path: "*",
    element: <Navigate to="/home" replace />,
  },
];
