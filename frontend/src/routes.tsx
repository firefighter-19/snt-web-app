import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { UserInfo } from "./graphql/types/user";
import { Account } from "./pages/Account/Account";
import { AccountQuery } from "./pages/Account/AccoutQuery";
import { Bills } from "./pages/Bills/Bills";
import { Home } from "./pages/Home/Home";
import { Info } from "./pages/Info/Info";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";

export interface Routes {
  id: string;
  element: ReactNode;
  path: string;
}

const returnPreview = ({ getUser }: UserInfo) => <Account getUser={getUser} />;

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
    element: <AccountQuery ChildComponent={returnPreview} />,
  },
  {
    id: "12",
    path: "/login",
    element: <Login />,
  },
  {
    id: "13",
    path: "/registration",
    element: <Registration />,
  },
  {
    id: "14",
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export const privateRoutes = [];
