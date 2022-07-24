import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPageLayout } from "./pages/MainPage/MainPageLayout";
import { routes } from "./routes";

export const App: FC = () => (
  <Routes>
    <Route path="/" element={<MainPageLayout />}>
      {routes.map((route) => (
        <Route key={route.id} element={route.element} />
      ))}
    </Route>
  </Routes>
);
