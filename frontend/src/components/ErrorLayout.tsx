import { FC } from "react";
import { Outlet } from "react-router-dom";

export const ErrorLayout: FC = () => (
  <div>
    <Outlet />
  </div>
);
