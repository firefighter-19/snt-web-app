import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AccountQuery } from "./pages/Account/AccoutQuery";
import { Bills } from "./pages/Bills/Bills";
import { Home } from "./pages/Home/Home";
import { Info } from "./pages/Info/Info";

export interface Routes {
  id: string;
  element: ReactNode;
  path: string;
}

export const mainRoutes: Routes[] = [
  {
    id: "1",
    path: "/",
    element: <Home />,
  },
  {
    id: "2",
    path: "/bills",
    element: <Bills />,
  },
  {
    id: "3",
    path: "/info",
    element: <Info />,
  },
  {
    id: "6",
    path: "/plans",
    element: <Home />,
  },
  {
    id: "7",
    path: "/data",
    element: <Home />,
  },
  {
    id: "8",
    path: "/gates",
    element: <Home />,
  },
  {
    id: "9",
    path: "/contacts",
    element: <Home />,
  },
  {
    id: "10",
    path: "/areas",
    element: <Home />,
  },
  {
    id: "11",
    path: "/account",
    element: <AccountQuery />,
  },
  {
    id: "11",
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export const privateRoutes = [];
